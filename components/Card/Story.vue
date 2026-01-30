<script setup lang="ts">
import type { ISbStoryData } from "storyblok-js-client";

const localePath = useLocalePath();

const props = defineProps({
  story: {
    type: Object as PropType<ISbStoryData>,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

// Memoize computed values to avoid recalculation
const { excerpt, featuredImage, title } = computed(() => ({
  excerpt: props.story.content.excerpt || null,
  featuredImage: props.story.content.featured_image?.filename,
  title: props.story.content.title || null,
})).value;

// Pre-compute link path
const linkPath = computed(() =>
  localePath(`/${props.path}/${props.story.slug}`)
);

// Image width for card display
const imageWidth = 800;
</script>

<template>
  <NuxtLink
    :to="linkPath"
    class="no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 rounded-lg group block"
    :aria-label="`Read more about ${title}`"
  >
    <UCard
      class="h-full transition-all duration-200 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-lg overflow-hidden"
    >
      <!-- Featured Image Container -->
      <div
        class="aspect-video bg-neutral-50 flex overflow-hidden relative w-full -m-6 mb-4"
        :class="{ 'vignette': featuredImage }"
      >
        <NuxtImg
          v-if="featuredImage"
          :src="featuredImage"
          class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
          :alt="title"
          :width="imageWidth"
          :modifiers="{ smart: true }"
          loading="lazy"
          provider="storyblok"
          format="webp"
          densities="x1 x2"
        />
        <!-- Fallback for missing image -->
        <div
          v-else
          class="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-300"
        >
          <Icon name="lucide:image" size="64" />
        </div>
      </div>

      <!-- Content Container -->
      <template #footer>
        <div class="flex flex-col gap-3 sm:gap-4 px-1 pb-1 min-h-[120px] sm:min-h-[140px]">
          <h3
            class="font-sans font-bold text-xl sm:text-2xl leading-snug text-neutral-900 group-hover:text-neutral-700 transition-colors line-clamp-2"
          >
            {{ title }}
          </h3>
          <p
            v-if="excerpt"
            class="font-serif text-neutral-600 text-base sm:text-lg line-clamp-2 leading-relaxed"
          >
            {{ excerpt }}
          </p>
        </div>
      </template>
    </UCard>
  </NuxtLink>
</template>

<style scoped>
.vignette::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: 0 0 3rem rgba(0, 0, 0, 0.2) inset;
  pointer-events: none;
}
</style>
