<script setup lang="ts">
import { StoryblokStory } from '~~/utils/types';

const props = defineProps({
  story: {
    type: Object as PropType<StoryblokStory>,
    required:true
  }
})

console.log({story: props.story})

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
    <img v-if="featuredImage" :src="featuredImage" />
    <div class="flex flex-col p-3">
      <h3 class="font-bold font-sans leading-tight mb-2 text-xl">{{ title }}</h3>
      <p class="font-serif text-gray-800">{{ excerpt }}</p>
    </div>
      
  </div>
</template>