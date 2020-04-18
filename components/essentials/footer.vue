<template>
  <div class="bg-gray-900 flex flex-col items-center px-4 pb-8 pt-6">
    <span v-if="text" class="font-mono mb-2 text-white text-center text-xs" v-html="$md.render(text)"></span>
    <ul v-if="footer_social" class="flex -mx-2">
      <li v-for="(item, key) in footer_social" :key="`social-${key}`" class="px-2">
        <a :href="item.link" :title="item.link" class="text-white hover:text-gray-600 text-sm" target="_blank">
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
  data() {
    return {
      footer_social: '',
      footer_text: '',
    }
  },
  async fetch() {
    const promises = [
      this.$axios.$get('/api/essentials/footer-text'),
      this.$axios.$get('/api/essentials/footer-text/en'),
      this.$axios.$get('/api/essentials/social-accounts')
    ]

    const [text_id, text_en, social] = await Promise.all(promises)
    this.footer_social = Object.freeze(social)
    this.footer_text = {
      en:  Object.freeze(text_en),
      id:  Object.freeze(text_id),
    }
  },
  // fetchOnServer: true,
  computed: {
    ...mapState({
      lang: state => state.locale.lang
    }),
    text() {
      return this.lang === 'en' ? this.footer_text.en : this.footer_text.id
    }
  },
}
</script>
