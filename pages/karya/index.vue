<script setup lang="ts">
import { StoryblokStory } from '~~/utils/types'
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const sb = useSb()
const storyblokApi = useStoryblokApi()
const { t, locale } = useI18n({
  useScope: 'local'
})
const notifications = useToastNotifications()
const stories = ref<StoryblokStory[] | null | undefined>(null)

defineI18nRoute({
  paths: {
    en: '/works',
    id: '/karya'
  }
})

useHead(seo({
  description: t('intro'),
  title: `${t('heading')} ${t('of')} ${SEO_TITLE_DEFAULT}`,
  url: `${runtimeConfig.public.baseUrl}${route.fullPath}`,
  canonical: `${runtimeConfig.public.baseUrl}/karya`
}))

const { data, pending, error } = await useAsyncData( //, refresh
  'works',
  async () => await storyblokApi.get(
    'cdn/stories',
    {
      language: locale.value,
      version: 'published',
      starts_with: 'works',
      per_page: 12,
      sort_by: 'content.date_end:desc',
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

stories.value = data.value ? data.value.data.stories as StoryblokStory[] : null

</script>

<i18n lang="yaml">
en:
  heading: 'Works & Contributions'
  intro: 'My contributions in clients and personal digital applications developments'
  of: 'of'
  ongoing: 'ongoing'
id:
  heading: 'Karya & Kontribusi'
  intro: 'Kontribusi saya terhadap pengembangan produk-produk digital klien dan personal'
  of: 'oleh'
  ongoing: 'berlangsung'
</i18n>

<template>
  <main class="flex flex-col w-full p-4">
    <div class="flex flex-col w-full">
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
          <WorksListAll v-else :stories="stories" />
        </div>
      </div>
    </div>
  </main>
</template>
