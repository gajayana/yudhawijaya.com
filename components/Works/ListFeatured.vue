<script setup lang="ts">
import type { ISbStoryData } from 'storyblok-js-client'

const props = defineProps({
  stories: {
    type: Array as PropType<ISbStoryData[]>,
    required: true
  }
})

const { t } = useI18n({
  useScope: 'local'
})

const stories = computed(() =>
  props.stories || null
)

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
        <!--<div
          v-if="status === ASYNC_DATA_STATUS.PENDING"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
        >
          <CardStoryLoader v-for="i in 6" :key="`card-story-loader-${i}`" />
        </div>-->
        <div class="flex w-full">
          <div v-if="stories" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <CardStory v-for="story in stories" :key="story.uuid" :story="story" path="karya" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
