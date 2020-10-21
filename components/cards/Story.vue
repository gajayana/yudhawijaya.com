<template>
  <nuxt-link :to="permalink" class="bg-white flex flex-col h-full overflow-hidden rounded shadow w-full">
    <div class="bg-center bg-cover bg-no-repeat flex" :style="{ backgroundImage: `url('${image}')`, paddingBottom: '56.25%' }" />
    <div class="flex flex-col h-full justify-between p-4">
      <div class="flex flex-col mb-3">
        <h3 class="font-bold font-sans leading-tight mb-2 text-xl">
          {{ title }}
        </h3>
        <p class="text-gray-800">
          {{ excerpt }}
        </p>
      </div>
      <div v-if="publishedAt" class="flex text-gray-700 text-sm">
        <time :datetime="publishedAt">{{ publishedAt | dateTimeFormatter(lang) }}</time>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'AppCardStory',
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
    publishedAt: {
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
      return this.featuredImage.replace('a.storyblok.com', 'img2.storyblok.com/420x0/filters:format(webp)')
    },
    permalink () {
      const locale = this.lang !== 'id' ? `?hl=${this.lang}` : ''
      return `/${this.path}/${this.slug + locale}`
    }
  }
}
</script>
