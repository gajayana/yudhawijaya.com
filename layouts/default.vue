<template>
  <div class="w-full relative">
    <header-default />
    <nuxt />
    <footer-default />
    <label-offline-message v-if="$nuxt.isOffline" />
  </div>
</template>
