<template>
  <div class="w-full">
    <app-header />
    <nuxt />
    <app-footer />
  </div>
</template>
<script>
import AppFooter from '~/components/essentials/footer'
import AppHeader from '~/components/essentials/header'
export default {
  components: {
    AppHeader,
    AppFooter,
  }
}
</script>
