<script setup lang="ts">
import { StoryblokStoriesResponse, StoryblokStory } from '~~/utils/types';
import { format, isFuture } from 'date-fns'
import { enGB as en, id } from 'date-fns/locale'

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const sb = useSb()
const { t, locale } = useI18n({
  useScope: 'local'
})

const storyblokApi = useStoryblokApi()
const { $mdit } = useNuxtApp()

const stories = ref<StoryblokStory[] | null | undefined>(null);

defineI18nRoute({
  paths: {
    en: '/journals',
    id: '/jurnal'
  }
})

useHead(seo({
  description: t('intro'),
  title: `${t('heading')} ${t('of')} ${SEO_TITLE_DEFAULT}`,
  url: `${runtimeConfig.baseUrl}${route.fullPath}`,
  canonical: `${runtimeConfig.baseUrl}/jurnal`
}))

try {
  const { data }: { data: StoryblokStoriesResponse } = await storyblokApi.get(
    `cdn/stories`,
    {
      language: locale.value,
      version: 'published',
      starts_with: 'posts',
      per_page: 12,
      sort_by: 'first_published_at:desc',
      cv: sb.cv || Number(Date.now())
    }
  )

  stories.value = data.stories
  sb.setCv(data.cv)
} catch (error) {
  console.log({ error })
}

</script>

<i18n lang="yaml">
en:
  heading: 'Journals'
  intro: 'Journals on things that I am interested in.'
  of: 'of'
id:
  heading: 'Jurnal'
  intro: 'Catatan bebas mengenai apa saja yang saya minati.'
  of: 'oleh'
</i18n>

<template>
  <main class="flex flex-col w-full p-4">
    <div id="latest-works" class="flex flex-col w-full">
      <div class="container flex flex-col items-center mx-auto w-full">
        
        <HeadingPrimary>
          {{ t('heading') }}
        </HeadingPrimary>

        <p class="font-serif mb-8 italic text-center">{{ t('intro') }}</p>

        <JournalsListAll :stories="stories" />
      </div>
    </div>
  </main>
</template>
