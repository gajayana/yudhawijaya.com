<template>
  <div class="w-full relative">
    <lazy-header-default />
    <nuxt />
    <lazy-footer-default />
    <label-offline-message v-if="$nuxt.isOffline" />
  </div>
</template>
