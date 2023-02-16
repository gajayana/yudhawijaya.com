<script setup lang="ts">
const localePath = useLocalePath()
const items = [
  {
    label: 'header.menu.home',
    path: '/',
    name: 'index'
  },
  {
    label: 'header.menu.works',
    path: '/karya',
    name: 'karya'
  },
  {
    label: 'header.menu.journals',
    path: '/jurnal',
    name: 'jurnal'
  },
  {
    label: 'header.menu.about',
    path: '/tentang',
    name: 'tentang'
  }
]
</script>

<template>
  <div class="flex gap-1 items-center">
    <NuxtLink
      v-for="({label, path, name}) in items"
      :key="`menu-${label}`"
      :to="localePath({name})"
      class="hover:bg-indigo-100 flex font-serif leading-none px-2 py-1 rounded no-underline"
    >
      {{ $t(label) }}
    </NuxtLink>

  </div>
</template>

<style lang="postcss" scoped>
.router-link-active {
  @apply bg-indigo-200;
}
</style>