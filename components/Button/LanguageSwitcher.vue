<script setup language="ts">
const { locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

</script>

<template>
  <ClientOnly>
    <div class="backdrop-blur-sm bg-[#f4f4f5]/50 flex overflow-hidden p-1 relative rounded-full">
      <NuxtLink
        v-for="language in locales"
        :key="`switcher-${language.code}`"
        :to="switchLocalePath(language.code)"
        class="flex font-medium h-8 items-center justify-center no-underline outline-none active:outline-none focus:outline-none relative rounded-full text-sm text-black w-8"
      >
        {{ language.code.toUpperCase() }}
      </NuxtLink>
    </div>
  </ClientOnly>
</template>

<style lang="postcss" scoped>
  .router-link-active {
    @apply bg-white text-black shadow;
  }
</style>
