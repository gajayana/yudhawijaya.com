<script setup lang="ts">
import { isFuture } from "date-fns";
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const sb = useSb();
const { t, locale } = useI18n({
  useScope: "local",
});
const notifications = useToastNotifications();
const storyblokApi = useStoryblokApi();

defineI18nRoute({
  paths: {
    en: "/works/[slug]",
    id: "/karya/[slug]",
  },
});

const { data, status, error } = await useAsyncData(
  `post-${route.params.slug}-${locale}`,
  () =>
    storyblokApi.get(`cdn/stories/works/${route.params.slug}`, {
      language: locale.value,
      version: "published",
      cv: sb.cv || Number(Date.now()),
    }),
  {
    watch: [locale],
  }
);

if (error.value) {
  notifications.add({
    type: NOTIFICATION_TYPE.ERROR,
    message: "Error fetching data",
  });
}

const rawData = computed(() => {
  const story = data.value ? data.value.data.story : undefined;
  const urlIsInvalid = story.value?.content.url_is_invalid || false;

  return {
    story,
    bodyRich: renderRichText(story.content.body_rich || undefined),
    dateModified: story.published_at || undefined,
    datePublished: story.first_published_at || undefined,
    excerpt: story.content.excerpt || undefined,
    featuredImage: story.content.featured_image?.filename || undefined,
    period: {
      startDate: story.content.date_start || "",
      endDate: isFuture(new Date(story.content.date_end || ""))
        ? t("ongoing")
        : story.content.date_end || "",
    },
    tags: story.tag_list || undefined,
    title: story.content.title || undefined,
    url: urlIsInvalid ? story.content.url : story.content.url || "",
  };
});

const {
  story,
  bodyRich,
  excerpt,
  featuredImage,
  dateModified,
  datePublished,
  period,
  tags,
  title,
  url,
} = rawData.value || {};

const seoImage = featuredImage
  ? storyblokImage({
      height: 0,
      url: featuredImage,
      width: 1200,
    })
  : undefined;

useHead(
  seo({
    description: excerpt || "",
    image: seoImage,
    title: `${t("storyOf")} ${title} ${t("by")} ${SEO_TITLE_DEFAULT}`,
    url: `${runtimeConfig.public.baseUrl}${route.fullPath}`,
    canonical: `${runtimeConfig.public.baseUrl}/karya/${route.params.slug}`,
  })
);

defineArticle({
  headline: title,
  description: excerpt,
  image: seoImage,
  datePublished: new Date(datePublished),
  dateModified: new Date(dateModified),
});

// manually refresh data when locale changes
watch(locale, async () => {
  await refreshNuxtData();
});
</script>

<i18n lang="yaml">
en:
  by: "by"
  ongoing: "ongoing"
  storyOf: "Story of"
id:
  by: "oleh"
  ongoing: "berlangsung"
  storyOf: "Kisah"
</i18n>

<template>
  <main class="flex flex-col p-4 relative">
    <div v-if="status === ASYNC_DATA_STATUS.PENDING" class="flex flex-col">
      <div
        class="animate-pulse aspect-video bg-white/50 mb-8 mx-auto rounded-md shadow-black/10 shadow-lg w-full max-w-6xl"
      />
      <div
        class="flex flex-col items-center justify-center w-full max-w-3xl mx-auto"
      >
        <div
          class="animate-pulse bg-white/50 drop-shadow h-[1.875rem] md:h-9 lg:h-24 mb-4 sm:mb-8 mx-auto w-full max-w-3xl"
        />
        <div
          class="animate-pulse bg-white/50 drop-shadow h-4 mb-8 mx-auto w-40"
        />
        <div
          class="animate-pulse bg-white/50 drop-shadow h-4 mb-8 mx-auto w-full max-w-2xl"
        />
        <div class="flex flex-col gap-2 w-full">
          <div
            v-for="i in 5"
            :key="`skeleton-paragraph-${i}`"
            class="animate-pulse bg-white/50 drop-shadow h-4 mx-auto w-full"
          />
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col">
      <div
        class="aspect-video mb-8 mx-auto overflow-hidden rounded-md shadow-black/10 shadow-lg w-full max-w-6xl"
      >
        <NuxtImg
          v-if="featuredImage"
          alt="featured image"
          :src="featuredImage"
          class="object-cover w-full"
          format="webp"
          :height="0"
          loading="lazy"
          provider="storyblok"
          :quality="60"
          sizes="100vw lg:75vw"
          :width="1200"
        />
      </div>
      <div
        class="flex flex-col items-center justify-center w-full max-w-3xl mx-auto"
      >
        <HeadingPrimary class="mb-8">
          {{ title }}
        </HeadingPrimary>

        <MDC
          v-if="excerpt"
          :value="excerpt"
          tag="div"
          class="flex italic mb-8 text-center"
        />

        <div class="flex flex-col items-center gap-2 mb-8">
          <MDC v-if="url" :value="url" tag="div" />
          <span v-if="period.startDate" class="flex gap-1 items-center">
            <DatetimeParser :value="period.startDate" :locale="locale" />
            <span>-</span>
            <span v-if="period.endDate === t('ongoing')">{{
              t("ongoing")
            }}</span>
            <DatetimeParser v-else :value="period.endDate" :locale="locale" />
          </span>
        </div>

        <div class="_body flex flex-col mb-8" v-html="bodyRich" />

        <!-- <ul class="flex items-center justify-center w-full gap-2">
        <li v-for="tag in tags" :key="tag">{{ tag }}</li>
      </ul> -->
      </div>
      <div class="flex mx-auto w-full max-w-6xl">
        <RecommenderStories
          v-if="story"
          :tags="tags"
          path="karya"
          :slug="route.params.slug as string"
          :title="title || ''"
        />
      </div>
    </div>
  </main>
</template>

<style lang="postcss" scoped>
:deep(._body) {
  a {
    @apply text-blue-700;

    &:visited {
      @apply text-blue-700/90;
    }
  }

  p {
    @apply mb-4 mx-0;

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

  ol,
  ul {
    @apply list-disc list-outside mb-4 mx-8 pl-4;

    @screen md {
      @apply mx-32;
    }

    li {
      p {
        @apply mx-0;
      }
    }
  }
}

:deep(._external) {
  a {
    @apply text-blue-700;

    &:visited {
      @apply text-blue-700/90;
    }
  }
}
</style>
