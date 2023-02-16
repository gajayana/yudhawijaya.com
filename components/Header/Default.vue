<script setup lang="ts">
  const localePath = useLocalePath()

  const imageOfMe = storyblokImage({
    height: 48,
    url: IMAGE_OF_ME,
    width: 48,
  })

</script>

<template>
  <header class="flex w-full">
    <div class="flex items-center justify-between mx-auto px-4 py-2 w-full">
      <!-- start: picture of me -->
      <div class="flex rounded-full overflow-hidden">
        <nuxt-link :to="localePath('/')">
          <img class="h-12 w-12" :src="imageOfMe" alt="Yosef Yudha Wijaya" />
        </nuxt-link>
      </div>
      <!-- end: picture of me -->

      <div class="flex gap-4">
        <NavigationMenuMain />
        <ButtonLanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<style>

</style>