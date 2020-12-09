<template>
  <div class="w-full relative">
    <lazy-header-default />
    <nuxt />
    <lazy-footer-default />
    <label-offline-message v-if="$nuxt.isOffline" />
  </div>
</template>
<script>
// import consola from 'consola'
export default {
  mounted () {
    this.$nextTick(async () => {
      const workbox = await window.$workbox
      if (workbox) {
        workbox.addEventListener('installed', (event) => {
          // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
          if (event.isUpdate) {
            // whatever logic you want to use to notify the user that they need to refresh the page.
            window.location.reload(true)
          }
        })
      }
    })
  }
}
</script>
