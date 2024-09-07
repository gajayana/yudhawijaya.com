<script setup lang="ts">

const { t, locale } = useI18n({
  useScope: 'local'
})
const sb = useSb()
const storyblokApi = useStoryblokApi()
const notifications = useToastNotifications()

const { data, status, error } = await useLazyAsyncData( //, refresh
  `featured-works-${locale}`,
  () => storyblokApi.get(
    'cdn/stories',
    {
      language: locale.value,
      version: 'published',
      starts_with: 'works',
      per_page: 6,
      sort_by: 'content.is_featured:desc',
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
  heading: 'Works & Contributions'
id:
  heading: 'Karya & Kontribusi'
</i18n>

<template>
  <div id="latest-works" class="flex flex-col w-full">
    <div class="flex flex-col items-center mx-auto p-4 w-full">
      <HeadingSecondary>
        <span class="drop-shadow text-white">{{ t('heading') }}</span>
      </HeadingSecondary>
      <div class="flex w-full">
        <div
          v-if="status === ASYNC_DATA_STATUS.PENDING"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
        >
          <CardStoryLoader v-for="i in 6" :key="`card-story-loader-${i}`" />
        </div>
        <div v-else class="flex w-full">
          <div v-if="stories" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <CardStory v-for="story in stories" :key="story.uuid" :story="story" path="karya" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
