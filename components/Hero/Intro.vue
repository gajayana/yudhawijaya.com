<script setup lang="ts">
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

// Pre-compute static styles
const containerStyle = {
  minHeight: "calc(100vh - 4rem)",
};

// Credentials data - capability-focused, not tenure-focused
const credentials = computed(() => [
  { value: t("credentialSystemsValue"), label: t("credentialSystemsLabel") },
  { value: t("credentialScaleValue"), label: t("credentialScaleLabel") },
  { value: t("credentialFocusValue"), label: t("credentialFocusLabel") },
]);
</script>

<i18n lang="yaml">
en:
  headline: "Hi, I'm Yudha"
  tagline: "Code, written with an editor's eye"
  subtitle1: "From language editor to frontend architect, I've spent years obsessing over structure — first in sentences, now in systems."
  subtitle2: "I build frontends where state, performance, and APIs don't fight each other — lately that means AI-powered tools and Web3 interfaces where graceful degradation isn't optional."
  subtitle3: "The habit stuck: I still revise code the way I once revised prose — line by line, with intent."
  credentialSystemsValue: "High-Traffic Systems"
  credentialSystemsLabel: "News & Enterprise Scale"
  credentialScaleValue: "Production-Grade"
  credentialScaleLabel: "Architecture & Performance"
  credentialFocusValue: "AI & Web3 Systems"
  credentialFocusLabel: "RAG, Embeddings, Blockchain UX"
  buttonWorks: "See My Work"
  buttonContact: "Get in Touch"
id:
  headline: "Hai, Saya Yudha"
  tagline: "Kode, ditulis dengan ketelitian editor"
  subtitle1: "Dari penyelaras bahasa menjadi arsitek frontend, saya sudah bertahun-tahun terobsesi dengan struktur — dulu di kalimat, sekarang di sistem."
  subtitle2: "Saya membangun frontend di mana state, performa, dan API tidak saling bertabrakan — belakangan ini artinya peralatan berbasis akal imitasi (AI) dan antarmuka Web3 dengan degradasi terkontrol."
  subtitle3: "Kebiasaan itu melekat: saya masih merevisi kode seperti dulu merevisi tulisan — baris demi baris, dengan intensi."
  credentialSystemsValue: "Sistem dengan Lalu Lintas Tinggi"
  credentialSystemsLabel: "Skala Media & Korporat"
  credentialScaleValue: "Standar Produksi"
  credentialScaleLabel: "Arsitektur & Performa"
  credentialFocusValue: "Sistem AI & Web3"
  credentialFocusLabel: "RAG, Embeddings, Blockchain UX"
  buttonWorks: "Lihat Karya"
  buttonContact: "Hubungi Saya"
</i18n>

<template>
  <div class="flex flex-col px-4 py-8 sm:py-4 w-full" :style="containerStyle">
    <div class="flex flex-1 items-center justify-center w-full">
      <div class="max-w-2xl mx-auto">
        <!-- Tagline -->
        <p
          class="font-sans font-medium mb-3 sm:mb-4 text-sm tracking-widest uppercase text-neutral-500"
        >
          {{ t("tagline") }}
        </p>

        <!-- Main Headline -->
        <HeadingPrimary
          class="font-sans font-medium leading-tight mb-6 sm:mb-8 text-left text-3xl md:text-5xl lg:text-6xl"
        >
          {{ t("headline") }}
        </HeadingPrimary>

        <!-- Value Proposition -->
        <div
          class="flex flex-col font-serif leading-relaxed mb-8 sm:mb-10 text-base sm:text-lg md:text-xl text-neutral-700 space-y-4 w-full"
        >
          <p>{{ t("subtitle1") }}</p>
          <p>{{ t("subtitle2") }}</p>
          <p>{{ t("subtitle3") }}</p>
        </div>

        <!-- Credential Highlights -->
        <div class="flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-12 mb-8 sm:mb-10">
          <div
            v-for="cred in credentials"
            :key="cred.label"
            class="flex flex-col"
          >
            <span
              class="font-sans font-semibold text-sm sm:text-base tracking-wide"
              >{{ cred.value }}</span
            >
            <span class="text-xs text-neutral-500">{{ cred.label }}</span>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-3">
          <UButton
            color="neutral"
            size="lg"
            class="w-full sm:w-auto"
            @click="scrollToWorks"
          >
            {{ t("buttonWorks") }}
          </UButton>
          <UButton
            :to="localePath('/kontak')"
            variant="outline"
            color="neutral"
            size="lg"
            class="w-full sm:w-auto"
          >
            {{ t("buttonContact") }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
