<script setup lang="ts">
import MarkdownIt from 'markdown-it'
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns'
// eslint-disable-next-line import/no-duplicates
import { enGB as en, id } from 'date-fns/locale'
import { StoryblokStoriesResponse, StoryblokStory } from '~~/utils/types'

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const sb = useSb()
const { t, locale } = useI18n({
  useScope: 'local'
})

const storyblokApi = useStoryblokApi()
const { $mdit } = useNuxtApp()

const story = ref<StoryblokStory | null | undefined>(null)

defineI18nRoute({
  paths: {
    en: '/journals/[slug]',
    id: '/jurnal/[slug]'
  }
})

const { data }: { data: StoryblokStoriesResponse } = await storyblokApi.get(
  `cdn/stories/posts/${route.params.slug}`,
  {
    language: locale.value,
    version: 'published',
    cv: sb.cv || Number(Date.now())
  }
)
story.value = data.story

const body = computed<string | undefined>(() => {
  return ($mdit as MarkdownIt).render(story.value?.content.body || '')
})

const excerpt = computed<string | undefined>(() => {
  return ($mdit as MarkdownIt).renderInline(story.value?.content.excerpt || '')
})

const featuredImage = computed<string | undefined>(() => {
  if (!story.value?.content.featured_image) { return }
  return storyblokImage({
    height: 0,
    url: story.value?.content.featured_image?.filename,
    width: 1200
  })
})

const tags = computed<string[] | undefined>(() => {
  return story.value?.tag_list
})

const title = computed<string | undefined>(() => {
  return story.value?.content.title
})

const publishDate = computed<string | undefined>(() => {
  if (!story.value?.first_published_at) { return }
  return format(new Date(story.value?.first_published_at || ''), DATETIME_FORMAT_DEFAULT, { locale: locale.value === 'en' ? en : id })
})

useHead(seo({
  description: excerpt.value || '',
  image: featuredImage.value || undefined,
  title: `${t('storyOf')} ${title.value} ${t('by')} ${SEO_TITLE_DEFAULT}`,
  url: `${runtimeConfig.baseUrl}${route.fullPath}`,
  canonical: `${runtimeConfig.baseUrl}/jurnal/${route.params.slug}`
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
  <main class="flex flex-col p-4">
    <div
      class="aspect-video bg-center bg-cover bg-no-repeat mb-8 mx-auto rounded-md shadow-black/10 shadow-lg w-full max-w-6xl"
      :style="{ backgroundImage: `url(${featuredImage})` }"
    />
    <div class="flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
      <HeadingPrimary class="mb-8">
        {{ title }}
      </HeadingPrimary>
      <div class="flex flex-col items-center gap-2 mb-8">
        <span>{{ publishDate }}</span>
      </div>
      <p class="flex italic mb-8 text-center" v-html="excerpt" />
      <div class="_body flex flex-col mb-8" v-html="body" />

      <!-- <ul class="flex items-center justify-center w-full gap-2">
        <li v-for="tag in tags" :key="tag">{{ tag }}</li>
      </ul> -->
    </div>

    <div class="flex mx-auto w-full max-w-6xl">
      <RecommenderStories
        v-if="story"
        :tags="tags"
        path="jurnal"
        :title="title || ''"
      />
    </div>
  </main>
</template>

<style lang="postcss" scoped>
:deep(._body) {
  a {
    @apply text-blue-800;

    &:visited {
      @apply text-blue-900;
    }
  }

  p {
    @apply mb-4 mx-0;

    @screen md {
      @apply mx-20;
    }
  }

  pre {
    @apply bg-black mb-4 mx-0 overflow-x-auto rounded p-4 text-white text-sm font-mono;

    @screen md {
      @apply mx-20;
    }
  }

  table {
    @apply border-collapse mb-4 table-auto text-sm w-full;

    th {
      @apply border-b dark:border-slate-600 font-bold p-2 text-left;
    }

    td {
      @apply border-b border-slate-100 dark:border-slate-700 p-2;
    }
  }

  ul {
    @apply list-disc list-outside mb-4 mx-0 pl-4;

    @screen md {
      @apply mx-20;
    }
  }
}
</style>
