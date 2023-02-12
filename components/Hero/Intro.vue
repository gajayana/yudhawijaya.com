<script setup lang="ts">
const { $mdit } = useNuxtApp()
</script>

<template>
  <div class="flex flex-col bg-indigo-600 items-center h-screen justify-center w-full">
    <div class="max-w-lg mx-auto">
      <h1 class="font-sans leading-none mb-4 sm:mb-8 text-center text-4xl sm:text-6xl text-white"
        v-html="$mdit.renderInline($t('hero.intro.greeting'))" />
      <p class="font-serif leading-snug sm:leading-tight mb-4 sm:mb-8 text-center text-md sm:text-2xl text-white"
        v-html="$mdit.renderInline($t('hero.intro.resume'))" />
      <div class="flex items-center justify-center">
        <button class="border border-white flex px-8 py-2 mr-4 rounded-sm text-white uppercase">
          {{ $t('hero.intro.button.work') }}
        </button>
      </div>
    </div>
  </div>
</template>
