<template>
  <ul class="flex items-center w-full text-base">
    <li v-for="item in languages" :key="item.key">
      <nuxt-link
        :class="[
          'flex',
          'leading-none',
          'p-2',
          'rounded-sm',
          { 'text-white': dark },
          { 'text-black': !dark },
          'uppercase'
        ]"
        :to="`${ item.key !== 'id' ? '?hl=' + item.key : '' }`"
      >
        <span class="hidden md:flex">{{ item.key }}</span>
        <span class="flex md:hidden">{{ item.label }}</span>
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AppHeaderLanguageSwitcher',
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    languages: [
      {
        key: 'id',
        label: 'Indonesia'
      },
      {
        key: 'en',
        label: 'English'
      }
    ]
  }),
  computed: {
    ...mapState({
      lang: state => state.locale.lang
    })
  }
}
</script>
<style scoped>
  .nuxt-link-exact-active {
    @apply font-bold;
    background-color: rgba(0,0,0,0.1);
  }
</style>
