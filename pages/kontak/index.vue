<script setup lang="ts">
interface SocialAccount {
  icon: string;
  medium: string;
  url: string;
}

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

// Memoize filtered social accounts
const socialAccounts = computed<SocialAccount[]>(() =>
  SOCIAL_ACCOUNTS.filter(({ medium }) =>
    ["linkedin", "twitter"].includes(medium)
  )
);

const pageTitle = computed(() => `${t("heading")} ${SEO_TITLE_DEFAULT}`);

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
  heading: "Contact"
  intro: "For enquiries, or just to say hello, please contact me at these following platforms:"
id:
  heading: "Kontak"
  intro: "Silakan menyapa saya melalui platform berikut:"
</i18n>

<template>
  <main class="flex flex-col w-full p-4 relative">
    <div class="min-h-[calc(100dvh-15.063rem)] flex flex-col w-full">
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
            :key="`social-${medium}`"
            class="flex"
          >
            <a
              :href="url"
              :title="`Visit ${medium} profile`"
              rel="noreferrer noopener"
              target="_blank"
              class="text-black/90 transition-colors hover:text-black text-2xl"
            >
              <Icon :name="icon" size="3rem" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
