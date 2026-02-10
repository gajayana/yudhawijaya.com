<script setup lang="ts">
import type { ISbStoryData } from "storyblok-js-client";
import type { PropType } from "vue";
import { sampleSize } from "lodash-es";

const props = defineProps({
  path: {
    type: String as PropType<"karya" | "jurnal">,
    required: true,
  },
  tags: {
    type: Array as PropType<string[]>,
    required: false,
    default: () => [],
  },
  slug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
const { t, locale } = useI18n({
  useScope: "local",
});

const notifications = useToastNotifications();
const apiPath =
  props.path === "karya" ? "/api/storyblok/works" : "/api/storyblok/posts";

const { data, error, status } = await useLazyAsyncData(
  `recommended-stories-${props.path}-${props.slug}`,
  () => $fetch<ISbStoryData[]>(apiPath, { query: { locale: locale.value } }),
  {
    server: false,
    immediate: true,
    transform: (allStories: ISbStoryData[]) => {
      // Exclude current story and filter by tags if provided
      let filtered = allStories.filter((s) => s.slug !== props.slug);
      if (props.tags?.length) {
        const tagged = filtered.filter((s) =>
          s.tag_list?.some((tag: string) => props.tags.includes(tag))
        );
        if (tagged.length) filtered = tagged;
      }
      return {
        stories: filtered.length
          ? (sampleSize(filtered, 3) as ISbStoryData[])
          : null,
      };
    },
  }
);

// Watch for errors and retry
watchEffect(() => {
  if (error.value) {
    notifications.add({
      type: NOTIFICATION_TYPE.ERROR,
      message: "Error fetching recommended stories. Retrying...",
    });

    setTimeout(() => {
      refreshNuxtData(`recommended-stories-${props.path}-${props.slug}`);
    }, 3000);
  }
});

const stories = computed(() => data.value?.stories || null);
</script>

<i18n lang="yaml">
en:
  heading: "Related Stories"
  loading: "Loading..."
id:
  heading: "Kisah-kisah Terkait"
  loading: "Memuat..."
</i18n>

<template>
  <div class="flex justify-center">
    <div v-if="status === ASYNC_DATA_STATUS.PENDING" class="flex text-white">
      {{ t("loading") }}
    </div>
    <div v-else class="flex flex-col items-center w-full">
      <HeadingSecondary>
        {{ t("heading") }}
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
  </div>
</template>
