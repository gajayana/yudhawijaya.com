<script setup lang="ts">
import { StoryblokStory } from '~~/utils/types'

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const sb = useSb()
const { t, locale } = useI18n({
  useScope: 'local'
})

const storyblokApi = useStoryblokApi()
const notifications = useToastNotifications()

const stories = ref<StoryblokStory[] | null | undefined>(null)

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

const { data, pending, error } = await useAsyncData( //, refresh
  'posts',
  async () => await storyblokApi.get(
    'cdn/stories',
    {
      language: locale.value,
      version: 'published',
      starts_with: 'posts',
      per_page: 12,
      sort_by: 'first_published_at:desc',
      cv: sb.cv || Number(Date.now())
    }
  )
)

if (error.value) {
  notifications.add({
    type: 'error',
    message: 'Error fetching data'
  })
}

stories.value = data.value.data.stories as StoryblokStory[]

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

        <p class="font-serif mb-8 italic text-center">
          {{ t('intro') }}
        </p>

        <div class="flex items-center justify-center w-full">
          <p v-if="pending">
            {{ $t('loading') }}
          </p>
          <JournalsListAll v-else :stories="stories" />
        </div>
      </div>
    </div>
  </main>
</template>
