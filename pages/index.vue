<script setup lang="ts">
import type { ISbStoryData } from "storyblok-js-client";

// Composables
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { locale, t } = useI18n({ useScope: "local" });
const notifications = useToastNotifications();

// Fetch featured works from cached API
const { data: featuredData, error: featuredError } = await useAsyncData(
  "home-featured",
  () =>
    $fetch<ISbStoryData[]>("/api/storyblok/works", {
      query: { locale: locale.value },
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

// Sort by featured flag, take first 6
const featuredWorkStories = computed<ISbStoryData[]>(() => {
  const stories = featuredData.value || [];
  return [...stories]
    .sort((a, b) => {
      const aFeatured = a.content?.is_featured ? 1 : 0;
      const bFeatured = b.content?.is_featured ? 1 : 0;
      return bFeatured - aFeatured;
    })
    .slice(0, 6);
});

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
