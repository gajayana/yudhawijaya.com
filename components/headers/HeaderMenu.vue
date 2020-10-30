<template>
  <ul class="block md:flex md:flex-row md:items-center text-base">
    <li
      v-for="(item, key) in menuItems"
      :key="`menu-main-${key}`"
    >
      <nuxt-link
        :class="[
          'block',
          'border-b',
          {'border-t' : key === 0},
          'md:border-0',
          'leading-none',
          'px-4',
          'py-3',
          'w-full',
          { 'text-white' : dark },
          { 'text-black' : !dark }
        ]"
        :to="link(item.to)"
        :exact="item.to === '/'"
      >
        {{ item.name }}
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'HeaderMenu',
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    menuItems: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    ...mapState({
      lang: state => state.locale.lang
    })
  },
  methods: {
    link (to) {
      const locale = this.lang !== 'id' ? '?hl=' + this.lang : ''
      return to + locale
    }
  }
}
</script>
<style scoped>
  .nuxt-link-active {
    @apply font-bold;
    background-color: rgba(0,0,0,0.05);
  }
</style>
