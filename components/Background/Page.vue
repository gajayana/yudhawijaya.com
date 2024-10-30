<script lang="ts" setup>
const image =
  "https://a.storyblok.com/f/76789/4000x2250/9f82a35748/img_20240401_135311.jpeg";
</script>

<template>
  <div class="fixed bg-black h-screen left-0 top-0 w-full z-0">
    <NuxtImg
      :src="image"
      :height="1680"
      :width="Math.floor((4000 / 2250) * 1680)"
      :modifiers="{ filters: { blur: 90 }, smart: true }"
      class="flex h-full object-cover w-full"
      alt="background image"
      loading="lazy"
      provider="storyblok"
      format="webp"
      quality="10"
    />
  </div>
</template>
