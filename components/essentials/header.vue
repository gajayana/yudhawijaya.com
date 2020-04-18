<template>
  <div>
    <div class="container flex items-center justify-between mx-auto px-4 py-2">
      <div class="flex rounded-full overflow-hidden">
        <nuxt-link to="/">
          <img class="h-8 w-8" :src="profile" alt="Yosef Yudha Wijaya" />
        </nuxt-link>
      </div>
      <ul v-if="menus" class="flex text-sm">
        <li
          v-for="(item, key) in menus"
          :class="[
            { 'ml-2' : key > 0 }
          ]"
          :key="`menu-main-${key}`"
        >
          <nuxt-link :to="item.to">{{ item.name }}</nuxt-link>
        </li>
      </ul>
    </div>
    <div
      :class="[
        'bg-gray-100',
        'duration-500',
        'fixed',
        'left-0',
        'shadow',
        'top-0',
        'transition-transform',
        'transform',
        { 'translate-y-0' : is_shown },
        { '-translate-y-12' : !is_shown },
        'w-full',
      ]"
      v-scroll="scrollHandler"
    >
      <div class="container flex items-center justify-between mx-auto px-4 py-2">
        <div class="flex rounded-full overflow-hidden">
          <nuxt-link to="/">
            <img class="h-8 w-8" :src="profile" alt="Yosef Yudha Wijaya" />
          </nuxt-link>
        </div>
        <div class="flex">
          <h3 class="font-sans text-center">{{ title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState} from 'vuex'
export default {
  name: 'AppHeader',
  data:() => ({
    is_shown: false,
    menus: '',
    scroll_pos: 0,
    profile: 'https://en.gravatar.com/userimage/60901674/30e655e5ced31e90f24172b0ac67a311.jpeg'
  }),
  async fetch() {
    const menus = await this.$axios.$get(`/api/essentials/menus${ this.lang ? '/' + this.lang : ''}`)
    this.menus = menus
  },
  computed: {
    ...mapState({
      lang: state => state.locale.lang,
      story: state => state.journal.story,
    }),
    title() {
      let title

      switch (this.$route.name) {
        case 'jurnal':
          title = this.lang === 'en' ? 'Journals' : 'Jurnal'
          break
        case 'jurnal-slug':
          title = this.story.content.title
          break;
        default:
          title = this.lang === 'en' ? 'Home' : 'Muka'
          break;
      }

      return title
    }
  },
  methods: {
    scrollHandler() {
      const pos = window.scrollY
      if ( pos > this.scroll_pos ) {
        if ( pos > 160 ) this.is_shown = true
      } else {
        this.is_shown = false
      }

      this.scroll_pos = pos
    }
  }
}
</script>
