<script setup lang="ts">
import { StoryblokStory } from '~~/utils/types';

const props = defineProps({
  stories: {
    type: [Array, null, undefined] as PropType<StoryblokStory[] | null | undefined>,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="container flex flex-col items-center mx-auto w-full">
      <div v-if="stories" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 w-full">
        <CardStory 
          v-for="story in stories" 
          :story="story" 
          :key="story.uuid"
          path="karya"
        />
      </div>
    </div>
  </div>
</template>