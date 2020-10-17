<template>
  <div
    class="bg-indigo-600 flex items-center h-screen relative"
  >
    <div class="container max-w-lg mx-auto">
      <div class="flex flex-col font-sans items-center mx-4 sm:mx-0 text-white">
        <h1 class="leading-none mb-4 text-center text-5xl sm:text-6xl">{{ headline }}</h1>
        <div class="leading-tight mb-4 text-center text-xl sm:text-2xl" v-html="$md.render(teaser)"></div>
        <div class="flex">
          <nuxt-link class="border border-white px-8 py-2 mr-4 rounded-sm" to="/proyek">Karya</nuxt-link>
          <nuxt-link class="bg-white text-indigo-600 px-8 py-2 rounded-sm" to="/kontak">Kontak Saya</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeHero',
  props: {
    contents: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapState({
      cv: state => state.storyblok.cv,
      lang: state => state.locale.lang,
    }),
    headline() {
      return this.contents.headline || ''
    },
    teaser() {
      return this.contents.teaser || ''
    }
  },
}
</script>
