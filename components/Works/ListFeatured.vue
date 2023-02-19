<script setup lang="ts">
import { StoryblokStory, StoryblokStoriesResponse } from "~~/utils/types";
// import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n({
  useScope: 'local'
})
const sb = useSb()
const storyblokApi = useStoryblokApi();
const stories = ref<StoryblokStory[] | null | undefined>(null);


onMounted(async() => {
  try {
    const { data }: { data: StoryblokStoriesResponse } = await storyblokApi.get(
      `cdn/stories`,
      {
        language: locale.value,
        version: "published",
        starts_with: "works",
        per_page: 6,
        sort_by: 'content.is_featured:asc',
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

<i18n lang="yaml">
en:
  heading: 'Works & Contributions'
id:
  heading: 'Karya & Kontribusi'
</i18n>

<template>
  <div id="latest-works" class="flex flex-col w-full">
    <div class="container flex flex-col items-center mx-auto p-4 w-full">
      <h2 class="flex font-medium font-sans mb-4 lg:mb-8 text-2xl lg:text-5xl">
        {{ t('heading') }}
      </h2>
      <div class="flex w-full">
        <div v-if="stories" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 w-full">
          <CardStory 
            v-for="story in stories" 
            :story="story" 
            :key="story.uuid"
            path="karya"
          />
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
    </div>
    

      
      
  </div>
    
</template>