<template>
  <div>
    <div class="flex items-center justify-between px-4 py-2">
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
        'flex',
        'items-center',
        'justify-between',
        'left-0',
        'px-4',
        'py-2',
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
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppHeader',
  data:() => ({
    is_shown: false,
    menus: '',
    scroll_pos: 0,
    profile: 'https://en.gravatar.com/userimage/60901674/30e655e5ced31e90f24172b0ac67a311.jpeg'
  }),
  async fetch() {
    const results = await this.$storyapi.get('cdn/stories/essentials/menus')
    this.menus = results.data.story.content.main.split('||').map( (ob) => {
      const item = ob.split('|')
      return {
        name: item[0],
        to: item[1],
      }
    })
  },
  computed: {
    ...mapGetters({
      postTitle: 'journal/title',
    }),
    title() {
      const locale = this.$route.query.hasOwnProperty('hl') ? this.$route.query.hl : ''
      let title

      switch (this.$route.name) {
        case 'jurnal':
          title = locale === 'en' ? 'Journals' : 'Jurnal'
          break
        case 'jurnal-slug':
          title = this.postTitle
          break;
        default:
          title = 'Yosef Yudha Wijaya'
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
