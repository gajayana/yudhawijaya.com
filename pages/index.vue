<script setup lang="ts">
import type {
  ISbStories,
  ISbStoriesParams,
  ISbStory,
} from "storyblok-js-client";

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

// Split data fetching into separate composables for better caching
const { data: heroData, error: heroError } = await useAsyncData(
  "home-hero",
  () => storyblokApi.get("cdn/stories/home", getBaseParams.value),
  { watch: [locale] }
);

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
if (heroError.value || featuredError.value) {
  notifications.add({
    type: NOTIFICATION_TYPE.ERROR,
    message: "Error fetching data",
  });
}

if (!heroData.value || !featuredData.value) {
  throw createError({
    statusCode: 500,
    message: "Error when processing data",
  });
}

// Computed properties with type safety
const heroStory = computed<ISbStory["data"]["story"]>(
  () => heroData.value?.data.story
);

const featuredWorkStories = computed<ISbStories["data"]["stories"]>(
  () => featuredData.value?.data.stories
);

// SEO optimization
if (import.meta.server) {
  useSeoMeta({
    robots: "index, follow",
    title: SEO_TITLE_DEFAULT,
    ogTitle: SEO_TITLE_DEFAULT,
    description: heroStory.value.content.meta_description,
    ogDescription: heroStory.value.content.meta_description,
    ogImage: storyblokImage({
      url: heroStory.value.content.og_image.filename as string,
      height: 480,
      width: 480,
      smart: true,
    }),
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
    <HeroIntro :story="heroStory" />
    <WorksListFeatured :stories="featuredWorkStories" />
  </main>
</template>
