<script setup lang="ts">
import customStoryblokRichTextOptions from "~/utils/custom-storyblok-rich-text-schema";
import { validateSlug } from "~/utils/validateSlug";

const { sanitize } = useSanitizeHtml();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const sb = useSb();
const { t, locale } = useI18n({
  useScope: "local",
});
const notifications = useToastNotifications();
const storyblokApi = useStoryblokApi();

defineI18nRoute({
  paths: {
    en: "/journals/[slug]",
    id: "/jurnal/[slug]",
  },
});

// Validate slug before making API request
const validatedSlug = validateSlug(route.params.slug);
if (!validatedSlug) {
  throw createError({
    statusCode: 400,
    statusMessage: "Invalid slug format",
  });
}

const { data, status, error } = await useAsyncData(
  `post-${validatedSlug}-${locale}`,
  () =>
    storyblokApi.get(`cdn/stories/posts/${validatedSlug}`, {
      language: locale.value,
      version: "published",
      cv: sb.cv || Number(Date.now()),
    }),
  {
    watch: [locale],
    server: true,
    lazy: false,
    immediate: true,
    transform: (response) => ({
      story: response.data.story,
      bodyRich: renderRichText(
        response.data.story?.content.body_rich,
        customStoryblokRichTextOptions,
      ),
      dateModified: response.data.story?.published_at ?? undefined,
      datePublished: response.data.story?.first_published_at ?? undefined,
      excerpt: response.data.story?.content.excerpt,
      featuredImage: response.data.story?.content.featured_image?.filename,
      tags: response.data.story?.tag_list,
      title: response.data.story?.content.title,
    }),
  },
);

// Watch for errors and retry
watchEffect(() => {
  if (error.value) {
    notifications.add({
      type: NOTIFICATION_TYPE.ERROR,
      message: "Error fetching data. Retrying...",
    });

    setTimeout(() => {
      refreshNuxtData(`post-${validatedSlug}-${locale}`);
    }, 3000);
  }
});

// Computed properties for better reactivity
const seoImage = computed(() =>
  data.value?.featuredImage
    ? storyblokImage({
        url: data.value.featuredImage,
        width: 1200,
      })
    : undefined,
);

// SEO optimization
const pageTitle = computed(
  () => `${t("storyOf")} ${data.value?.title} ${t("by")} ${SEO_TITLE_DEFAULT}`,
);

useHead({
  title: pageTitle.value,
});

if (import.meta.server) {
  useSeoMeta({
    robots: "index, follow",
    title: pageTitle.value,
    ogTitle: pageTitle.value,
    description: data.value?.excerpt || "",
    ogDescription: data.value?.excerpt || "",
    ogImage: seoImage.value,
    ogUrl: `${runtimeConfig.public.baseUrl}${route.fullPath}`,
    twitterCard: "summary_large_image",
    articlePublishedTime: data.value?.datePublished,
    articleModifiedTime: data.value?.dateModified,
  });
}

