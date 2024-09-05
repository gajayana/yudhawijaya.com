<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const sb = useSb()
const { t, locale } = useI18n({
  useScope: 'local'
})

const storyblokApi = useStoryblokApi()
const notifications = useToastNotifications()

const fetchStatus = ref<ASYNC_DATA_STATUS>(ASYNC_DATA_STATUS.PENDING)
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
  url: `${runtimeConfig.public.baseUrl}${route.fullPath}`,
  canonical: `${runtimeConfig.public.baseUrl}/jurnal`
}))

const fetchStories = async () => {
  const { data, status, error } = await useAsyncData( //, refresh
    `posts-${locale}`,
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

  fetchStatus.value = status.value as ASYNC_DATA_STATUS
  stories.value = data.value ? data.value.data.stories as StoryblokStory[] : null
}

// Initial fetch
await fetchStories()

// Watch for locale changes and refetch data
watch(locale, async () => {
  await fetchStories()
})

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
  <main class="flex flex-col gap-8 w-full p-4 relative">
    <section class="flex flex-col w-full">
      <div class="flex flex-col gap-4 items-center mx-auto px-4 w-full">
        <HeadingPrimary>
          {{ t('heading') }}
        </HeadingPrimary>

        <p class="drop-shadow font-serif italic text-center text-white">
          {{ t('intro') }}
        </p>
      </div>
    </section>
    <section class="flex flex-col w-full">
      <div class="flex items-center justify-center w-full">
        <p v-if="fetchStatus === ASYNC_DATA_STATUS.PENDING" class="drop-shadow text-white">
          {{ $t('loading') }}
        </p>
        <JournalsListAll v-else :stories="stories" />
      </div>
    </section>
  </main>
</template>
