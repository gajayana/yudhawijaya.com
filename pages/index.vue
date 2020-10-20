<template>
  <div>
    <home-hero :contents="hero" />
    <home-posts />
  </div>
</template>

<script>
import HomeHero from '~/components/home/Hero.vue'
import HomePosts from '~/components/home/Posts.vue'

export default {
  name: 'Home',
  watchQuery: ['hl'],
  components: {
    HomeHero,
    HomePosts
  },
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error, $axios }) {
    try {
      const { hl = 'id' } = query
      const config = { cv: store.state.storyblok.cv, version: 'published' }

      if (hl) { store.commit('locale/setLang', hl) }
      // data.story.content.body
      const {
        data: {
          story: {
            content: {
              body = {}
            }
          }
        }
      } = await app.$storyapi.get(`cdn/stories/${hl ? hl + '/' : ''}home`, config)

      if (!body) { return }

      return {
        hero: Object.freeze(body.find(ob => ob.component === 'hero')),
        metas: Object.freeze(body.find(ob => ob.component === 'meta').page_metas)
      }
    } catch (err) {
      error({
        statusCode: err.statusCode,
        message: err.message
      })
    }
  },
  head () {
    if (!this.metas) { return }

    const {
      description = '',
      title = '',
      // eslint-disable-next-line camelcase
      og_description = '',
      // eslint-disable-next-line camelcase
      og_image = '',
      // eslint-disable-next-line camelcase
      og_title = ''
    } = this.metas || {}

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:description', name: 'og:description', property: 'og:description', content: og_description },
        // eslint-disable-next-line camelcase
        { hid: 'og:image', name: 'og:image', property: 'og:image', content: `https:${og_image}` },
        { hid: 'og:title', name: 'og:title', property: 'og:title', content: og_title },
        { hid: 'og:url', name: 'og:url', property: 'og:url', content: 'https://yudhawijaya.com/' }
      ]
    }
  }
}
</script>
