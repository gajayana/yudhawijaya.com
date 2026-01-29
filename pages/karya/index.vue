<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const sb = useSb();
const storyblokApi = useStoryblokApi();
const { t, locale } = useI18n({
  useScope: "local",
});
const notifications = useToastNotifications();

defineI18nRoute({
  paths: {
    en: "/works",
    id: "/karya",
  },
});

const { data, status, error } = await useAsyncData(
  `works-${locale}`,
  () =>
    storyblokApi.get("cdn/stories", {
      language: locale.value,
      version: "published",
      starts_with: "works",
      per_page: 12,
      sort_by: "content.date_end:desc",
      cv: sb.cv || Number(Date.now()),
    }),
  {
    watch: [locale],
    server: true,
    lazy: true,
  }
);

if (error.value) {
  notifications.add({
    type: NOTIFICATION_TYPE.ERROR,
    message: "Error fetching data",
  });
}

const stories = computed(() => {
  if (!data.value) return null;
  return data.value.data.stories;
});

watchEffect(() => {
  if (error.value) {
    notifications.add({
      type: NOTIFICATION_TYPE.ERROR,
      message: "Error fetching data. Retrying...",
    });

    setTimeout(() => {
      refreshNuxtData(`works-${locale}`);
    }, 3000);
  }
});

const pageTitle = computed(
  () => `${t("heading")} ${t("of")} ${SEO_TITLE_DEFAULT}`
);

useHead({
  title: pageTitle.value,
});

// SEO optimization
if (import.meta.server) {
  useSeoMeta({
    robots: "index, follow",
    title: pageTitle.value,
    ogTitle: pageTitle.value,
    description: t("seoDescription"),
    ogDescription: t("seoDescription"),
    ogImage: IMAGE_OF_ME,
    twitterImage: IMAGE_OF_ME,
    ogType: "website",
    ogUrl: `${runtimeConfig.public.baseUrl}${route.fullPath}`,
    twitterCard: "summary_large_image",
  });
}
</script>

<i18n lang="yaml">
en:
  heading: "Works & Contributions"
  intro: "My contributions in clients and personal digital applications developments"
  seoDescription: "Portfolio of web development projects by Yosef Yudha Wijaya. Vue.js, Nuxt.js, React, and Laravel applications for media, enterprise, and Web3 clients."
  of: "of"
  ongoing: "ongoing"
id:
  heading: "Karya & Kontribusi"
  intro: "Kontribusi saya terhadap pengembangan produk-produk digital klien dan personal"
  seoDescription: "Portofolio proyek pengembangan web oleh Yosef Yudha Wijaya. Aplikasi Vue.js, Nuxt.js, React, dan Laravel untuk klien media, enterprise, dan Web3."
  of: "oleh"
  ongoing: "berlangsung"
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
          <Icon name="lucide:briefcase" class="text-neutral-400" size="20" />
          <div class="h-px w-12 sm:w-16 bg-neutral-300" />
        </div>
      </div>
    </section>

    <!-- Works Grid Section -->
    <section class="flex flex-col w-full max-w-7xl mx-auto">
      <div class="flex items-center justify-center w-full">
        <!-- Loading State -->
        <div
          v-if="status === ASYNC_DATA_STATUS.PENDING"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full"
        >
          <CardStoryLoader v-for="i in 8" :key="`card-story-loader-${i}`" />
        </div>

        <!-- Works List -->
        <WorksListAll v-else :stories="stories" />
      </div>
    </section>
  </main>
</template>
