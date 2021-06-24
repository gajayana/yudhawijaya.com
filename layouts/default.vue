<template>
  <div :class="$style.container">
    <main :class="$style.main">
      <Nuxt />
    </main>
  </div>
</template>

<style module lang="postcss">
  .container {
    @apply min-h-full relative w-full;
  }

  .main {
    @apply flex items-center justify-center min-h-screen pb-17 pt-10;
  }
</style>
