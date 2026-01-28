<script setup lang="ts">
import type { ISbStoryData } from "storyblok-js-client";

const props = defineProps({
  stories: {
    type: Array as PropType<ISbStoryData[]>,
    required: true,
  },
});

const { t } = useI18n({
  useScope: "local",
});

const localePath = useLocalePath();
const stories = computed(() => props.stories || null);
</script>

<i18n lang="yaml">
en:
  heading: "Works & Contributions"
  viewAll: "View all works"
  ctaHeading: "Interested in working together?"
  ctaText: "I'm open to freelance projects and full-time roles — especially if you're building something that needs to scale."
  ctaButton: "Get in Touch"
id:
  heading: "Karya & Kontribusi"
  viewAll: "Lihat semua karya"
  ctaHeading: "Tertarik untuk bekerja sama?"
  ctaText: "Saya terbuka untuk proyek lepas dan posisi penuh waktu — terutama jika Anda membangun sesuatu yang perlu di-scale."
  ctaButton: "Hubungi Saya"
</i18n>

<template>
  <div id="latest-works" class="flex flex-col w-full">
    <div class="flex flex-col items-center mx-auto p-4 w-full">
      <HeadingSecondary>
        {{ t("heading") }}
      </HeadingSecondary>
      <div class="flex w-full">
        <div class="flex w-full">
          <div
            v-if="stories"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
          >
            <CardStory
              v-for="story in stories"
              :key="story.uuid"
              :story="story"
              path="karya"
            />
          </div>
        </div>
      </div>

      <!-- View all works link -->
      <NuxtLink
        :to="localePath('/karya')"
        class="mt-8 text-neutral-600 hover:text-neutral-900 transition-colors underline underline-offset-4"
      >
        {{ t("viewAll") }} &rarr;
      </NuxtLink>

      <!-- Hire CTA -->
      <div
        class="border-t border-neutral-200 flex flex-col items-center mt-12 pt-12 max-w-xl text-center"
      >
        <h3 class="font-sans font-medium text-xl sm:text-2xl mb-3">
          {{ t("ctaHeading") }}
        </h3>
        <p class="font-serif text-neutral-600 mb-6">
          {{ t("ctaText") }}
        </p>
        <NuxtLink
          :to="localePath('/kontak')"
          class="bg-neutral-900 text-white px-8 py-3 rounded-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          {{ t("ctaButton") }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
