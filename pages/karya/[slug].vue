<script setup lang="ts">
import { isFuture } from "date-fns";
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
    en: "/works/[slug]",
    id: "/karya/[slug]",
  },
});

const { data, status, error } = await useAsyncData(
  `post-${route.params.slug}-${locale}`,
  () =>
    storyblokApi.get(`cdn/stories/works/${route.params.slug}`, {
      language: locale.value,
      version: "published",
      cv: sb.cv || Number(Date.now()),
    }),
  {
    watch: [locale],
    server: true,
    lazy: false,
    immediate: true,
    transform: (response) => {
      const story = response.data.story;
      const urlIsInvalid = story?.content.url_is_invalid || false;

      return {
        story,
        bodyRich: renderRichText(story.content.body_rich || undefined, {
          schema: customStoryblokRichTextSchema,
        }),
        dateModified: story.published_at ?? undefined,
        datePublished: story.first_published_at ?? undefined,
        excerpt: story.content.excerpt || undefined,
        featuredImage: story.content.featured_image?.filename || undefined,
        period: {
          startDate: story.content.date_start || "",
          endDate: isFuture(new Date(story.content.date_end || ""))
            ? t("ongoing")
            : story.content.date_end || "",
        },
        tags: story.tag_list || undefined,
        title: story.content.title || undefined,
        url: urlIsInvalid ? story.content.url : story.content.url || "",
      };
    },
  }
);

watchEffect(() => {
  if (error.value) {
    notifications.add({
      type: NOTIFICATION_TYPE.ERROR,
      message: "Error fetching data. Retrying...",
    });

    setTimeout(() => {
      refreshNuxtData(`post-${route.params.slug}-${locale}`);
    }, 1000);
  }
});

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
    description: data.value?.excerpt,
    ogDescription: data.value?.excerpt,
    ogImage: seoImage.value,
    ogUrl: `${runtimeConfig.public.baseUrl}${route.fullPath}`,
    twitterCard: "summary_large_image",
    articlePublishedTime: data.value?.datePublished,
    articleModifiedTime: data.value?.dateModified,
  });
}

useSchemaOrg(
  defineArticle({
    headline: data.value?.title,
    description: data.value?.excerpt,
    image: seoImage.value,
    datePublished: data.value?.datePublished,
    dateModified: data.value?.dateModified,
  })
);
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
        class="aspect-video bg-white/50 mb-8 mx-auto rounded-md shadow-black/10 shadow-lg w-full max-w-6xl"
      >
        <div class="animate-pulse h-full w-full" />
      </div>
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

    <div v-else class="flex flex-col">
      <div
        class="aspect-video mb-8 mx-auto overflow-hidden rounded-md shadow-black/10 shadow-lg w-full max-w-6xl"
      >
        <ClientOnly>
          <Suspense>
            <NuxtImg
              v-if="data?.featuredImage"
              alt="featured image"
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
            <template #fallback>
              <div class="animate-pulse h-full w-full bg-white/50" />
            </template>
          </Suspense>
        </ClientOnly>
      </div>
      <div
        class="flex flex-col items-center justify-center w-full max-w-3xl mx-auto"
      >
        <HeadingPrimary class="mb-8">
          {{ data?.title }}
        </HeadingPrimary>

        <MDC
          v-if="data?.excerpt"
          :value="data.excerpt"
          tag="div"
          class="flex italic mb-8 text-center"
        />

        <div class="flex flex-col items-center gap-2 mb-8">
          <MDC v-if="data?.url" :value="data.url" tag="div" />
          <span v-if="data?.period?.startDate" class="flex gap-1 items-center">
            <DatetimeParser :value="data.period.startDate" :locale="locale" />
            <span>-</span>
            <span v-if="data?.period?.endDate === t('ongoing')">{{
              t("ongoing")
            }}</span>
            <DatetimeParser
              v-else-if="data?.period?.endDate"
              :value="data?.period?.endDate"
              :locale="locale"
            />
          </span>
        </div>

        <div class="flex flex-col gap-4 mb-8" v-html="data?.bodyRich" />
      </div>
      <div class="flex mx-auto w-full max-w-6xl">
        <ClientOnly>
          <Suspense>
            <RecommenderStories
              v-if="data?.story"
              :tags="data?.tags"
              path="karya"
              :slug="route.params.slug as string"
              :title="data?.title || ''"
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
