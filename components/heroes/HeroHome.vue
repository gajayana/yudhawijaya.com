<template>
  <div
    class="bg-indigo-600 flex items-center relative"
    :style="{
      height: 'calc(100vh - 64px)'
    }"
  >
    <div class="container max-w-lg mx-auto">
      <div class="flex flex-col items-center mx-4 sm:mx-0 text-white">
        <h1 class="font-sans leading-none mb-4 sm:mb-8 text-center text-4xl sm:text-6xl">
          {{ headline }}
        </h1>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="font-serif leading-snug sm:leading-tight mb-4 sm:mb-8 text-center text-md sm:text-2xl" v-html="$md.render(teaser)" />
        <div class="font-sans flex">
          <nuxt-link class="border border-white px-8 py-2 mr-4 rounded-sm" :to="buttonWork.to">
            {{ buttonWork.label }}
          </nuxt-link>
          <nuxt-link class="bg-white text-indigo-600 px-8 py-2 rounded-sm" :to="buttonContact.to">
            {{ buttonContact.label }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <doodle-christmas class="absolute bottom-0 right-0" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'HeroHome',
  props: {
    contents: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapState({
      cv: state => state.storyblok.cv,
      lang: state => state.locale.lang
    }),
    buttonContact () {
      return {
        label: this.lang !== 'id' ? 'Contact' : 'Kontak Saya',
        to: this.lang !== 'id' ? `/kontak?hl=${this.lang}` : '/kontak'
      }
    },
    buttonWork () {
      return {
        label: this.lang !== 'id' ? 'Works' : 'Karya',
        to: this.lang !== 'id' ? `/karya?hl=${this.lang}` : '/karya'
      }
    },
    headline () {
      return this.contents.headline || ''
    },
    teaser () {
      return this.contents.teaser || ''
    }
  }
}
</script>
