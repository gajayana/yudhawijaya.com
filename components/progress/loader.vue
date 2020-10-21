<template>
  <div class="bg-yellow-300 flex leading-none font-bold px-4 py-1">
    {{ label }}
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AppProgressLoader',
  computed: {
    ...mapState({
      lang: state => state.locale.lang
    }),
    label () {
      return this.lang !== 'id' ? 'Loading...' : 'Memuat data...'
    }
  }
}
</script>
