<script lang="ts" setup>
const backgroundImage = storyblokImage({
  height: 2560,
  url: 'https://a.storyblok.com/f/76789/4000x2250/9f82a35748/img_20240401_135311.jpeg',
  width: 1440,
  filters: ['blur(90)']
})
</script>

<template>
  <div class="fixed bg-black h-screen left-0 top-0 w-full z-0">
    <NuxtImg :src="backgroundImage" :height="2560" :width="1440" class="flex h-full object-cover w-full" alt="background image" />
  </div>
</template>

<style scoped>

</style>
