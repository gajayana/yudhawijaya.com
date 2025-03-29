<script setup lang="ts">
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

const { data, status, error } = await useAsyncData(
  `post-${route.params.slug}-${locale}`,
  () =>
    storyblokApi.get(`cdn/stories/posts/${route.params.slug}`, {
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
      bodyRich: renderRichText(response.data.story?.content.body_rich, {
        schema: customStoryblokRichTextSchema,
      }),
      dateModified: response.data.story?.published_at,
      datePublished: response.data.story?.first_published_at,
      excerpt: response.data.story?.content.excerpt,
      featuredImage: response.data.story?.content.featured_image.filename,
      tags: response.data.story?.tag_list,
      title: response.data.story?.content.title,
    }),
  }
);

// Watch for errors and retry
watchEffect(() => {
  if (error.value) {
    notifications.add({
      type: NOTIFICATION_TYPE.ERROR,
      message: "Error fetching data. Retrying...",
    });

    setTimeout(() => {
      refreshNuxtData(`post-${route.params.slug}-${locale}`);
    }, 3000);
  }
});

// Computed properties for better reactivity
const seoImage = computed(() =>
  data.value?.featuredImage
    ? storyblokImage({
        height: 0,
        url: data.value.featuredImage,
        width: 1200,
      })
    : undefined
);

// SEO optimization
const pageTitle = computed(
  () => `${t("storyOf")} ${data.value?.title} ${t("by")} ${SEO_TITLE_DEFAULT}`
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
  });
}

defineArticle({
  headline: data.value?.title,
  description: data.value?.excerpt,
  image: seoImage.value,
  datePublished: data.value?.datePublished
    ? new Date(data.value.datePublished)
    : undefined,
  dateModified: data.value?.dateModified
    ? new Date(data.value.dateModified)
    : undefined,
});
</script>

<i18n lang="yaml">
en:
  by: "by"
  ongoing: "ongoing"
  storyOf: "Story of"
id:
  by: "oleh"
  ongoing: "berlangsung"
  storyOf: "Kisah"
</i18n>

<template>
  <main class="flex flex-col p-4 relative">
    <div v-if="status === ASYNC_DATA_STATUS.PENDING" class="flex flex-col">
      <div
        class="animate-pulse aspect-video bg-white/50 mb-8 mx-auto rounded-md shadow-black/10 shadow-lg w-full max-w-6xl"
      />
      <div
        class="flex flex-col items-center justify-center w-full max-w-3xl mx-auto"
      >
        <div
          class="animate-pulse bg-white/50 drop-shadow h-[1.875rem] md:h-9 lg:h-24 mb-4 sm:mb-8 mx-auto w-full max-w-3xl"
        />
        <div
          class="animate-pulse bg-white/50 drop-shadow h-4 mb-8 mx-auto w-40"
        />
        <div
          class="animate-pulse bg-white/50 drop-shadow h-4 mb-8 mx-auto w-full max-w-2xl"
        />
        <div class="flex flex-col gap-2 w-full">
          <div
            v-for="i in 5"
            :key="`skeleton-paragraph-${i}`"
            class="animate-pulse bg-white/50 drop-shadow h-4 mx-auto w-full"
          />
        </div>
      </div>
    </div>

    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center min-h-[50vh]"
    >
      <p class="text-red-500">{{ error.message }}</p>
    </div>

    <div v-else class="flex flex-col">
      <ClientOnly>
        <Suspense>
          <div
            class="aspect-video mb-8 mx-auto overflow-hidden rounded-md shadow-black/10 shadow-lg w-full max-w-6xl"
          >
            <NuxtImg
              v-if="data?.featuredImage"
              :alt="data?.title"
              :src="data.featuredImage"
              class="object-cover w-full"
              format="webp"
              :height="0"
              loading="lazy"
              provider="storyblok"
              :quality="60"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1200px"
              :width="1200"
              :modifiers="{ smart: true }"
            />
          </div>
          <template #fallback>
            <div
              class="animate-pulse aspect-video bg-white/50 mb-8 mx-auto rounded-md shadow-black/10 shadow-lg w-full max-w-6xl"
            />
          </template>
        </Suspense>
      </ClientOnly>

      <div
        class="flex flex-col items-center justify-center w-full max-w-3xl mx-auto"
      >
        <HeadingPrimary class="mb-8">
          {{ data?.title }}
        </HeadingPrimary>
        <div class="flex flex-col items-center gap-2 mb-8">
          <DatetimeParser
            v-if="data?.datePublished"
            :value="data.datePublished"
            :locale="locale"
          />
        </div>

        <MDC
          v-if="data?.excerpt"
          :value="data.excerpt"
          tag="div"
          class="flex italic mb-8 text-center"
        />

        <div class="flex flex-col gap-4 mb-8" v-html="data?.bodyRich" />
      </div>

      <div class="flex mx-auto w-full max-w-6xl">
        <ClientOnly>
          <Suspense>
            <RecommenderStories
              v-if="data?.story"
              :tags="data.tags"
              path="jurnal"
              :slug="route.params.slug as string"
              :title="data.title || ''"
            />
            <template #fallback>
              <div class="animate-pulse h-48 w-full bg-white/50 rounded-md" />
            </template>
          </Suspense>
        </ClientOnly>
      </div>
    </div>
  </main>
</template>
