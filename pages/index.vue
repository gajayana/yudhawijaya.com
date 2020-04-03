<template>
  <div v-if="teaser" class="bg-blue-100">
    <div class="container flex flex-col items-center mx-auto px-4 py-32">
      <h1 class="font-bold font-sans leading-tight mb-4 text-center text-gray-600 text-4xl sm:text-6xl">{{ teaser.headline }}</h1>
      <span class="mb-2 text-center text-base sm:text-2xl text-gray-600">{{ teaser.occupation }}</span>
      <ul class="flex -mx-4">
        <li v-for="(item, key) in socialAccounts" :key="`social-${key}`" class="px-4">
          <a :href="item.link" :title="item.link" class="text-gray-500 hover:text-gray-600 text-3xl sm:text-2xl" target="_blank">
            <font-awesome-icon :icon="item.icon" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect, error}) {
    if(!store.state.home.raw) store.dispatch('home/fetch', { app })
  },
  head() {
    return {
      title: this.metas.title,
      meta: [
        { hid: 'description', name: 'description', content: this.metas.description },
        { hid: 'og:description', name: 'og:description', property: 'og:description', content: this.metas.og_description },
        { hid: 'og:image', name: 'og:image', property: 'og:image', content: `https:${this.metas.og_image}` },
        { hid: 'og:title', name: 'og:title', property: 'og:title', content: this.metas.og_title },
        { hid: 'og:url', name: 'og:url', property: 'og:url', content: 'https://yudhawijaya.com/' },
        { hid: 'twitter:card', name: 'twitter:card', property: 'twitter:card', content: 'summary' },
        { hid: 'twitter:creator', name: 'twitter:creator', property: 'twitter:creator', content: '@tuan_yudha' },
        { hid: 'twitter:site', name: 'twitter:site', property: 'twitter:site', content: '@tuan_yudha' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      metas: 'home/metas',
      teaser: 'home/teaser',
    }),
    ...mapState({
      error: state => state.home.error,
    }),
    socialAccounts() {
      const accounts = this.teaser.social_accounts.split('||')

      return accounts.map((ob) => {
        let item = ob.split('|')
        return {
          icon: item[1].split(','),
          link : item[0],
        }
      })

    }
  }
}
</script>
