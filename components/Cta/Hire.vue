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
    class="mt-12 sm:mt-16 w-full max-w-3xl mx-auto bg-gradient-to-br from-neutral-50 to-white border-2 border-neutral-200"
  >
    <div class="flex flex-col items-center text-center gap-4 sm:gap-6 py-4 sm:py-6">
      <!-- Icon -->
      <div class="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-neutral-900 text-white">
        <Icon name="lucide:sparkles" size="24" class="sm:text-[28px]" />
      </div>

      <!-- Content -->
      <div class="flex flex-col gap-3">
        <h3 class="font-sans font-bold text-xl sm:text-2xl text-neutral-900">
          {{ t("heading") }}
        </h3>
        <p class="font-serif text-neutral-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          {{ t("text") }}
        </p>
      </div>

      <!-- CTA Button -->
      <UButton
        :to="localePath('/kontak')"
        color="neutral"
        size="xl"
        trailing-icon="lucide:arrow-right"
        class="mt-2"
      >
        {{ t("button") }}
      </UButton>
    </div>
  </UCard>
</template>
