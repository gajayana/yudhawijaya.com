<script setup lang="ts">
import type { ISbStoryData } from "storyblok-js-client";

const props = defineProps({
  story: {
    type: Object as PropType<ISbStoryData>,
    required: true,
  },
});

const { t } = useI18n({
  useScope: "local",
});

const localePath = useLocalePath();

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

// Get hero headline from Storyblok
const heroTitle = computed(() => {
  const heroContent = props.story.content.body.find(
    (item: { component: string; headline: string }) =>
      item.component.toLowerCase() === "hero",
  );
  return heroContent?.headline ?? null;
});

// Pre-compute static styles
const containerStyle = {
  minHeight: "calc(100vh - 4rem)",
};

// Credentials data
const credentials = computed(() => [
  { value: "12+", label: t("credentialYears") },
  { value: "Media & Enterprise", label: t("credentialMedia") },
  { value: "Web3 Interfaces", label: t("credentialWeb3") },
]);
</script>

<i18n lang="yaml">
en:
  tagline: "Code, written with an editor’s eye"
  subtitle1: "From language editor to frontend architect, I've spent 12+ years obsessing over structure — first in sentences, now in systems."
  subtitle2: "I build frontends where state, performance, and APIs don't fight each other, and lately that means Web3 interfaces that fail gracefully instead of loudly."
  subtitle3: "The habit stuck: I still revise code the way I once revised prose — line by line, with intent."
  credentialYears: "Years Building Web Systems"
  credentialMedia: "At Scale"
  credentialWeb3: "Current Focus"
  buttonWorks: "See My Work"
  buttonContact: "Get in Touch"
id:
  tagline: "Kode, ditulis dengan ketelitian editor"
  subtitle1: "Dari penyelaras bahasa menjadi arsitek frontend, saya sudah 12+ tahun terobsesi dengan struktur — dulu di kalimat, sekarang di sistem."
  subtitle2: "Saya membangun frontend di mana state, performa, dan API tidak saling bertabrakan. Belakangan ini artinya antarmuka Web3 yang gagal dengan anggun, bukan berisik."
  subtitle3: "Kebiasaan itu melekat: saya masih merevisi kode seperti dulu merevisi tulisan — baris demi baris, dengan intensi."
  credentialYears: "Tahun Membangun Sistem Web"
  credentialMedia: "Skala Produksi"
  credentialWeb3: "Fokus Saat Ini"
  buttonWorks: "Lihat Karya"
  buttonContact: "Hubungi Saya"
</i18n>

<template>
  <div class="flex flex-col px-4 py-8 sm:py-4 w-full" :style="containerStyle">
    <div
      class="flex flex-1 items-center justify-center w-full"
    >
      <div class="max-w-2xl mx-auto">
        <!-- Tagline -->
        <p
          class="font-sans font-medium mb-3 sm:mb-4 text-sm tracking-widest uppercase text-neutral-500"
        >
          {{ t("tagline") }}
        </p>

        <!-- Main Headline (from Storyblok) -->
        <HeadingPrimary
          v-if="heroTitle"
          class="font-sans font-medium leading-tight mb-6 sm:mb-8 text-3xl md:text-5xl lg:text-6xl"
        >
          {{ heroTitle }}
        </HeadingPrimary>

        <!-- Value Proposition -->
        <div
          class="font-serif leading-relaxed mb-8 sm:mb-10 text-base sm:text-lg md:text-xl text-neutral-700 space-y-4"
        >
          <p>{{ t("subtitle1") }}</p>
          <p>{{ t("subtitle2") }}</p>
          <p>{{ t("subtitle3") }}</p>
        </div>

        <!-- Credential Highlights -->
        <div
          class="flex flex-wrap gap-6 sm:gap-10 mb-8 sm:mb-10"
        >
          <div
            v-for="cred in credentials"
            :key="cred.label"
            class="flex flex-col"
          >
            <span class="font-sans font-bold text-xl sm:text-2xl">{{
              cred.value
            }}</span>
            <span class="text-xs text-neutral-500">{{
              cred.label
            }}</span>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            class="bg-neutral-900 text-white px-8 py-3 rounded-sm font-medium hover:bg-neutral-800 transition-colors w-full sm:w-auto"
            @click="scrollToWorks"
          >
            {{ t("buttonWorks") }}
          </button>
          <NuxtLink
            :to="localePath('/kontak')"
            class="border border-neutral-900 px-8 py-3 rounded-sm font-medium hover:bg-neutral-100 transition-colors text-center w-full sm:w-auto"
          >
            {{ t("buttonContact") }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
