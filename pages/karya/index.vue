<script setup lang="ts">
import { StoryblokStory, StoryblokStoriesResponse } from "~~/utils/types";
const sb = useSb()
const storyblokApi = useStoryblokApi();
const { t, locale } = useI18n({
  useScope: 'local'
})

const stories = ref<StoryblokStory[] | null | undefined>(null);

defineI18nRoute({
  paths: {
    en: '/works',
    id: '/karya'
  }
})

useHead(seo({
  description: t('intro'),
  title: `${t('heading')} ${t('of')} ${SEO_TITLE_DEFAULT}`
}))

try {
  const { data }: { data: StoryblokStoriesResponse } = await storyblokApi.get(
    `cdn/stories`,
    {
      language: locale.value,
      version: 'published',
      starts_with: 'works',
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

        <p class="font-serif mb-8 italic text-center">{{ t('intro') }}</p>

        <WorksListAll :stories="stories" />
      </div>
    </div>
  </main>
</template>