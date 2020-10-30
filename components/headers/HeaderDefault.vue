<template>
  <div class="bg-indigo-600 relative w-full z-10">
    <div class="flex items-center justify-between px-4 py-2">
      <!-- start: logo -->
      <div class="flex rounded-full overflow-hidden">
        <nuxt-link :to="`${ lang !== 'id' ? '/?hl=' + lang : '/'}`">
          <img class="h-12 w-12" :src="logo" alt="Yosef Yudha Wijaya">
        </nuxt-link>
      </div>
      <!-- end: logo -->
      <!-- start: mobile bar button -->
      <div class="flex md:hidden">
        <button class="outline-none focus:outline-none w-12 text-white text-2xl" @click.prevent="showMenu = !showMenu">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
      <!-- end: mobile bar button -->
      <!-- start: desktop menu & tools -->
      <div class="hidden md:flex">
        <header-menu dark :menu-items="menus" class="mr-16" />
        <header-language-switcher dark />
      </div>
      <!-- end: desktop menu & tools -->
    </div>
    <!-- start: mobile menu -->
    <div v-if="showMenu" class="fixed h-screen left-0 p-2 top-0 w-full">
      <div class="bg-white flex flex-col h-full shadow-xl w-full">
        <div class="flex justify-end">
          <button class="p-4 text-2xl leading-none" @click.prevent="showMenu = !showMenu">
            <font-awesome-icon :icon="['fas', 'times']" />
          </button>
        </div>
        <div>
          <header-menu :menu-items="menus" class="mb-4" />
          <header-language-switcher class="px-4" />
        </div>
      </div>
    </div>
    <!-- end: mobile menu -->
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'HeaderDefault',
  async fetch () {
    const {
      data: {
        story: {
          content
        }
      }
    } = await this.$storyapi.get(
      `cdn/stories/${this.lang ? this.lang + '/' : ''}core`,
      {
        cv: this.cv,
        version: 'published'
      }
    ) || {}

    // store mutations
    const {
      footer_text: footerText = '',
      social_accounts: socialAccounts = ''
    } = content || {}

    if (socialAccounts) {
      this.setSocial(
        socialAccounts.split('||')
          .map((ob) => {
            const [icon, link] = ob.split('|')
            return {
              icon,
              link
            }
          })
      )
    }

    if (footerText) {
      this.setFooterText(footerText)
    }

    // assign values
    this.content = content
  },
  data: () => ({
    content: '',
    showMenu: false
  }),
  computed: {
    ...mapState({
      cv: state => state.storyblok.cv,
      lang: state => state.locale.lang
    }),
    logo () {
      if (!this.content) { return }
      return this.content.logo.filename.replace('a.storyblok.com', 'img2.storyblok.com/96x96/smart/filters:format(webp)')
    },
    menus () {
      if (!this.content) { return }
      return this.content
        .menu_main
        .split('||')
        .map((ob) => {
          const [name, to] = ob.split('|')
          return {
            name,
            to
          }
        })
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    ...mapMutations({
      setFooterText: 'core/setFooterText',
      setSocial: 'core/setSocial'
    }),
    toggleMenu () {
      this.setShowMobileMenu(!this.showMobileMenu)
    },
    link (to) {
      const locale = this.lang !== 'id' ? '?hl=' + this.lang : ''
      return to + locale
    }
  }
}
</script>
