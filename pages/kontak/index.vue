<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { t } = useI18n({
  useScope: "local",
});

defineI18nRoute({
  paths: {
    en: "/contact",
    id: "/kontak",
  },
});

useHead(
  seo({
    description: t("intro"),
    title: `${t("heading")} ${SEO_TITLE_DEFAULT}`,
    url: `${runtimeConfig.public.baseUrl}${route.fullPath}`,
    canonical: `${runtimeConfig.public.baseUrl}/kontak`,
  })
);

const socialAccounts = computed(() =>
  SOCIAL_ACCOUNTS.filter(({ medium }) =>
    ["linkedin", "twitter"].includes(medium)
  )
);
</script>

<i18n lang="yaml">
en:
  heading: "Contact"
  intro: "For enquiries, or just to say hello, please contact me at these following platforms:"
id:
  heading: "Kontak"
  intro: "Silakan menyapa saya melalui platform berikut:"
</i18n>

<template>
  <main class="flex flex-col w-full p-4 relative">
    <div class="flex flex-col w-full contact-content-height">
      <div class="container flex flex-col items-center mx-auto w-full">
        <HeadingPrimary>
          {{ t("heading") }}
        </HeadingPrimary>

        <p class="font-serif mb-8 italic text-center">
          {{ t("intro") }}
        </p>

        <ul class="flex gap-4">
          <li
            v-for="{ icon, medium, url } in socialAccounts"
            :key="`footer-social-${medium}`"
            class="flex"
          >
            <a
              :href="url"
              :title="url"
              rel="noreferrer"
              target="_blank"
              class="text-black/90 hover:text-black text-2xl"
            >
              <Icon :name="icon" size="3rem" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact-content-height {
  height: calc(100vh - 4rem - 9.063rem - 2rem);
}
</style>
