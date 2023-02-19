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
    en: '/works/[slug]',
    id: '/karya/[slug]'
  }
})

const { data }: { data: StoryblokStoriesResponse } = await storyblokApi.get(
  `cdn/stories/works/${route.params.slug}`,
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

const period = computed<string | undefined>(() => {
  if (!story.value?.content.date_start) { return }
  const start = format(
    new Date(story.value?.content.date_start || ''), 
    'dd MMMM yyyy', 
    { locale: locale.value === 'en' ? en : id }
  )
  const end = isFuture(new Date(story.value?.content.date_end || '')) ? 
    t('ongoing') 
    : 
    format(
      new Date(story.value?.content.date_end || ''), 
      'dd MMMM yyyy',
      { locale: locale.value === 'en' ? en : id }
    )

  return `${start} - ${end}`
})

const tags = computed<string[]|undefined>(() => {
  return story.value?.tag_list
})

const title = computed<string | undefined>(() => {
  return story.value?.content.title
})

const url = computed<string | undefined>(() => {
  return $mdit.renderInline(story.value?.content.url)
})

const urlIsInvalid = computed<boolean>(() => {
  return story.value?.content.url_is_invalid || false
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
  <main class="flex flex-col">
    <HeadingPrimary>{{ title }}</HeadingPrimary>
    <p v-html="excerpt" />
    <p v-html="url" />
    <span>{{ period }}</span>
    <div class="flex flex-col" v-html="body" />
    <ul>
      <li v-for="tag in tags" :key="tag">{{ tag }}</li>
    </ul>
    <img :src="featuredImage" />
</main>
</template>