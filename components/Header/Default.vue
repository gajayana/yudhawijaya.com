<script setup>
  const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <div>
    <NuxtLink :to="switchLocalePath('en')">English</NuxtLink>
    <NuxtLink :to="switchLocalePath('id')">Français</NuxtLink>
  </div>
</template>