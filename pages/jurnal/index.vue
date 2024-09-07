<script setup lang="ts">

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const sb = useSb()
const { t, locale } = useI18n({
  useScope: 'local'
})

const storyblokApi = useStoryblokApi()
const notifications = useToastNotifications()

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

const { data, status, error } = await useAsyncData( //, refresh
  `posts-${locale}`,
  () => storyblokApi.get(
    'cdn/stories',
    {
      language: locale.value,
      version: 'published',
      starts_with: 'posts',
      per_page: 12,
      sort_by: 'first_published_at:desc',
      cv: sb.cv || Number(Date.now())
    }
  ),
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

const stories = computed(() =>
  data.value ? data.value.data.stories : null
)

// manually refresh data when locale changes
watch(locale, async () => {
  await refreshNuxtData()
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
        <div
          v-if="status === ASYNC_DATA_STATUS.PENDING"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
        >
          <CardStoryLoader v-for="i in 4" :key="`card-story-loader-${i}`" />
        </div>
        <JournalsListAll v-else :stories="stories" />
      </div>
    </section>
  </main>
</template>
