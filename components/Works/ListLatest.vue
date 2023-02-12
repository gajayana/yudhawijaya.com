<script setup lang="ts">
import { StoryblokStory, StoryblokStoryResponse } from "~~/utils/types";
const sb = useSb()
const storyblokApi = useStoryblokApi();
const stories = ref<StoryblokStory | null>(null);

onMounted(async() => {
  try {
    const { data }: { data: StoryblokStoryResponse } = await storyblokApi.get(
      `cdn/stories`,
      {
        version: "published",
        starts_with: "works",
        per_page: 6,
        cv: sb.cv || Number(Date.now())
      }
    )
    stories.value = data.story
    sb.setCv(data.cv)

    console.log({ data })
  } catch (error) {
    console.log({error})
  } finally {
    
  }

    
  
}) 
</script>

<template>
  <div class="container grid grid-cols-1 lg:grid-cols-4 gap-4 mx-auto w-full">
    works
  </div>
</template>