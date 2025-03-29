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
const i18nHead = useLocaleHead({
  seo: {},
});

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
useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [...(i18nHead.value.meta || [])],
});

if (import.meta.server) {
  useSeoMeta({
    robots: "index, follow",
    title: `${t("heading")} ${t("of")} ${SEO_TITLE_DEFAULT}`,
    ogTitle: `${t("heading")} ${t("of")} ${SEO_TITLE_DEFAULT}`,
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
  <main class="flex flex-col gap-8 w-full p-4 relative">
    <section class="flex flex-col w-full">
      <div class="flex flex-col gap-4 items-center mx-auto px-4 w-full">
        <HeadingPrimary>
          {{ t("heading") }}
        </HeadingPrimary>

        <p class="font-serif italic text-center">
          {{ t("intro") }}
        </p>
      </div>
    </section>
    <section class="flex flex-col w-full">
      <div class="flex items-center justify-center w-full">
        <div
          v-if="status === ASYNC_DATA_STATUS.PENDING"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
        >
          <CardStoryLoader v-for="i in 4" :key="`card-story-loader-${i}`" />
        </div>
        <JournalsListAll v-else :stories="stories" />
      </div>
    </section>
  </main>
</template>
