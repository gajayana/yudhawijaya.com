<script setup lang="ts">
import { StoryblokStory } from '~~/utils/types';

const props = defineProps({
  story: {
    type: Object as PropType<StoryblokStory>,
    required:true
  }
})

const excerpt = computed(() => {
  return props.story.content.excerpt
})

const featuredImage = computed(() => {
  // return (props.story.content.featured_image?.filename)
  return props.story.content.featured_image?.filename ?
    storyblokImage({
      height: 9/16 * 480,
      url: props.story.content.featured_image?.filename,
      width: 480,
    })
    :
    null
})

const title = computed(() => {
  return props.story.content.title
})

</script>

<template>
  <div class="bg-white flex flex-col overflow-hidden rounded shadow shadow-black/30 w-full">
    <div 
      class="aspect-video bg-black/5 bg-blend-multiply bg-center bg-cover bg-no-repeat flex overflow-hidden vignette"
      :style="{
        backgroundImage: `url(${featuredImage})`
      }"
    />
    <div class="flex flex-col p-3">
      <h3 class="font-bold font-sans leading-tight mb-2 text-xl">{{ title }}</h3>
      <p class="font-serif text-gray-800">{{ excerpt }}</p>
    </div>
      
  </div>
</template>

<style lang="postcss">
.vignette {
  box-shadow: 0 0 4rem rgba(0, 0, 0, 0.3) inset;
}
</style>