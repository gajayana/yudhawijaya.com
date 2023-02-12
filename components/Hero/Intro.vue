<script setup lang="ts">
const { $mdit } = useNuxtApp()
</script>

<template>
  <div>
    <div
      v-html="$mdit.renderInline($t('hero.intro.greeting'))"
    />
    <div
      v-html="$mdit.renderInline($t('hero.intro.resume'))"
    />
  </div>
</template>
