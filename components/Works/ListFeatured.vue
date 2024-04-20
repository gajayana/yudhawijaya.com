<script setup lang="ts">

const { t, locale } = useI18n({
  useScope: 'local'
})
const sb = useSb()
const storyblokApi = useStoryblokApi()
const stories = ref<StoryblokStory[] | null | undefined>(null)
const notifications = useToastNotifications()

const { data, pending, error } = await useAsyncData( //, refresh
  'works',
  async () => await storyblokApi.get(
    'cdn/stories',
    {
      language: locale.value,
      version: 'published',
      starts_with: 'works',
      per_page: 6,
      sort_by: 'content.is_featured:asc',
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

stories.value = data?.value?.data?.stories as StoryblokStory[]

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
      <HeadingSecondary>
        {{ t('heading') }}
      </HeadingSecondary>
      <div class="flex w-full">
        <div v-if="pending" class="flex items-center justify-center w-full">
          <p>{{ $t('loading') }}</p>
        </div>
        <div v-else class="flex w-full">
          <div v-if="stories" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 w-full">
            <CardStory
              v-for="story in stories"
              :key="story.uuid"
              :story="story"
              path="karya"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
