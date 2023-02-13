<script setup lang="ts">
import { StoryblokStory, StoryblokStoriesResponse } from "~~/utils/types";
const sb = useSb()
const storyblokApi = useStoryblokApi();
const stories = ref<StoryblokStory[] | null>(null);

onMounted(async() => {
  try {
    const { data }: { data: StoryblokStoriesResponse } = await storyblokApi.get(
      `cdn/stories`,
      {
        version: "published",
        starts_with: "works",
        per_page: 6,
        cv: sb.cv || Number(Date.now())
      }
    )
    stories.value = data.stories
    sb.setCv(data.cv)
  } catch (error) {
    console.log({error})
  }
}) 
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="container flex flex-col mx-auto p-4 w-full">
      <h2>Karya</h2>
      <div class="flex w-full">
        <div v-if="stories" class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <CardStory v-for="story in stories" :story="story" :key="story.uuid" />
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
    </div>
    

      
      
  </div>
    
</template>