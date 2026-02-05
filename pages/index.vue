<script setup lang="ts">
import type { ISbStories, ISbStoriesParams } from "storyblok-js-client";

// Composables
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const sb = useSb();
const { locale, t } = useI18n({ useScope: "local" });
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
  { watch: [locale] }
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
  () => featuredData.value?.data.stories
);

// SEO optimization - reactive to locale changes
useSeoMeta({
  robots: "index, follow",
  title: SEO_TITLE_DEFAULT,
  ogTitle: SEO_TITLE_DEFAULT,
  description: () => t("seoDescription"),
  ogDescription: () => t("seoDescription"),
  ogImage: IMAGE_OF_ME,
  ogUrl: () => `${runtimeConfig.public.baseUrl}${route.fullPath}`,
  twitterCard: "summary_large_image",
});

// Refresh data on locale change
watch(locale, () => {
  refreshNuxtData();
});
</script>

<i18n lang="yaml">
en:
  seoDescription: "Frontend Architect building high-traffic web systems at scale. From language editor to AI & Web3 interfaces — code written with an editor's eye."
id:
  seoDescription: "Arsitek Frontend yang membangun sistem web dengan lalu lintas tinggi dalam skala besar. Dari penyelaras bahasa ke antarmuka AI & Web3 — kode ditulis dengan ketelitian editor."
</i18n>

<template>
  <main class="flex flex-col relative w-full">
    <HeroIntro />
    <WorksListFeatured :stories="featuredWorkStories" />
  </main>
</template>
