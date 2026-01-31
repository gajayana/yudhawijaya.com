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

// LinkedIn as primary contact
const linkedInUrl = SOCIAL_ACCOUNTS.find(
  ({ medium }) => medium === "linkedin"
)!.url;

// Other social accounts (excluding LinkedIn)
const otherAccounts = computed(() =>
  SOCIAL_ACCOUNTS.filter(({ medium }) => medium !== "linkedin")
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
  heading: "Contact"
  intro: "The best way to reach me is through LinkedIn. Whether it's a project inquiry, collaboration, or just to say hello — I typically respond within a day."
  seoDescription: "Get in touch with Yosef Yudha Wijaya. Available for freelance projects and full-time roles."
  linkedinButton: "Message me on LinkedIn"
  responseTime: "Usually responds within 24 hours"
  alsoOn: "Also on"
id:
  heading: "Kontak"
  intro: "Cara terbaik untuk menghubungi saya adalah melalui LinkedIn. Baik untuk pertanyaan proyek, kolaborasi, atau sekadar menyapa — saya biasanya merespons dalam sehari."
  seoDescription: "Hubungi Yosef Yudha Wijaya. Tersedia untuk proyek lepas dan posisi penuh waktu."
  linkedinButton: "Kirim pesan di LinkedIn"
  responseTime: "Biasanya merespons dalam 24 jam"
  alsoOn: "Juga di"
</i18n>

<template>
  <main class="flex flex-col w-full p-4 relative">
    <div class="min-h-[calc(100dvh-15.063rem)] flex flex-col w-full">
      <div
        class="container flex flex-col items-center mx-auto max-w-xl w-full"
      >
        <HeadingPrimary>
          {{ t("heading") }}
        </HeadingPrimary>

        <p class="font-serif mb-8 text-center text-neutral-700">
          {{ t("intro") }}
        </p>

        <!-- Primary CTA: LinkedIn -->
        <div class="flex flex-col items-center mb-10">
          <UButton
            :to="linkedInUrl"
            target="_blank"
            color="neutral"
            size="lg"
            icon="i-mdi-linkedin"
          >
            {{ t("linkedinButton") }}
          </UButton>
          <span class="text-xs text-neutral-400 mt-3">
            {{ t("responseTime") }}
          </span>
        </div>

        <!-- Other socials -->
        <div class="flex flex-col items-center">
          <span class="text-xs text-neutral-400 uppercase tracking-wider mb-3">
            {{ t("alsoOn") }}
          </span>
          <ul class="flex gap-4">
            <li
              v-for="{ icon, medium, url } in otherAccounts"
              :key="`social-${medium}`"
              class="flex"
            >
              <a
                :href="url"
                :title="`Visit ${medium} profile`"
                rel="noreferrer noopener"
                target="_blank"
                class="text-neutral-400 transition-colors hover:text-neutral-900"
              >
                <Icon :name="icon" size="1.75rem" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </main>
</template>
