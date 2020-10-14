<template>
  <div class="relative">
    <div class="bg-red-500 fixed font-serif leading-none px-8 py-2 text-sm text-white bottom-0 right-0">{{ message }}</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AppOfflineMessage',
  computed: {
    ...mapState({
      lang: state => state.locale.lang
    }),
    message() {
      return this.lang === 'en' ? 'You are offline' : 'Anda di luar jaringan'
    }
  }
}
</script>
