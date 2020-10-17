<template>
  <ul class="flex items-center -mx-2 text-sm">
    <li v-for="(item, id) in languages" :key="item.key">
      <nuxt-link
        :class="[
          'leading-none',
          'px-2',
          'text-white',
          'uppercase',
          { 'border-r border-white' : id === 0}
        ]"
        :to="`${ item.key !== 'id' ? '?hl=' + item.key : '' }`"
      >
        {{ item.key }}
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AppHeaderLanguageSwitcher',
  data:() => ({
    languages: [
      {
        key: 'id',
        label: 'Indonesia',
      },
      {
        key: 'en',
        label: 'English'
      }
    ],
  }),
  computed: {
    ...mapState({
      lang: state => state.locale.lang,
    })
  }
}
</script>
<style scoped>
  .nuxt-link-exact-active {
    @apply font-bold;
    @apply underline;
  }
</style>
