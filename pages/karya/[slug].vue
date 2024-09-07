<script setup lang="ts">
import { isFuture } from 'date-fns'
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const sb = useSb()
const { t, locale } = useI18n({
  useScope: 'local'
})

const storyblokApi = useStoryblokApi()

defineI18nRoute({
  paths: {
    en: '/works/[slug]',
    id: '/karya/[slug]'
  }
})

const { data, status, error } = await useAsyncData(
  `post-${route.params.slug}-${locale}`,
  () => storyblokApi.get(
      `cdn/stories/works/${route.params.slug}`,
      {
        language: locale.value,
        version: 'published',
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

const story = computed(() =>
  data.value ? data.value.data.story : null
)

// const { data }: { data: StoryblokStoriesResponse } = await storyblokApi.get(
//   `cdn/stories/works/${route.params.slug}`,
//   {
//     language: locale.value,
//     version: 'published',
//     cv: sb.cv || Number(Date.now())
//   }
// )
// story.value = data.story

// const body = computed<string>(() => {
//   return story.value?.content.body || ''
// })

const bodyRich = computed(() =>
  renderRichText(story.value?.content.body_rich || '')
)

const excerpt = computed<string>(() => {
  return story.value?.content.excerpt || ''
})

const featuredImage = computed<string | undefined>(() => {
  if (!story.value?.content.featured_image) { return }
  return storyblokImage({
    height: 0,
    url: story.value?.content.featured_image?.filename,
    width: 1200
  })
})

const period = computed<{ startDate: string, endDate: string }>(() => {
  const endDate = isFuture(new Date(story.value?.content.date_end || '')) ? t('ongoing') : story.value?.content.date_end || ''
  return {
    startDate: story.value?.content.date_start || '',
    endDate
  }
})

const tags = computed<string[]|undefined>(() => {
  return story.value?.tag_list
})

const title = computed<string | undefined>(() => {
  return story.value?.content.title
})

const url = computed<string | undefined>(() => {
  return urlIsInvalid.value ? story.value?.content.url : story.value?.content.url || ''
})

const urlIsInvalid = computed<boolean>(() => {
  return story.value?.content.url_is_invalid || false
})

// manually refresh data when locale changes
watch(locale, async () => {
  await refreshNuxtData()
})

useHead(seo({
  description: excerpt.value || '',
  image: featuredImage.value || undefined,
  title: `${t('storyOf')} ${title.value} ${t('by')} ${SEO_TITLE_DEFAULT}`,
  url: `${runtimeConfig.public.baseUrl}${route.fullPath}`,
  canonical: `${runtimeConfig.public.baseUrl}/karya/${route.params.slug}`
}))

useJsonld({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title.value,
  datePublished: story.value?.first_published_at,
  dateModified: story.value?.published_at
})

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
  <main class="flex flex-col p-4 relative">
    <div v-if="status === ASYNC_DATA_STATUS.PENDING" class="flex flex-col">
      <div
        class="animate-pulse aspect-video bg-white/50 mb-8 mx-auto rounded-md shadow-black/10 shadow-lg w-full max-w-6xl"
      />
      <div class="flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
        <div class="animate-pulse bg-white/50 drop-shadow h-[1.875rem] md:h-9 lg:h-24 mb-4 sm:mb-8 mx-auto w-full max-w-3xl" />
        <div class="animate-pulse bg-white/50 drop-shadow h-4 mb-8 mx-auto w-40" />
        <div class="animate-pulse bg-white/50 drop-shadow h-4 mb-8 mx-auto w-full max-w-2xl" />
        <div class="flex flex-col gap-2 w-full">
          <div v-for="i in 5" :key="`skeleton-paragraph-${i}`" class="animate-pulse bg-white/50 drop-shadow h-4 mx-auto w-full" />
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col">
      <div class="aspect-video mb-8 mx-auto overflow-hidden rounded-md shadow-black/10 shadow-lg w-full max-w-6xl">
        <NuxtImg :src="featuredImage" class="object-cover w-full" />
      </div>
      <div class="flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
        <HeadingPrimary class="mb-8">
          {{ title }}
        </HeadingPrimary>

        <MDC :value="excerpt" tag="div" class="drop-shadow flex italic mb-8 text-center text-white" />

        <div class="flex flex-col items-center gap-2 mb-8">
          <MDC :value="url" tag="div" class="drop-shadow text-white" />
          <span v-if="period.startDate" class="drop-shadow flex gap-1 items-center text-white">
            <DatetimeParser :value="period.startDate" :locale="locale" />
            <span>-</span>
            <span v-if="period.endDate === t('ongoing')">{{ t('ongoing') }}</span>
            <DatetimeParser v-else :value="period.endDate" :locale="locale" />
          </span>
        </div>

        <div class="_body flex flex-col mb-8" v-html="bodyRich" />

      <!-- <ul class="flex items-center justify-center w-full gap-2">
        <li v-for="tag in tags" :key="tag">{{ tag }}</li>
      </ul> -->
      </div>
      <div class="flex mx-auto w-full max-w-6xl">
        <RecommenderStories v-if="story" :tags="tags" path="karya" :slug="route.params.slug as string" :title="title || ''" />
      </div>
    </div>
  </main>
</template>

<style lang="postcss" scoped>
:deep(._body) {
  a {
    @apply text-white;

    &:visited {
      @apply text-white/90;
    }
  }

  p {
    @apply drop-shadow mb-4 mx-0 text-white;

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

  ul {
    @apply list-disc list-outside mb-4 mx-0 pl-4;

    @screen md {
      @apply mx-20;
    }
  }
}

:deep(._external) {
  a {
    @apply text-white;

    &:visited {
      @apply text-white/90;
    }
  }
}
</style>