// Schema.org structured data
useSchemaOrg([
  defineArticle({
    headline: data.value?.title,
    description: data.value?.excerpt,
    image: seoImage.value,
    inLanguage: locale.value === "en" ? "en-GB" : "id-ID",
    datePublished: data.value?.datePublished,
    dateModified: data.value?.dateModified,
    author: {
      "@type": "Person",
      "@id": `${runtimeConfig.public.baseUrl}/#identity`,
      name: "Yosef Yudha Wijaya",
      url: runtimeConfig.public.baseUrl,
      sameAs: SCHEMA_PERSON_SAME_AS,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${runtimeConfig.public.baseUrl}${route.fullPath}`,
    },
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: t("breadcrumb.home"), item: "/" },
      {
        name: t("breadcrumb.journals"),
        item: locale.value === "en" ? "/en/journals" : "/jurnal",
      },
      { name: data.value?.title || "" },
    ],
  }),
]);
</script>

<i18n lang="yaml">
en:
  by: "by"
  ongoing: "ongoing"
  storyOf: "Story of"
  breadcrumb:
    home: "Home"
    journals: "Journals"
id:
  by: "oleh"
  ongoing: "berlangsung"
  storyOf: "Kisah"
  breadcrumb:
    home: "Beranda"
    journals: "Jurnal"
</i18n>

<template>
  <main class="flex flex-col p-4 sm:p-6 lg:p-8 relative">
    <!-- Loading State -->
    <div
      v-if="status === ASYNC_DATA_STATUS.PENDING"
      class="flex flex-col gap-8 max-w-6xl mx-auto w-full"
    >
      <!-- Hero Image Skeleton -->
      <div class="aspect-video overflow-hidden rounded-xl">
        <USkeleton class="h-full w-full" />
      </div>

      <!-- Content Skeleton -->
      <div
        class="flex flex-col items-center gap-6 w-full max-w-3xl mx-auto px-4"
      >
        <USkeleton class="h-12 sm:h-16 lg:h-20 w-full max-w-2xl" />
        <USkeleton class="h-4 w-48" />
        <USkeleton class="h-4 w-full max-w-xl" />
        <div class="flex flex-col gap-3 w-full mt-4">
          <USkeleton v-for="i in 5" :key="`skeleton-${i}`" class="h-4 w-full" />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center min-h-[50vh] gap-4"
    >
      <div
        class="flex h-16 w-16 items-center justify-center rounded-full bg-red-100"
      >
        <Icon name="lucide:alert-circle" size="32" class="text-red-500" />
      </div>
      <p class="text-red-600 font-sans">{{ error.message }}</p>
    </div>

    <!-- Content -->
    <div v-else class="flex flex-col gap-8 sm:gap-12">
      <!-- Hero Image Section -->
      <div class="w-full max-w-6xl mx-auto">
        <div
          class="aspect-video overflow-hidden rounded-xl shadow-2xl shadow-black/10 relative group"
        >
          <ClientOnly>
            <Suspense>
              <NuxtImg
                v-if="data?.featuredImage"
                :alt="data?.title"
                :src="data.featuredImage"
                class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                format="webp"
                loading="lazy"
                provider="storyblok"
                :quality="70"
                :width="1200"
                :modifiers="{ smart: true }"
              />
              <template #fallback>
                <USkeleton class="h-full w-full" />
              </template>
            </Suspense>
          </ClientOnly>

          <!-- Gradient overlay -->
          <div
            class="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none"
          />
        </div>
      </div>

      <!-- Article Content -->
      <article
        class="flex flex-col items-center w-full max-w-3xl mx-auto px-4 sm:px-6"
      >
        <!-- Title -->
        <HeadingPrimary class="mb-8 sm:mb-10">
          {{ data?.title }}
        </HeadingPrimary>

        <!-- Published Date -->
        <div
          class="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-10 sm:mb-12"
        >
          <UBadge
            v-if="data?.datePublished"
            color="neutral"
            variant="subtle"
            size="lg"
            class="font-sans text-base sm:text-lg"
          >
            <Icon name="lucide:calendar" size="18" class="mr-2" />
            <DatetimeParser :value="data.datePublished" :locale="locale" />
          </UBadge>
        </div>

        <!-- Excerpt -->
        <MDC
          v-if="data?.excerpt"
          :value="data.excerpt"
          tag="div"
          class="font-serif italic text-center text-lg sm:text-xl lg:text-2xl text-neutral-600 mb-12 sm:mb-16 leading-relaxed max-w-2xl"
        />

        <!-- Divider -->
        <div class="flex items-center gap-4 mb-12 sm:mb-16 w-full max-w-md">
          <div class="h-px flex-1 bg-neutral-200" />
          <Icon name="lucide:feather" class="text-neutral-300" size="20" />
          <div class="h-px flex-1 bg-neutral-200" />
        </div>

        <!-- Rich Text Body -->
        <div
          class="flex flex-col gap-4 prose prose-neutral prose-lg max-w-none w-full mb-12 sm:mb-16 prose-headings:font-sans prose-headings:font-bold prose-headings:mt-10 prose-headings:mb-6 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:leading-snug prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:leading-snug prose-p:font-serif prose-p:text-base prose-p:sm:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-a:text-neutral-900 prose-a:underline prose-a:underline-offset-4 prose-a:decoration-2 prose-a:inline-block prose-a:min-h-[44px] prose-a:flex prose-a:items-center prose-ul:my-8 prose-ul:space-y-3 prose-ol:my-8 prose-ol:space-y-3 prose-li:text-base prose-li:sm:text-lg prose-li:leading-relaxed prose-li:my-2 prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8"
          v-html="sanitize(data?.bodyRich)"
        />

        <!-- CTA -->
        <CtaHire />
      </article>

      <!-- Recommended Stories -->
      <section class="w-full max-w-6xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12">
        <ClientOnly>
          <Suspense>
            <RecommenderStories
              v-if="data?.story"
              :tags="data.tags"
              path="jurnal"
              :slug="validatedSlug"
              :title="data.title || ''"
            />
            <template #fallback>
              <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
              >
                <CardStoryLoader v-for="i in 3" :key="`rec-loader-${i}`" />
              </div>
            </template>
          </Suspense>
        </ClientOnly>
      </section>
    </div>
  </main>
</template>
