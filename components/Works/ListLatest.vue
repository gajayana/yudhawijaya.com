<script setup lang="ts">
import { StoryblokStory, StoryblokStoryResponse } from "~~/utils/types";
const storyblokApi = useStoryblokApi();
const stories = ref<StoryblokStory | null>(null);

onMounted(async() => {
  const { data }: { data: StoryblokStoryResponse} = await storyblokApi.get(
    `cdn/stories`,
    {
      version: "published",
      starts_with: "works",
      per_page: 6,
      cv: 1639350028
    }
  )
  stories.value = data.story
  console.log({data})
}) 
</script>

<template>
  <div class="container grid grid-cols-1 lg:grid-cols-4 gap-4 mx-auto w-full">
    works
  </div>
</template>