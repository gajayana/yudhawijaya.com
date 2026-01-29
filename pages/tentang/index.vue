<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { t } = useI18n({
  useScope: "local",
});

defineI18nRoute({
  paths: {
    en: "/about",
    id: "/tentang",
  },
});

const pageTitle = computed(() => `${t("heading")} ${SEO_TITLE_DEFAULT}`);

useHead({
  title: pageTitle.value,
});

if (import.meta.server) {
  useSeoMeta({
    robots: "index, follow",
    title: pageTitle.value,
    ogTitle: pageTitle.value,
    description: t("seoDescription"),
    ogDescription: t("seoDescription"),
    ogImage: IMAGE_OF_ME,
    twitterImage: IMAGE_OF_ME,
    ogType: "profile",
    ogUrl: `${runtimeConfig.public.baseUrl}${route.fullPath}`,
    twitterCard: "summary_large_image",
  });
}

const careerPhases = computed(() => [
  {
    period: "2003–2013",
    title: t("career.editor.title"),
    company: t("career.editor.company"),
    description: t("career.editor.description"),
  },
  {
    period: "2013–2021",
    title: t("career.developer.title"),
    company: t("career.developer.company"),
    description: t("career.developer.description"),
  },
  {
    period: "2022–present",
    title: t("career.web3.title"),
    company: t("career.web3.company"),
    description: t("career.web3.description"),
  },
]);

const skills = [
  "Vue.js / Nuxt.js",
  "React / Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Laravel",
  "Node.js",
  "WordPress",
  "Web3 / Ethers.js",
];
</script>

<i18n lang="yaml">
en:
  heading: "About"
  seoDescription: "From language editor to frontend architect — learn about Yosef Yudha Wijaya's journey building web applications that scale."
  intro: "I spent a decade editing language at Indonesia's leading newspaper before writing my first line of production code. That editorial instinct — precision, clarity, structure — still drives how I build software today."
  careerHeading: "Career Arc"
  career:
    editor:
      title: "Language Editor"
      company: "PT Kompas Media Nusantara"
      description: "Ensured accuracy and clarity across Indonesia's most respected newspaper. Developed a deep appreciation for structure, consistency, and attention to detail."
    developer:
      title: "Fullstack Developer"
      company: "PT Kompas Media Nusantara"
      description: "Built Selaras Bahasa (internal language reference tool), then led frontend development for kompas.id — migrating from WordPress to Nuxt.js and reducing CSS from 300KB to 43KB."
    web3:
      title: "Web3 Developer"
      company: "Undercurrent Capital Pte Ltd, Singapore"
      description: "Building complex UI components and API integrations for Web3 applications. Working with React, Next.js, and blockchain tooling in a fast-moving ecosystem."
  philosophyHeading: "Philosophy"
  philosophy: "Editorial precision in code. I treat every component like a well-edited paragraph — it should be clear, purposeful, and free of unnecessary complexity. Good code, like good writing, communicates intent."
  skillsHeading: "Skills & Tools"
  personalHeading: "Personal"
  personal: "Based in Indonesia, working remotely with teams across Southeast Asia. Outside of code, I'm drawn to trains, photography, and the occasional long-form read."
