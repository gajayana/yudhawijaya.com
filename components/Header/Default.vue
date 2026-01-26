<script setup lang="ts">
const localePath = useLocalePath();
</script>

<template>
  <header
    className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50"
  >
    <div class="flex items-center justify-between mx-auto px-4 py-2 w-full">
      <div class="flex items-center gap-4">
        <!-- start: picture of me -->
        <div class="flex rounded-full overflow-hidden relative z-[100]">
          <nuxt-link :to="localePath('/')">
            <NuxtImg
              alt="Yosef Yudha Wijaya"
              class="h-9 w-9 md:h-12 md:w-12"
              format="webp"
              :height="48"
              loading="lazy"
              provider="storyblok"
              quality="10"
              :src="IMAGE_OF_ME"
              :width="48"
            />
          </nuxt-link>
        </div>
        <!-- end: picture of me -->

        <!-- start: desktop menu -->
        <div class="hidden md:flex">
          <NavigationMenuMain />
        </div>
        <!-- end: desktop menu -->
      </div>

      <!-- start: mobile menu -->
      <NavigationMobile />
      <!-- end: mobile menu -->

      <div class="hidden md:flex">
        <ButtonLanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<style></style>
