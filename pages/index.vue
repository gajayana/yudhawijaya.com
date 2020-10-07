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
      // data.story.content.body
      const {
        data: {
          story: {
            content: {
              body = {}
            }
          }
        }
      } = await app.$storyapi.get(`cdn/stories/${ hl ? hl + '/' : '' }home`, config)

      if (!body) return

      return {
        metas: Object.freeze( body.find( ob => ob.component === 'meta').page_metas ),
        teaser: Object.freeze( body.find( ob => ob.component === 'teaser') ),
      }

    } catch (err) {
      error({
        statusCode: err.statusCode,
        message: err.message,
      })
    }

  },
  head() {
    if (!this.metas) return

    const {
      description = '',
      title = '',
      og_description = '',
      og_image = '',
      og_title = '',
    } = this.metas

    return {
      title: title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:description', name: 'og:description', property: 'og:description', content: og_description },
        { hid: 'og:image', name: 'og:image', property: 'og:image', content: `https:${og_image}` },
        { hid: 'og:title', name: 'og:title', property: 'og:title', content: og_title },
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
