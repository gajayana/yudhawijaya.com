<script setup lang="ts">
import type { ISbStoryData } from "@storyblok/vue";
import type { PropType } from "vue";
import type { StoryblokStoriesResponse } from "~/utils/types";

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

const { data, error } = await useAsyncData(
  `recommended-stories-${props.path}-${props.slug}`,
  () =>
    storyblokApi.get("cdn/stories", {
      language: locale.value,
      version: "published",
      starts_with: props.path === "karya" ? "works" : "posts",
      sort_by: "content.date_end:desc",
      cv: sb.cv || Number(Date.now()),
      with_tag: props?.tags?.join(","),
      excluding_fields: ["body"].join(","),
      excluding_slugs: [
        `${props.path === "karya" ? "works" : "posts"}/${props.slug}`,
      ].join(","),
    }),
  {
    server: true,
    lazy: false,
    immediate: true,
    transform: (response: { data: StoryblokStoriesResponse }) => ({
      stories: response.data.stories?.length
        ? (useSampleSize(response.data.stories, 3) as ISbStoryData[])
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
id:
  heading: "Kisah-kisah Terkait"
</i18n>

<template>
  <ClientOnly>
    <div class="flex justify-center">
      <!-- <div v-if="status === ASYNC_DATA_STATUS.PENDING" class="drop-shadow flex text-white">
        {{ $t('loading') }}
      </div> -->
      <div class="flex flex-col items-center w-full">
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
  </ClientOnly>
</template>
