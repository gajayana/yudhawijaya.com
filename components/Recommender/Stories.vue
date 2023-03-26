<script setup lang="ts">
import sampleSize from 'lodash/sampleSize'
import consola from 'consola'
import { StoryblokStoriesResponse, StoryblokStory } from '~~/utils/types'

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
const loading = ref<boolean>(true)
const stories = ref<StoryblokStory[] | null | undefined>(null)

onMounted(async () => {
  try {
    const { data }: { data: StoryblokStoriesResponse } = await storyblokApi.get(
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

    stories.value = sampleSize(data.stories, 3)
    sb.setCv(data.cv)
  } catch (error) {
    consola.log({ error })
  } finally {
    loading.value = false
  }
})

</script>

<i18n lang="yaml">
en:
  heading: 'Related Stories'
id:
  heading: 'Kisah-kisah Terkait'
</i18n>

<template>
  <div v-if="loading">
    Loading...
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
