<template>
  <div class="absolute bg-indigo-600 w-full z-10">
    <div class="container flex items-center justify-between mx-auto px-4 xl:px-0 py-2">
      <div class="flex rounded-full overflow-hidden">
        <nuxt-link :to="`${ lang !== 'id' ? '/?hl=' + lang : '/'}`">
          <img class="h-8 w-8" src="~/assets/img/me/64x64.png" alt="Yosef Yudha Wijaya">
        </nuxt-link>
      </div>
      <div class="flex">
        <ul v-if="menus" class="flex items-center mr-6 text-sm">
          <li
            v-for="(item, key) in menus"
            :key="`menu-main-${key}`"
            class="mx-4"
          >
            <nuxt-link class="text-white" :to="link(item.to)">
              {{ item.name }}
            </nuxt-link>
          </li>
        </ul>

        <app-header-language-switcher />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import AppHeaderLanguageSwitcher from '~/components/essentials/header-language-switcher'
export default {
  name: 'AppHeader',
  components: {
    AppHeaderLanguageSwitcher
  },
  async fetch () {
    // data.story.content.main
    const {
      data: {
        story: {
          content: {
            main = ''
          }
        }
      }
    } = await this.$storyapi.get(
      `cdn/stories/${this.lang ? this.lang + '/' : ''}essentials/menus`,
      { cv: this.cv, version: 'published' }
    ) || {}

    if (main) {
      this.menus = Object.freeze(
        main
          .split('||')
          .map((ob) => {
            const a = ob.split('|')
            return {
              name: a[0],
              to: a[1]
            }
          })
      )
    }
  },
  data: () => ({
    menus: ''
  }),
  computed: {
    ...mapState({
      cv: state => state.storyblok.cv,
      lang: state => state.locale.lang
    })
  },
  watch: {
    '$route.query': '$fetch'
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
  .nuxt-link-exact-active {
    @apply font-bold;
    @apply underline;
  }
</style>
