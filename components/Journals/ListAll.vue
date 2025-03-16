<script setup lang="ts">
import type { ISbStoryData } from "@storyblok/vue";
import type { PropType } from "vue";

const props = defineProps({
  stories: {
    type: [Array, null, undefined] as PropType<
      ISbStoryData[] | null | undefined
    >,
    required: true,
  },
});

// Memoize stories to prevent unnecessary re-renders
const stories = computed(() => props.stories);

// Define chunk size for virtual list
const CHUNK_SIZE = 4;

// Create chunked stories for better performance
const chunkedStories = computed(() => {
  const storyList = stories.value;
  if (!storyList?.length) return [];
  return Array.from(
    { length: Math.ceil(storyList.length / CHUNK_SIZE) },
    (_, i) => storyList.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
  );
});
</script>

<template>
  <div class="flex flex-col w-full">
    <div
      v-if="stories"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full"
    >
      <template
        v-for="(chunk, chunkIndex) in chunkedStories"
        :key="`chunk-${chunkIndex}`"
      >
        <ClientOnly>
          <Suspense>
            <CardStory
              v-for="story in chunk"
              :key="story.uuid"
              :story="story"
              path="jurnal"
            />
            <template #fallback>
              <CardStoryLoader
                v-for="i in CHUNK_SIZE"
                :key="`loader-${chunkIndex}-${i}`"
              />
            </template>
          </Suspense>
        </ClientOnly>
      </template>
    </div>
  </div>
</template>
