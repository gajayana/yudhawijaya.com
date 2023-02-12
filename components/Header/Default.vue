<script setup lang="ts">
  const localePath = useLocalePath()
  const switchLocalePath = useSwitchLocalePath()

  const imageOfMe = storyblokImage({
    height: 48,
    url: IMAGE_OF_ME,
    width: 48,
  })

  const languages = ['id', 'en']
</script>

<template>
  <header class="absolute flex left-0 top-0 w-full">
    <div class="flex items-center justify-between mx-auto px-4 py-2 w-full">
      <!-- start: picture of me -->
      <div class="flex rounded-full overflow-hidden">
        <nuxt-link :to="localePath('/')">
          <img class="h-12 w-12" :src="imageOfMe" alt="Yosef Yudha Wijaya" />
        </nuxt-link>
      </div>
      <!-- end: picture of me -->

      <div class="flex gap-4">
        <div class="flex gap-1">
          <NuxtLink 
            v-for="language in languages" 
            :key="`switcher-${language}`" 
            :to="switchLocalePath(language)"
            class="border border-gray-300 border-solid no-underline outline-none focus:outline-none px-2 py-1 rounded text-center"
          >
            {{ language.toUpperCase() }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>