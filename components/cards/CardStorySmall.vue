<template>
  <nuxt-link class="flex rounded-sm shadow-md w-full" :to="permalink">
    <div class="flex flex-shrink-0 w-20">
      <img class="w-full" :src="image">
    </div>
    <div class="flex flex-col justify-center overflow-hidden p-2">
      <h3 class="text-lg truncate">{{ title }}</h3>
      <p class="truncate">
        {{ excerpt }}
      </p>
    </div>
  </nuxt-link>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'CardStorySmall',
  props: {
    excerpt: {
      type: String,
      default: ''
    },
    featuredImage: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      lang: state => state.locale.lang
    }),
    image () {
      return this.featuredImage.replace('a.storyblok.com', 'img2.storyblok.com/150x150/smart/filters:format(webp)')
    },
    permalink () {
      const locale = this.lang !== 'id' ? `?hl=${this.lang}` : ''
      return `/${this.path}/${this.slug + locale}`
    }
  }
}
</script>
