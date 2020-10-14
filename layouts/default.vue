<template>
  <div class="w-full">
    <app-header />
    <nuxt />
    <app-footer />
    <app-offline-message v-if="$nuxt.isOffline" />
  </div>
</template>
<script>
import AppFooter from '~/components/essentials/footer'
import AppHeader from '~/components/essentials/header'
import AppOfflineMessage from '~/components/essentials/offlineMessage'
export default {
  components: {
    AppHeader,
    AppFooter,
    AppOfflineMessage,
  }
}
</script>
