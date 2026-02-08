<script setup lang="ts">
import type { ISbStoryData } from "storyblok-js-client";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
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
    $fetch<ISbStoryData[]>("/api/storyblok/works", {
      query: { locale: locale.value },
    }),
  {
    watch: [locale],
    server: true,
    lazy: true,
  },
);

if (error.value) {
  notifications.add({
    type: NOTIFICATION_TYPE.ERROR,
    message: "Error fetching data",
  });
}

const stories = computed(() => data.value || null);

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

// Schema.org CollectionPage
useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: pageTitle.value,
    description: t("seoDescription"),
  }),
]);
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
  <main
    class="flex flex-col gap-10 sm:gap-14 lg:gap-16 w-full p-4 sm:p-6 lg:p-8 relative"
  >
    <!-- Page Header -->
    <section class="flex flex-col w-full max-w-4xl mx-auto">
      <div class="flex flex-col gap-5 sm:gap-7 items-center px-4 w-full">
        <HeadingPrimary class="!mb-0">
          {{ t("heading") }}
        </HeadingPrimary>

        <p
          class="font-serif italic text-center text-base sm:text-lg lg:text-xl text-neutral-600 max-w-2xl leading-relaxed"
        >
          {{ t("intro") }}
        </p>

        <!-- Decorative divider -->
        <div class="flex items-center gap-3 mt-3 sm:mt-4">
          <div class="h-px w-16 sm:w-20 bg-neutral-300" />
          <Icon name="lucide:briefcase" class="text-neutral-400" size="22" />
          <div class="h-px w-16 sm:w-20 bg-neutral-300" />
        </div>
      </div>
    </section>

    <!-- Works Grid Section -->
    <section class="flex flex-col w-full max-w-7xl mx-auto">
      <div class="flex items-center justify-center w-full">
        <!-- Loading State -->
        <div
          v-if="status === ASYNC_DATA_STATUS.PENDING"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 w-full"
        >
          <CardStoryLoader v-for="i in 8" :key="`card-story-loader-${i}`" />
        </div>

        <!-- Works List -->
        <WorksListAll v-else :stories="stories" />
      </div>
    </section>
  </main>
</template>
