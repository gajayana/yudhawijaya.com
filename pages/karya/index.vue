<script setup lang="ts">
import { StoryblokStory, StoryblokStoriesResponse } from "~~/utils/types";
import { useI18n } from 'vue-i18n';
const sb = useSb()
const storyblokApi = useStoryblokApi();
const { $i18n } = useNuxtApp()

const locale = useI18n().getLocaleCookie()
const stories = ref<StoryblokStory[] | null | undefined>(null);

defineI18nRoute({
  paths: {
    en: '/works',
    id: '/karya'
  }
})

useHead({
  title: `${$i18n.t('works.heading')} ${ locale === 'en' ? 'of' : 'oleh' } ${SEO_TITLE_DEFAULT}`,
  meta: [
    { name: 'description', content: $i18n.t('works.intro') }
  ],
})

try {
  const locale = useI18n().getLocaleCookie()
  const { data }: { data: StoryblokStoriesResponse } = await storyblokApi.get(
    `cdn/stories`,
    {
      language: locale,
      version: "published",
      starts_with: "works",
      per_page: 12,
      sort_by: 'content.date_end:desc',
      cv: sb.cv || Number(Date.now())
    }
  )

  stories.value = data.stories
  sb.setCv(data.cv)
} catch (error) {
  console.log({ error })
}

</script>

<template>
  <main class="flex flex-col w-full p-4">
    <div id="latest-works" class="flex flex-col w-full">
      <div class="container flex flex-col items-center mx-auto p-4 w-full">
        <h1 class="flex font-medium font-sans mb-4 lg:mb-8 text-2xl lg:text-5xl">
          {{ $t('works.heading') }}
        </h1>

        <p class="font-serif mb-8 italic">{{ $t('works.intro') }}</p>

        <WorksListAll :stories="stories" />
      </div>
    </div>
  </main>
</template>