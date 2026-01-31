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
  noWorks: "No works available at the moment"
  ctaHeading: "Interested in working together?"
  ctaText: "I'm open to freelance projects and full-time roles — especially if you're building something that needs to scale."
  ctaButton: "Get in Touch"
id:
  heading: "Karya & Kontribusi"
  viewAll: "Lihat semua karya"
  noWorks: "Belum ada karya yang tersedia saat ini"
  ctaHeading: "Tertarik untuk bekerja sama?"
  ctaText: "Saya terbuka untuk proyek lepas dan posisi penuh waktu — terutama jika Anda membangun sesuatu yang perlu di-scale."
  ctaButton: "Hubungi Saya"
</i18n>

<template>
  <section id="latest-works" class="flex flex-col w-full">
    <div class="flex flex-col items-center mx-auto px-4 py-8 sm:py-12 w-full max-w-7xl">
      <!-- Section Heading -->
      <HeadingSecondary>
        {{ t("heading") }}
      </HeadingSecondary>

      <!-- Stories Grid -->
      <div v-if="stories && stories.length > 0" class="w-full">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full"
        >
          <CardStory
            v-for="story in stories"
            :key="story.uuid"
            :story="story"
            path="karya"
          />
        </div>

        <!-- View All Works Link -->
        <div class="flex justify-center mt-8 sm:mt-12">
          <UButton
            :to="localePath('/karya')"
            variant="outline"
            color="neutral"
            size="lg"
            trailing-icon="lucide:arrow-right"
          >
            {{ t("viewAll") }}
          </UButton>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-12 text-center"
      >
        <Icon name="lucide:folder-open" size="64" class="text-neutral-300 mb-4" />
        <p class="font-serif text-neutral-500">
          {{ t("noWorks") }}
        </p>
      </div>

      <!-- Hire CTA Card -->
      <UCard
        class="mt-12 sm:mt-16 w-full max-w-2xl border border-neutral-200 bg-white/50 backdrop-blur"
      >
        <div class="flex flex-col items-center text-center gap-4 sm:gap-6">
          <div class="flex flex-col gap-3">
            <h3 class="font-sans font-medium text-xl sm:text-2xl text-neutral-900">
              {{ t("ctaHeading") }}
            </h3>
            <p class="font-serif text-neutral-600 text-base sm:text-lg">
              {{ t("ctaText") }}
            </p>
          </div>
          <UButton
            :to="localePath('/kontak')"
            color="neutral"
            size="lg"
            trailing-icon="lucide:send"
          >
            {{ t("ctaButton") }}
          </UButton>
        </div>
      </UCard>
    </div>
  </section>
</template>
