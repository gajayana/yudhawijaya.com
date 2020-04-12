<template>
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
        <img class="h-8 w-8" :src="profile" />
      </nuxt-link>
    </div>
    <div class="flex">
      <h3 class="font-sans text-center">{{ title || 'Yosef Yudha Wijaya'}}</h3>
    </div>
    <div class="flex"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppHeader',
  data:() => ({
    is_shown: false,
    scroll_pos: 0,
    profile: 'https://en.gravatar.com/userimage/60901674/30e655e5ced31e90f24172b0ac67a311.jpeg'
  }),
  computed: {
    ...mapGetters({
      title: 'journal/title',
    }),
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
