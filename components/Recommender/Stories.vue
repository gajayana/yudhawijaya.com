<script setup lang="ts">
import sampleSize from 'lodash/sampleSize'
import { StoryblokStory } from '~~/utils/types'

const sb = useSb()
const props = defineProps({
  path: {
    type: String as PropType<'karya' | 'jurnal'>,
    required: true
  },
  tags: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => ([])
  },
  title: {
    type: String,
    required: true
  }
})
const { t, locale } = useI18n({
  useScope: 'local'
})

const storyblokApi = useStoryblokApi()
const stories = ref<StoryblokStory[] | null | undefined>(null)
const notifications = useToastNotifications()

const { data, pending, error } = await useAsyncData( //, refresh
  'posts',
  async () => await storyblokApi.get(
    'cdn/stories',
    {
      language: locale.value,
      version: 'published',
      starts_with: props.path === 'karya' ? 'works' : 'posts',
      sort_by: 'content.date_end:desc',
      cv: sb.cv || Number(Date.now()),
      filter_query: {
        title: {
          not_in: props.title
        }
      },
      with_tag: props?.tags?.join(','),
      excluding_fields: ['body'].join(',')
    }
  )
)

if (error.value) {
  notifications.add({
    type: 'error',
    message: 'Error fetching data'
  })
}

stories.value = sampleSize(data.value.data.stories as StoryblokStory[], 3)
</script>

<i18n lang="yaml">
en:
  heading: 'Related Stories'
id:
  heading: 'Kisah-kisah Terkait'
</i18n>

<template>
  <div v-if="pending">
    {{ $t('loading') }}
  </div>
  <div v-else class="flex flex-col items-center w-full">
    <HeadingSecondary>
      {{ t('heading') }}
    </HeadingSecondary>
    <div class="gap-8 grid grid-cols-1 md:grid-cols-3">
      <CardStory
        v-for="story in stories"
        :key="story.uuid"
        :path="props.path"
        :story="story"
      />
    </div>
  </div>
</template>
