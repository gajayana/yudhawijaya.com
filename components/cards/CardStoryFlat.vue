<template>
  <nuxt-link
    class="block relative opacity-75 hover:opacity-100 transition-opacity duration-300 ease-in w-full"
    :to="permalink"
  >
    <div
      class="bg-center bg-cover bg-no-repeat"
      :style="{
        backgroundImage: `url('${image}')`,
        paddingBottom: '56.25%'
      }"
    />
    <div
      class="absolute h-full left-0 top-0 w-full z-10"
      :style="{
        backgroundColor: backgroundColour
      }"
    >
      <div class="flex h-full items-center justify-center w-full">
        <h2 class="font-sans leading-tight text-bold text-center text-2xl text-white" :style="{textShadow: '1px 1px 2px rgba(150, 150, 150, 1)'}">
          {{ title }}
        </h2>
      </div>
    </div>
  </nuxt-link>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'CardStoryFlat',
  props: {
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
    backgroundColour () {
      const colours = [
        'rgba(160, 174, 192, 0.7)',
        'rgba(245, 101, 101, 0.7)',
        'rgba(237, 137, 54, 0.7)',
        'rgba(236, 201, 75, 0.7)',
        'rgba(72, 187, 120, 0.7)',
        'rgba(56, 178, 172, 0.7)',
        'rgba(66, 153, 225, 0.7)',
        'rgba(102, 126, 234, 0.7)',
        'rgba(159, 122, 234, 0.7)',
        'rgba(237, 100, 166, 0.7)'
      ]

      const rand = Math.floor((Math.random() * colours.length - 1) + 1)
      return colours[rand]
    },
    image () {
      return this.featuredImage.replace('a.storyblok.com', 'img2.storyblok.com/480x0/filters:format(webp)')
    },
    permalink () {
      const locale = this.lang !== 'id' ? `?hl=${this.lang}` : ''
      return `/${this.path}/${this.slug + locale}`
    }
  }
}
</script>
