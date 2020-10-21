<template>
  <div>
    <home-hero :contents="hero" />
    <client-only>
      <home-posts />
    </client-only>
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
              body = {},
              meta_description: description = '',
              meta_keywords: keywords = '',
              meta_title: title = '',
              og_image: {
                filename: image = ''
              }
            }
          }
        }
      } = await app.$storyapi.get(`cdn/stories/${hl ? hl + '/' : ''}home`, config) || {}

      if (!body) { return }
      const {
        headline = '',
        teaser = ''
      } = body.find(ob => ob.component === 'hero') || {}

      return {
        hero: Object.freeze({
          headline,
          teaser
        }),
        metas: Object.freeze({
          description,
          image,
          keywords,
          title
        })
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
      image = '',
      keywords = '',
      title = ''
    } = this.metas || {}

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'keywords', name: 'keywords', content: keywords },
        { hid: 'og:description', property: 'og:description', content: description },
        // eslint-disable-next-line camelcase
        { hid: 'og:image', property: 'og:image', content: `https:${image}` },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:url', property: 'og:url', content: 'https://yudhawijaya.com/' }
      ]
    }
  }
}
</script>
