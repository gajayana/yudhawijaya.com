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

useHead(
  seo({
    description: t("intro"),
    title: `${t("heading")} ${t("of")} ${SEO_TITLE_DEFAULT}`,
    url: `${runtimeConfig.public.baseUrl}${route.fullPath}`,
    canonical: `${runtimeConfig.public.baseUrl}/karya`,
  })
);

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
</script>

<i18n lang="yaml">
en:
  heading: "Works & Contributions"
  intro: "My contributions in clients and personal digital applications developments"
  of: "of"
  ongoing: "ongoing"
id:
  heading: "Karya & Kontribusi"
  intro: "Kontribusi saya terhadap pengembangan produk-produk digital klien dan personal"
  of: "oleh"
  ongoing: "berlangsung"
</i18n>

<template>
  <main class="flex flex-col gap-8 w-full p-4 relative">
    <section class="flex flex-col w-full">
      <div class="flex flex-col gap-4 items-center mx-auto px-4 w-full">
        <HeadingPrimary class="!mb-0">
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
        <WorksListAll v-else :stories="stories" />
      </div>
    </section>
  </main>
</template>
