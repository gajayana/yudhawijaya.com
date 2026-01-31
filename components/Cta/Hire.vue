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
  <UCard
    class="mt-16 sm:mt-20 w-full max-w-3xl mx-auto bg-gradient-to-br from-neutral-50 to-white border-2 border-neutral-200"
  >
    <div class="flex flex-col items-center text-center gap-5 sm:gap-7 py-6 sm:py-8">
      <!-- Icon -->
      <div class="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-neutral-900 text-white">
        <Icon name="lucide:sparkles" size="28" class="sm:text-[32px]" />
      </div>

      <!-- Content -->
      <div class="flex flex-col gap-4 sm:gap-5">
        <h3 class="font-sans font-bold text-2xl sm:text-3xl text-neutral-900">
          {{ t("heading") }}
        </h3>
        <p class="font-serif text-neutral-600 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto px-2">
          {{ t("text") }}
        </p>
      </div>

      <!-- CTA Button -->
      <UButton
        :to="localePath('/kontak')"
        color="neutral"
        size="xl"
        trailing-icon="lucide:arrow-right"
        class="mt-3 sm:mt-4 min-h-[52px] text-base sm:text-lg px-8"
      >
        {{ t("button") }}
      </UButton>
    </div>
  </UCard>
</template>
