<template>
  <nuxt-link :to="permalink" class="bg-white flex flex-col h-full overflow-hidden rounded shadow">
    <div class="bg-center bg-cover bg-no-repeat flex" :style="{ backgroundImage: `url(${image})`, paddingBottom: '56.25%' }"></div>
    <div class="flex flex-col h-full justify-between p-4">
      <div class="flex flex-col mb-3">
        <h3 class="font-bold font-sans leading-tight mb-2 text-xl">{{ story.content.title }}</h3>
        <p class="text-gray-800">{{ story.content.excerpt }}</p>
      </div>
      <div class="flex text-gray-700 text-sm">
        <time :datetime="story.first_published_at">{{ story.first_published_at | dateTimeFormatter(lang) }}</time>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'JournalCard',
  props: {
    story: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapState({
      lang: state => state.locale.lang
    }),
    image() {
      return this.story.content.featured_image.replace('a.storyblok.com', 'img2.storyblok.com/400x0')
    },
    permalink() {
      const locale = this.lang ? `?hl=${this.lang}` : ''
      return `/jurnal/${this.story.slug + locale}`
    }
  }
}
</script>
