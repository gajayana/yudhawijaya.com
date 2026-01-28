<script setup lang="ts">
import type { ISbStoryData } from "@storyblok/vue";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const sb = useSb();
const { t, locale } = useI18n({
  useScope: "local",
});
const storyblokApi = useStoryblokApi();
const notifications = useToastNotifications();

defineI18nRoute({
  paths: {
    en: "/journals",
    id: "/jurnal",
  },
});

const { data, status, error } = await useAsyncData(
  `posts-${locale}`,
  () =>
    storyblokApi.get("cdn/stories", {
      language: locale.value,
      version: "published",
      starts_with: "posts",
      per_page: 12,
      sort_by: "first_published_at:desc",
      cv: sb.cv || Number(Date.now()),
    }),
  {
    watch: [locale],
    server: true,
    lazy: false,
    immediate: true,
    transform: (response) => {
      return {
        stories: response.data.stories.map((story: ISbStoryData) => ({
          uuid: story.uuid,
          slug: story.slug,
          content: {
            title: story.content.title,
            excerpt: story.content.excerpt,
            featured_image: story.content.featured_image,
          },
          first_published_at: story.first_published_at,
          tag_list: story.tag_list,
        })),
      };
    },
  }
);

const stories = computed(() => data.value?.stories || null);

watchEffect(() => {
  if (error.value) {
    notifications.add({
      type: NOTIFICATION_TYPE.ERROR,
      message: "Error fetching data. Retrying...",
    });

    setTimeout(() => {
      refreshNuxtData(`posts-${locale}`);
    }, 3000);
  }
});

watch(locale, async () => {
  await refreshNuxtData(`posts-${locale}`);
});

// SEO optimization
const pageTitle = computed(
  () => `${t("heading")} ${t("of")} ${SEO_TITLE_DEFAULT}`
);

useHead({
  title: pageTitle.value,
});

if (import.meta.server) {
  useSeoMeta({
    robots: "index, follow",
    title: pageTitle.value,
    ogTitle: pageTitle.value,
    description: t("intro"),
    ogDescription: t("intro"),
    ogUrl: `${runtimeConfig.public.baseUrl}${route.fullPath}`,
    twitterCard: "summary_large_image",
  });
}
</script>

<i18n lang="yaml">
en:
  heading: "Journals"
  intro: "Journals on things that I am interested in."
  of: "of"
id:
  heading: "Jurnal"
  intro: "Catatan bebas mengenai apa saja yang saya minati."
  of: "oleh"
</i18n>

<template>
  <main class="flex flex-col gap-8 sm:gap-12 w-full p-4 sm:p-6 lg:p-8 relative">
    <!-- Page Header -->
    <section class="flex flex-col w-full max-w-4xl mx-auto">
      <div class="flex flex-col gap-4 sm:gap-6 items-center px-4 w-full">
        <HeadingPrimary class="!mb-0">
          {{ t("heading") }}
        </HeadingPrimary>

        <p class="font-serif italic text-center text-base sm:text-lg text-neutral-600 max-w-2xl">
          {{ t("intro") }}
        </p>

        <!-- Decorative divider -->
        <div class="flex items-center gap-2 mt-2">
          <div class="h-px w-12 sm:w-16 bg-neutral-300" />
          <Icon name="lucide:book-open" class="text-neutral-400" size="20" />
          <div class="h-px w-12 sm:w-16 bg-neutral-300" />
        </div>
      </div>
    </section>

    <!-- Journals Grid Section -->
    <section class="flex flex-col w-full max-w-7xl mx-auto">
      <div class="flex items-center justify-center w-full">
        <!-- Loading State -->
        <div
          v-if="status === ASYNC_DATA_STATUS.PENDING"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full"
        >
          <CardStoryLoader v-for="i in 8" :key="`card-story-loader-${i}`" />
        </div>

        <!-- Journals List -->
        <JournalsListAll v-else :stories="stories" />
      </div>
    </section>
  </main>
</template>