id:
  heading: "Tentang"
  seoDescription: "Dari penyelaras bahasa ke arsitek frontend — kenali perjalanan Yosef Yudha Wijaya membangun aplikasi web berskala."
  intro: "Saya menghabiskan satu dekade sebagai penyelaras bahasa di koran terkemuka Indonesia sebelum menulis baris kode produksi pertama. Naluri editorial itu — presisi, kejelasan, struktur — masih mendorong cara saya membangun perangkat lunak hari ini."
  careerHeading: "Perjalanan Karier"
  career:
    editor:
      title: "Penyelaras Bahasa"
      company: "PT Kompas Media Nusantara"
      description: "Memastikan akurasi dan kejelasan di koran paling dihormati di Indonesia. Mengembangkan apresiasi mendalam terhadap struktur, konsistensi, dan perhatian terhadap detail."
    developer:
      title: "Pengembang Fullstack"
      company: "PT Kompas Media Nusantara"
      description: "Membangun Selaras Bahasa (alat referensi bahasa internal), lalu memimpin pengembangan frontend untuk kompas.id — migrasi dari WordPress ke Nuxt.js dan mereduksi CSS dari 300KB menjadi 43KB."
    web3:
      title: "Pengembang Web3"
      company: "Undercurrent Capital Pte Ltd, Singapura"
      description: "Membangun komponen UI kompleks dan integrasi API untuk aplikasi Web3. Bekerja dengan React, Next.js, dan perangkat blockchain dalam ekosistem yang bergerak cepat."
  philosophyHeading: "Filosofi"
  philosophy: "Presisi editorial dalam kode. Saya memperlakukan setiap komponen seperti paragraf yang tersunting baik — harus jelas, bertujuan, dan bebas dari kompleksitas yang tidak perlu. Kode yang baik, seperti tulisan yang baik, mengomunikasikan maksud."
  skillsHeading: "Keahlian & Alat"
  personalHeading: "Personal"
  personal: "Berbasis di Indonesia, bekerja secara remote dengan tim di seluruh Asia Tenggara. Di luar kode, saya tertarik pada kereta api, fotografi, dan sesekali bacaan panjang."
</i18n>

<template>
  <main class="flex flex-col w-full p-4 relative">
    <div class="min-h-[calc(100dvh-15.063rem)] flex flex-col w-full">
      <div
        class="container flex flex-col mx-auto max-w-xl w-full"
      >
        <HeadingPrimary>
          {{ t("heading") }}
        </HeadingPrimary>

        <!-- Intro -->
        <p class="font-serif mb-10 text-neutral-700 leading-relaxed">
          {{ t("intro") }}
        </p>

        <!-- Career Arc -->
        <h2 class="font-sans font-medium text-lg mb-6">
          {{ t("careerHeading") }}
        </h2>
        <ol class="relative border-l border-neutral-200 mb-10 ml-3">
          <li
            v-for="phase in careerPhases"
            :key="phase.period"
            class="mb-8 ml-6 last:mb-0"
          >
            <span
              class="absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200"
            />
            <span class="text-xs text-neutral-400 font-sans">
              {{ phase.period }}
            </span>
            <h3 class="font-sans font-medium text-base mt-0.5">
              {{ phase.title }}
            </h3>
            <span class="text-sm text-neutral-500 font-sans">
              {{ phase.company }}
            </span>
            <p class="font-serif text-sm text-neutral-700 mt-2 leading-relaxed">
              {{ phase.description }}
            </p>
          </li>
        </ol>

        <!-- Philosophy -->
        <h2 class="font-sans font-medium text-lg mb-3">
          {{ t("philosophyHeading") }}
        </h2>
        <p class="font-serif mb-10 text-neutral-700 leading-relaxed">
          {{ t("philosophy") }}
        </p>

        <!-- Skills -->
        <h2 class="font-sans font-medium text-lg mb-4">
          {{ t("skillsHeading") }}
        </h2>
        <ul class="flex flex-wrap gap-2 mb-10">
          <li
            v-for="skill in skills"
            :key="skill"
            class="border border-neutral-200 rounded-sm px-3 py-1 text-sm font-sans text-neutral-600"
          >
            {{ skill }}
          </li>
        </ul>

        <!-- Personal -->
        <h2 class="font-sans font-medium text-lg mb-3">
          {{ t("personalHeading") }}
        </h2>
        <p class="font-serif mb-10 text-neutral-700 leading-relaxed">
          {{ t("personal") }}
        </p>

        <!-- CTA -->
        <CtaHire />
      </div>
    </div>
  </main>
</template>
