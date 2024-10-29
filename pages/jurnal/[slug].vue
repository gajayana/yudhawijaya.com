<script setup lang="ts">
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
    en: "/journals/[slug]",
    id: "/jurnal/[slug]",
  },
});

const { data, status, error } = await useAsyncData(
  //, refresh
  `post-${route.params.slug}-${locale}`,
  () =>
    storyblokApi.get(`cdn/stories/posts/${route.params.slug}`, {
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
  return {
    story,
    bodyRich: renderRichText(story?.content.body_rich || undefined),
    dateModified: story?.published_at || undefined,
    datePublished: story?.first_published_at || undefined,
    excerpt: story?.content.excerpt || undefined,
    featuredImage: story?.content.featured_image.filename || undefined,
    tags: story?.tag_list || undefined,
    title: story?.content.title || undefined,
  };
});

const {
  story,
  bodyRich,
  excerpt,
  featuredImage,
  dateModified,
  datePublished,
  tags,
  title,
} = rawData.value || {};

useHead(
  seo({
    description: excerpt || "",
    image: featuredImage
      ? storyblokImage({
          height: 0,
          url: featuredImage,
          width: 1200,
        })
      : undefined,
    title: `${t("storyOf")} ${title} ${t("by")} ${SEO_TITLE_DEFAULT}`,
    url: `${runtimeConfig.public.baseUrl}${route.fullPath}`,
    canonical: `${runtimeConfig.public.baseUrl}/jurnal/${route.params.slug}`,
  })
);

defineArticle({
  headline: title,
  description: excerpt,
  image: featuredImage
    ? storyblokImage({
        height: 0,
        url: featuredImage,
        width: 1200,
      })
    : undefined,
  datePublished: new Date(datePublished),
  dateModified: new Date(dateModified),
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
        <div
          class="drop-shadow flex flex-col items-center gap-2 mb-8 text-white"
        >
          <DatetimeParser
            v-if="datePublished"
            :value="datePublished"
            :locale="locale"
          />
        </div>

        <MDC
          v-if="excerpt"
          :value="excerpt || ''"
          tag="div"
          class="drop-shadow flex italic mb-8 text-center text-white"
        />

        <div class="_body flex flex-col mb-8" v-html="bodyRich" />

        <!-- <ul class="flex items-center justify-center w-full gap-2">
        <li v-for="tag in tags" :key="tag">{{ tag }}</li>
      </ul> -->
      </div>

      <div class="flex mx-auto w-full max-w-6xl">
        <RecommenderStories
          v-if="story"
          :tags="tags"
          path="jurnal"
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
    @apply text-white;

    &:visited {
      @apply text-white/90;
    }
  }

  p {
    @apply drop-shadow mb-4 mx-0 text-white;

    @screen md {
      @apply mx-20;
    }

    img {
      @apply mb-1 w-full;
    }
  }

  pre {
    @apply backdrop-blur bg-black/30 mb-4 mx-0 overflow-x-auto rounded p-4 text-white text-sm font-mono;

    @screen md {
      @apply mx-20;
    }
  }

  table {
    @apply border-collapse mb-4 table-auto text-sm w-full;

    th {
      @apply border-b dark:border-slate-600 font-bold p-2 text-left;
    }

    td {
      @apply border-b border-slate-100 dark:border-slate-700 p-2;
    }
  }

  ol,
  ul {
    @apply list-disc list-outside mb-4 mx-8 pl-4 text-white;

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
</style>
