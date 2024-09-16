<script setup lang="ts">
import type { ISbStories, ISbStory } from 'storyblok-js-client'

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const sb = useSb()
const { locale } = useI18n({
  useScope: 'local'
})
const storyblokApi = useStoryblokApi()
const notifications = useToastNotifications()

const { data, error, refresh } = await useAsyncData( //, status
  'page-home',
  () => {
    return Promise.all([
      storyblokApi.get(
        'cdn/stories/home',
        {
          language: locale.value,
          version: 'published',
          cv: sb.cv || Number(Date.now())
        }
      ),
      storyblokApi.get(
        'cdn/stories',
        {
          language: locale.value,
          version: 'published',
          starts_with: 'works',
          per_page: 6,
          sort_by: 'content.is_featured:desc',
          cv: sb.cv || Number(Date.now())
        }
      )
    ])
  },
  {
    watch: [locale]
  }
)

if (error.value) {
  notifications.add({
    type: NOTIFICATION_TYPE.ERROR,
    message: 'Error fetching data'
  })
}

if (!data.value) {
  throw new Error('Error when processing data')
}

const [heroData, featuredStoriesData] = data.value as [ISbStory, ISbStories]

const heroStory = computed(() => heroData.data.story)
const featuredWorkStories = computed(() => featuredStoriesData.data.stories)

useHead(seo({
  description: heroStory.value.content.meta_description,
  image: storyblokImage({ url: heroStory.value.content.og_image.filename as string, height: 480, width: 480, smart: true }),
  url: `${runtimeConfig.public.baseUrl}${route.fullPath}`
}))

// manually refresh data when locale changes
watch(locale, () => refresh())
</script>

<template>
  <main class="flex flex-col relative w-full">
    <HeroIntro :story="heroStory" />
    <WorksListFeatured :stories="featuredWorkStories" />
  </main>
</template>
