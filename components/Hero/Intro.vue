<script setup lang="ts">
import type { ISbRichtext, ISbStoryData } from 'storyblok-js-client'

const props = defineProps({
  story: {
    type: Object as PropType<ISbStoryData>,
    required: true
  }
})

const { t } = useI18n({
  useScope: 'local'
})

const scrollToWorks = () => {
  if (!window) { return }
  const el = document.getElementById('latest-works')
  if (!el) { return }

  if ('scrollBehavior' in document.documentElement.style) {
    return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  } else {
    return window.scrollTo(0, el.offsetTop)
  }
}

const hero = computed(() => {
  const datum = props.story.content.body.find((item:{component:string; headline:string; teaser:string; teaser_rich:ISbRichtext }) => item.component.toLowerCase() === 'hero')
  return {
    title: datum.headline || null,
    text: datum.teaser_rich || null
  }
})

</script>

<i18n lang="yaml">
en:
  buttonWorks: 'Works & Contributions'
id:
  buttonWorks: 'Karya & Kontribusi'
</i18n>

<template>
  <div
    class="flex flex-col p-4 w-full"
    :style="{
      height: 'calc(100vh - 4rem)'
    }"
  >
    <div class="bg-transparent from-indigo-600 to-indigo-800 flex h-full items-center justify-center rounded-md w-full p-4">
      <div class="max-w-xl mx-auto">
        <HeadingPrimary v-if="hero.title" class="drop-shadow font-sans font-medium leading-tight mb-4 sm:mb-8 text-center text-3xl md:text-6xl lg:text-8xl text-white">
          {{ hero.title }}
        </HeadingPrimary>

        <div v-if="hero.text" class="drop-shadow font-serif leading-snug sm:leading-tight mb-4 sm:mb-8 text-center text-md sm:text-2xl text-white" v-html="renderRichText(hero.text || '')" />

        <div class="flex items-center justify-center">
          <button
            class="border border-white drop-shadow flex px-8 py-2 mr-4 rounded-sm text-white uppercase"
            @click="scrollToWorks"
          >
            {{ t('buttonWorks') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
