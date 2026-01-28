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

// Pre-compute image dimensions for better CLS
const imageWidth = computed(() => Math.floor((16 / 9) * 600));
</script>

<template>
  <article
    class="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 active:shadow focus-within:ring-2 focus-within:ring-primary bg-white/50 backdrop-blur rounded-lg shadow-md"
  >
    <NuxtLink
      :to="linkPath"
      class="flex flex-col no-underline focus:outline-none"
      :aria-label="`Read more about ${title}`"
    >
      <!-- Featured Image Container -->
      <div
        class="aspect-video bg-black/5 flex overflow-hidden relative w-full"
        :class="{ 'vignette': featuredImage }"
      >
        <NuxtImg
          v-if="featuredImage"
          :src="featuredImage"
          class="object-cover w-full group-hover:scale-110 transition-transform duration-500 ease-out"
          :alt="title"
          :height="600"
          :width="imageWidth"
          :modifiers="{ smart: true }"
          loading="lazy"
          provider="storyblok"
          format="webp"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <!-- Fallback for missing image -->
        <div
          v-else
          class="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-400"
        >
          <Icon name="lucide:image" size="48" />
        </div>
      </div>

      <!-- Content Container -->
      <div class="flex flex-col p-4 sm:p-5 gap-2">
        <h3
          class="font-sans font-bold text-xl leading-tight text-neutral-900 group-hover:text-primary transition-colors"
        >
          {{ title }}
        </h3>
        <p
          v-if="excerpt"
          class="font-serif text-neutral-600 text-base line-clamp-2"
        >
          {{ excerpt }}
        </p>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.vignette::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: 0 0 4rem rgba(0, 0, 0, 0.3) inset;
  pointer-events: none;
}
</style>
