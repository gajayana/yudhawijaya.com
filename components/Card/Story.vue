<script setup lang="ts">
import type { ISbStoryData } from 'storyblok-js-client'

const localePath = useLocalePath()

const props = defineProps({
  story: {
    type: Object as PropType<ISbStoryData>,
    required: true
  },
  path: {
    type: String,
    required: true
  }
})

const rawData = computed(() => {
  return {
    excerpt: props.story.content.excerpt || null,
    featuredImage: props.story.content.featured_image?.filename
      ? storyblokImage({
        height: (9 / 16) * 768,
        url: props.story.content.featured_image?.filename,
        width: 768
      })
      : null,
    title: props.story.content.title || null
  }
})

const { excerpt, featuredImage, title } = rawData.value

</script>

<template>
  <NuxtLink
    class="bg-white/50 backdrop-blur flex flex-col group no-underline overflow-hidden rounded shadow shadow-black/30 w-full"
    :to="localePath(`/${props.path}/${story.slug}`)"
  >
    <div class="aspect-video bg-black/5 bg-blend-multiply bg-center bg-cover bg-no-repeat flex overflow-hidden vignette">
      <NuxtImg v-if="featuredImage" :src="featuredImage" class="group-hover:scale-125 transition-transform duration-300" :alt="title" />
    </div>
    <div class="flex flex-col p-3">
      <span class="drop-shadow-sm flex font-bold font-sans leading-tight mb-2 text-xl">
        {{ title }}
      </span>
      <span class="drop-shadow-sm flex font-serif text-gray-800">
        {{ excerpt }}
      </span>
    </div>
  </NuxtLink>
</template>

<style lang="postcss">
.vignette {
  box-shadow: 0 0 4rem rgba(0, 0, 0, 0.3) inset;
}
</style>
