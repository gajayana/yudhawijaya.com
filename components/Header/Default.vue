<script setup lang="ts">
const localePath = useLocalePath()

const imageOfMe = storyblokImage({
  height: 48,
  url: IMAGE_OF_ME,
  width: 48
})

</script>

<template>
  <header class="flex relative w-full">
    <div class="flex items-center justify-between mx-auto px-4 py-2 w-full">
      <!-- start: picture of me -->
      <div class="flex rounded-full overflow-hidden relative z-[100]">
        <nuxt-link :to="localePath('/')">
          <img class="h-9 w-9 md:h-12 md:w-12" :src="imageOfMe" alt="Yosef Yudha Wijaya">
        </nuxt-link>
      </div>
      <!-- end: picture of me -->

      <!-- start: mobile menu -->
      <NavigationMobile />
      <!-- end: mobile menu -->

      <!-- start: desktop menu -->
      <div class="hidden md:flex">
        <NavigationMenuMain />
      </div>
      <div class="hidden md:flex">
        <ButtonLanguageSwitcher />
      </div>
      <!-- end: desktop menu -->
    </div>
  </header>
</template>

<style>

</style>
