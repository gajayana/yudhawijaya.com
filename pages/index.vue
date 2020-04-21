<template>
  <div>
    <home-hero :teaser="teaser" />
    <home-posts />
  </div>
</template>

<script>
import HomeHero from '~/components/home/Hero.vue'
import HomePosts from '~/components/home/Posts.vue'

export default {
  name: 'Home',
  watchQuery: ['hl'],
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
    try {
      const { hl } = query
      const config = { cv: store.state.storyblok.cv, version: 'published' }

      store.commit('locale/setLang', hl)
      const home = await app.$storyapi.get(`cdn/stories/${ hl ? hl + '/' : '' }home`, config)

      return {
        metas: Object.freeze( home.data.story.content.body.find( ob => ob.component === 'meta').page_metas ),
        teaser: Object.freeze( home.data.story.content.body.find( ob => ob.component === 'teaser') ),
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
