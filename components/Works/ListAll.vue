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
    <!-- Works Grid -->
    <div
      v-if="stories && stories.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 lg:gap-8 w-full"
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
              path="karya"
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

    <!-- Empty State -->
    <UCard v-else class="w-full max-w-md mx-auto">
      <div class="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
          <Icon name="lucide:folder-open" size="32" class="text-neutral-400" />
        </div>
        <div class="flex flex-col gap-2">
          <h3 class="font-sans font-medium text-lg text-neutral-900">
            No works yet
          </h3>
          <p class="font-serif text-neutral-600 text-sm">
            Check back soon for new projects and contributions
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>
