<script setup lang="ts">
import type { ISbStories, ISbStoriesParams } from "storyblok-js-client";

// Composables
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const sb = useSb();
const { locale } = useI18n({ useScope: "local" });
const storyblokApi = useStoryblokApi();
const notifications = useToastNotifications();

// Memoize API params to avoid recreating objects
const getBaseParams = computed<ISbStoriesParams>(() => ({
  language: locale.value,
  version: "published",
  cv: sb.cv || Number(Date.now()),
}));

// Fetch featured works
const { data: featuredData, error: featuredError } = await useAsyncData(
  "home-featured",
  () =>
    storyblokApi.get("cdn/stories", {
      ...getBaseParams.value,
      starts_with: "works",
      per_page: 6,
      sort_by: "content.is_featured:desc",
    }),
  { watch: [locale] },
);

// Handle errors
if (featuredError.value) {
  notifications.add({
    type: NOTIFICATION_TYPE.ERROR,
    message: "Error fetching data",
  });
}

if (!featuredData.value) {
  throw createError({
    statusCode: 500,
    message: "Error when processing data",
  });
}

// Computed properties with type safety
const featuredWorkStories = computed<ISbStories["data"]["stories"]>(
  () => featuredData.value?.data.stories,
);

// SEO optimization - uses defaults from nuxt.config.ts
const pageTitle = computed(() => `${SEO_TITLE_DEFAULT}`);

useHead({
  title: pageTitle.value,
});

if (import.meta.server) {
  useSeoMeta({
    robots: "index, follow",
    title: pageTitle.value,
    ogTitle: pageTitle.value,
    description: SEO_DESCRIPTION_DEFAULT,
    ogDescription: SEO_DESCRIPTION_DEFAULT,
    ogImage: IMAGE_OF_ME,
    ogUrl: `${runtimeConfig.public.baseUrl}${route.fullPath}`,
    twitterCard: "summary_large_image",
  });
}

// Refresh data on locale change
watch(locale, () => {
  refreshNuxtData();
});
</script>

<template>
  <main class="flex flex-col relative w-full">
    <HeroIntro />
    <WorksListFeatured :stories="featuredWorkStories" />
  </main>
</template>
