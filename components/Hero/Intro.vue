<script setup lang="ts">
import type { ISbRichtext, ISbStoryData } from "storyblok-js-client";

const props = defineProps({
  story: {
    type: Object as PropType<ISbStoryData>,
    required: true,
  },
});

const { t } = useI18n({
  useScope: "local",
});

// Memoize scroll target element lookup
const worksElement = ref<HTMLElement | null>(null);
onMounted(() => {
  worksElement.value = document.getElementById("latest-works");
});

const scrollToWorks = () => {
  if (!window || !worksElement.value) return;

  const supportsScrollBehavior =
    "scrollBehavior" in document.documentElement.style;
  window.scrollTo({
    top: worksElement.value.offsetTop,
    behavior: supportsScrollBehavior ? "smooth" : "auto",
  });
};

// Memoize hero content to avoid recalculation
const hero = computed(() => {
  const heroContent = props.story.content.body.find(
    (item: {
      component: string;
      headline: string;
      teaser: string;
      teaser_rich: ISbRichtext;
    }) => item.component.toLowerCase() === "hero"
  ) || { headline: null, teaser_rich: null };

  return {
    title: heroContent.headline,
    text: heroContent.teaser_rich,
  };
});

// Pre-compute static styles
const containerStyle = {
  height: "calc(100vh - 4rem)",
};
</script>

<i18n lang="yaml">
en:
  buttonWorks: "Works & Contributions"
id:
  buttonWorks: "Karya & Kontribusi"
</i18n>

<template>
  <div class="flex flex-col p-4 w-full" :style="containerStyle">
    <div
      class="bg-transparent from-indigo-600 to-indigo-800 flex h-full items-center justify-center rounded-md w-full p-4"
    >
      <div class="max-w-xl mx-auto">
        <HeadingPrimary
          v-if="hero.title"
          class="font-sans font-medium leading-tight mb-4 sm:mb-8 text-center text-3xl md:text-6xl lg:text-8xl"
        >
          {{ hero.title }}
        </HeadingPrimary>

        <div
          v-if="hero.text"
          class="font-serif leading-snug sm:leading-tight mb-4 sm:mb-8 text-center text-md sm:text-2xl"
          v-html="renderRichText(hero.text || '')"
        />

        <div class="flex items-center justify-center">
          <button
            class="border border-black flex px-8 py-2 mr-4 rounded-sm uppercase"
            @click="scrollToWorks"
          >
            {{ t("buttonWorks") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
