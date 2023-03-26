<script setup language="ts">
const languages = ['id', 'en']
</script>

<template>
  <div class="flex border border-indigo-800 border-solid overflow-hidden rounded">
    <NuxtLink
      v-for="language in languages"
      :key="`switcher-${language}`"
      :to="switchLocalePath(language)"
      class="flex no-underline outline-none focus:outline-none px-2 py-1 text-center text-indigo-800"
    >
      {{ language.toUpperCase() }}
    </NuxtLink>
  </div>
</template>

<style lang="postcss" scoped>
  .router-link-active {
    @apply bg-indigo-800 text-white;
  }
</style>
