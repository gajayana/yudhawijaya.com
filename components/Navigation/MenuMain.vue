<script setup lang="ts">
const { t, locale } = useI18n({
  useScope: 'local'
})
const localePath = useLocalePath()
const items = [
  {
    label: 'home',
    path: '/',
    name: 'index'
  },
  {
    label: 'works',
    path: '/karya',
    name: 'karya'
  },
  {
    label: 'journals',
    path: '/jurnal',
    name: 'jurnal'
  },
  {
    label: 'about',
    path: '/tentang',
    name: 'tentang'
  }
]
</script>

<i18n lang="yaml">
en:
  about: 'About'
  home: 'Home'
  journals: 'Journals'
  works: 'Works'
id:
  about: 'Tentang'
  home: 'Muka'
  journals: 'Jurnal'
  works: 'Karya'
</i18n>

<template>
  <div class="flex gap-1 items-center">
    <NuxtLink
      v-for="({label, path, name}) in items"
      :key="`menu-${label}`"
      :to="localePath({name})"
      class="hover:bg-indigo-100 flex font-serif leading-none px-2 py-1 rounded no-underline"
    >
      {{ t(label) }}
    </NuxtLink>

  </div>
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-indigo-200;
}
</style>