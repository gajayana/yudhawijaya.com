<script setup lang="ts">
const { t } = useI18n({
  useScope: "local",
});
const localePath = useLocalePath();
const emit = defineEmits(["menuClicked"]);
const items = [
  {
    label: "home",
    path: "/",
    name: "index",
  },
  {
    label: "works",
    path: "/karya",
    name: "karya",
  },
  {
    label: "journals",
    path: "/jurnal",
    name: "jurnal",
  },
  {
    label: "about",
    path: "/tentang",
    name: "tentang",
  },
  {
    label: "contact",
    path: "/kontak",
    name: "kontak",
  },
];
</script>

<i18n lang="yaml">
en:
  about: "About"
  contact: "Contact"
  home: "Home"
  journals: "Journals"
  works: "Works"
id:
  about: "Tentang"
  contact: "Kontak"
  home: "Muka"
  journals: "Jurnal"
  works: "Karya"
</i18n>

<template>
  <!-- start: small screen menu -->
  <div class="flex md:hidden flex-col gap-5 p-12">
    <NuxtLink
      v-for="{ label, path } in items"
      :key="`menu-small-screen-${label}`"
      :to="localePath({ path })"
      class="flex font-serif leading-none text-sm no-underline"
      @click="emit('menuClicked')"
    >
      {{ t(label) }}
    </NuxtLink>
  </div>
  <!-- end: small screen menu -->

  <!-- start: large screen menu -->
  <div class="hidden md:flex flex-row gap-1 items-center">
    <NuxtLink
      v-for="{ label, path } in items"
      :key="`menu-large-screen-${label}`"
      :to="localePath({ path })"
      class="flex font-serif leading-none px-4 py-2 no-underline hover:underline underline-offset-2 transition-all duration-300"
      @click="emit('menuClicked')"
    >
      {{ t(label) }}
    </NuxtLink>
  </div>
  <!-- end: large screen menu -->
</template>

<style scoped>
@reference "tailwindcss/theme";
.router-link-active {
  @apply !underline;
  @apply md:font-medium md:no-underline;
}
</style>
