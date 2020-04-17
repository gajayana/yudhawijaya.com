<template>
  <div>
    <home-hero :teaser='teaser' />
    <home-posts />
  </div>
</template>

<script>
import HomeHero from '~/components/home/Hero.vue'
import HomePosts from '~/components/home/Posts.vue'

export default {
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
    try {
      const lang = query.hasOwnProperty('hl') ? query.hl : ''
      const home = await $axios.$get(`/api/home/page${ lang ? '/' + lang : ''}`)

      store.commit('locale/setLang', lang)

      return {
        teaser: Object.freeze(home.find( ob => ob.component === 'teaser')),
        metas: Object.freeze(home.find( ob => ob.component === 'meta').page_metas),
      }
    } catch (err) {
      error({
        statusCode: err.statusCode,
        message: err.message,
      })
    }

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
      ],
    }
  },
  components: {
    HomeHero,
    HomePosts,
  },
}
</script>
