<template>
  <div class="bg-gray-900 flex flex-col items-center px-4 pb-8 pt-6">
    <span v-if="text" class="font-mono mb-2 text-white text-center text-xs" v-html="$md.render(text)"></span>
    <ul v-if="social" class="flex -mx-2">
      <li v-for="(item, key) in social" :key="`social-${key}`" class="px-2">
        <a :href="item.link" :title="item.link" class="text-white hover:text-gray-600 text-sm" rel="noreferrer" target="_blank">
          <font-awesome-icon :icon="item.icon" />
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'AppFooter',
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    const config = { cv: this.cv, version: 'published' }
    // .data.story.content.name
    const {
      data: {
        story: {
          content: {
            name: social
          }
        }
      }
    } = await this.$storyapi.get('cdn/stories/essentials/social-accounts', config)

    // data.story.content.main
    const {
      data: {
        story: {
          content: {
            main: text
          }
        }
      }
    } = await this.$storyapi.get(`cdn/stories/${this.lang ? this.lang + '/' : ''}essentials/footer-text`, config)

    this.social = Object.freeze(
      social
        .split('||')
        .map(ob => {
          const a = ob.split('|')
          return {
            icon: a[1].split(','),
            link: a[0]
          }
        })
    )

    this.text = Object.freeze(text)

  },
  data: () => ({
    social: '',
    text: '',
  }),
  computed: {
    ...mapState({
      cv: state => state.storyblok.cv,
      lang: state => state.locale.lang
    }),
  },
}
</script>
