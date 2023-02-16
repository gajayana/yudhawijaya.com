<script setup lang="ts">
defineI18nRoute({
  paths: {
    en: '/works', // -> accessible at /about-us (no prefix since it's the default locale)
    id: '/karya' // -> accessible at /fr/a-propos
  }
})
</script>

<template>
  <div>karya</div>
</template>