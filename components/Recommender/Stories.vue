<script setup lang="ts">
import type { ISbStories, ISbStoryData } from "storyblok-js-client";
import type { PropType } from "vue";
import { sampleSize } from "lodash-es";

const sb = useSb();
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

const storyblokApi = useStoryblokApi();
const notifications = useToastNotifications();

const { data, error, status } = await useLazyAsyncData(
  `recommended-stories-${props.path}-${props.slug}`,
  () =>
    storyblokApi.get("cdn/stories", {
      language: locale.value,
      version: "published",
      starts_with: props.path === "karya" ? "works" : "posts",
      sort_by: "content.date_end:desc",
      cv: sb.cv || Number(Date.now()),
      ...(props.tags?.length ? { with_tag: props.tags.join(",") } : {}),
      excluding_fields: "body",
      excluding_slugs: `${props.path === "karya" ? "works" : "posts"}/${props.slug}`,
    }),
  {
    immediate: true,
    transform: (response: ISbStories) => ({
      stories: response.data.stories?.length
        ? (sampleSize(response.data.stories, 3) as ISbStoryData[])
        : null,
    }),
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
