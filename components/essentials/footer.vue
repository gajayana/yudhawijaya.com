<template>
  <div class="bg-gray-900 flex flex-col items-center px-4 pb-8 pt-6">
    <span v-if="text_id" class="font-mono mb-2 text-white text-center text-xs" v-html="$md.render(text_id)"></span>
    <ul v-if="socialAccounts" class="flex -mx-2">
      <li v-for="(item, key) in socialAccounts" :key="`social-${key}`" class="px-2">
        <a :href="item.link" :title="item.link" class="text-white hover:text-gray-600 text-sm" target="_blank">
          <font-awesome-icon :icon="item.icon" />
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'AppFooter',
  async fetch() {
    const config = {
      cv: Date.now(),
      version: 'published',
    }

    const promises = [
      this.$storyapi.get('cdn/stories/essentials/footer-text', config),
      this.$storyapi.get('cdn/stories/en/essentials/footer-text', config),
      this.$storyapi.get('cdn/stories/essentials/social-accounts', config)
    ]

    const [footer_id, footer_en, social] = await Promise.all(promises)
    this.social = Object.freeze(social.data.story.content.name)
    this.text_en = Object.freeze(footer_en.data.story.content.name)
    this.text_id = Object.freeze(footer_id.data.story.content.name)
  },
  data() {
    return {
      social: '',
      text_en: '',
      text_id: ''
    }
  },
  fetchOnServer: true,
  computed: {
    socialAccounts() {
      if (this.social) return this.$socialParser(this.social)
    }
  }
}
</script>
