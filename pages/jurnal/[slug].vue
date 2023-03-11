<script setup lang="ts">
import { StoryblokStoriesResponse, StoryblokStory } from '~~/utils/types';
import { format, isFuture } from 'date-fns'
import { enGB as en, id } from 'date-fns/locale'

const route = useRoute()
const sb = useSb()
const { t, locale } = useI18n({
  useScope: 'local'
})

const storyblokApi = useStoryblokApi()
const { $mdit } = useNuxtApp()

const story = ref<StoryblokStory | null | undefined>(null);

defineI18nRoute({
  paths: {
    en: '/journals/[slug]',
    id: '/jurnal/[slug]'
  }
})

const { data }: { data: StoryblokStoriesResponse } = await storyblokApi.get(
  `cdn/stories/posts/${route.params.slug}`,
  {
    language: locale.value,
    version: "published",
    cv: sb.cv || Number(Date.now())
  }
)
story.value = data.story

const body = computed<string | undefined>(() => {
  return $mdit.render(story.value?.content.body)
})

const excerpt = computed<string | undefined>(() => {
  return $mdit.renderInline(story.value?.content.excerpt)
})

const featuredImage = computed<string | undefined>(() => {
  if (!story.value?.content.featured_image) { return }
  return storyblokImage({
    height: 0,
    url: story.value?.content.featured_image?.filename,
    width: 1200,
  })
})

const tags = computed<string[] | undefined>(() => {
  return story.value?.tag_list
})

const title = computed<string | undefined>(() => {
  return story.value?.content.title
})

useHead(seo({
  description: excerpt.value || '',
  image: featuredImage.value || undefined,
  title: `${t('storyOf')} ${title.value} ${t('by')} ${SEO_TITLE_DEFAULT}`
}))

</script>

<i18n lang="yaml">
en:
  by: 'by'
  ongoing: 'ongoing'
  storyOf: 'Story of'
id:
  by: 'oleh'
  ongoing: 'berlangsung'
  storyOf: 'Kisah'
</i18n>

<template>
  <main class="flex flex-col p-4">
    <div 
      class="aspect-video bg-center bg-cover bg-no-repeat mb-8 mx-auto rounded-md shadow-black/10 shadow-lg w-full max-w-6xl"
      :style="{ backgroundImage: `url(${featuredImage})` }"
    />
    <div class="flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
      <HeadingPrimary class="mb-8">{{ title }}</HeadingPrimary>
      <p class="flex italic mb-8 text-center" v-html="excerpt" />
      <div class="_body flex flex-col mb-8" v-html="body" />

      <!-- <ul class="flex items-center justify-center w-full gap-2">
        <li v-for="tag in tags" :key="tag">{{ tag }}</li>
      </ul> -->
    </div>
    
    <div class="flex mx-auto w-full max-w-6xl">
      <RecommenderStories 
        v-if="story" 
        :tags="tags" 
        path="posts"
        :title="title || ''"
      />
    </div>
  </main>
</template>

<style lang="postcss" scoped>
:deep(._body) {
  p {
    @apply mb-4 mx-0;

    @screen md {
      @apply mx-20;
    }
  }
}
</style>