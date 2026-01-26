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
  <NuxtLink
    class="bg-white/50 backdrop-blur flex flex-col group no-underline overflow-hidden rounded shadow shadow-black/30 w-full"
    :to="linkPath"
  >
    <div
      class="aspect-video bg-black/5 bg-blend-multiply bg-center bg-cover bg-no-repeat flex overflow-hidden vignette w-full"
    >
      <NuxtImg
        v-if="featuredImage"
        :src="featuredImage"
        class="group-hover:scale-125 transition-transform duration-300 w-full"
        :alt="title"
        :height="600"
        :width="imageWidth"
        :modifiers="{ smart: true }"
        loading="lazy"
        provider="storyblok"
        format="webp"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
    <div class="flex flex-col p-3">
      <span
        class="drop-shadow-sm flex font-bold font-sans leading-tight mb-2 text-xl"
      >
        {{ title }}
      </span>
      <span class="drop-shadow-sm flex font-serif text-gray-800">
        {{ excerpt }}
      </span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.vignette {
  box-shadow: 0 0 4rem rgba(0, 0, 0, 0.3) inset;
}
</style>
