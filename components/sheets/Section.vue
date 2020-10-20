<template>
  <div class="flex font-bold font-sans items-center leading-none text-indigo-600 text-3xl lg:text-6xl">
    <span class="bg-indigo-600 h-8 lg:h-16 mr-2 lg:mr-4 w-8 lg:w-16" />
    <h1>
      <slot />
    </h1>
  </div>
</template>
<script>
export default {
  name: 'AppSheetSection'
}
</script>
