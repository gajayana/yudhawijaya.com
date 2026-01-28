<script setup lang="ts">
const { t } = useI18n({
  useScope: "local",
});

const localePath = useLocalePath();
</script>

<i18n lang="yaml">
en:
  heading: "Like what you see?"
  text: "I'm open to freelance projects and full-time roles. If you need someone who obsesses over structure and ships clean code — let's talk."
  button: "Get in Touch"
id:
  heading: "Tertarik dengan apa yang Anda lihat?"
  text: "Saya terbuka untuk proyek lepas dan posisi penuh waktu. Jika Anda butuh seseorang yang terobsesi dengan struktur dan mengirimkan kode yang bersih — mari bicara."
  button: "Hubungi Saya"
</i18n>

<template>
  <div
    class="border-t border-neutral-200 flex flex-col items-center mt-8 pt-8 max-w-3xl mx-auto text-center w-full"
  >
    <h3 class="font-sans font-medium text-lg sm:text-xl mb-2">
      {{ t("heading") }}
    </h3>
    <p class="font-serif text-neutral-600 text-sm sm:text-base mb-5">
      {{ t("text") }}
    </p>
    <NuxtLink
      :to="localePath('/kontak')"
      class="bg-neutral-900 text-white px-6 py-2.5 rounded-sm text-sm font-medium hover:bg-neutral-800 transition-colors"
    >
      {{ t("button") }}
    </NuxtLink>
  </div>
</template>
