<template>
  <div>
    <home-hero />
    <home-posts />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import HomeHero from '~/components/home/Hero.vue'
import HomePosts from '~/components/home/Posts.vue'

export default {
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect, error}) {
    try {
      const promises = [
        app.$storyapi.get('cdn/stories/home', { version: 'published' }),
        app.$storyapi.get(
          'cdn/stories',
          {
            cv: Date.now(),
            per_page: 6,
            sort_by: 'first_published_at:desc',
            starts_with: 'posts/',
            version: 'published'
          }
        ),
      ]
      const [ home, stories ] = await Promise.all(promises)
      store.commit('home/setRaw', home.data)
      store.commit('home/setRawPosts', stories.data)
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
        { hid: 'twitter:card', name: 'twitter:card', property: 'twitter:card', content: 'summary' },
        { hid: 'twitter:creator', name: 'twitter:creator', property: 'twitter:creator', content: '@tuan_yudha' },
        { hid: 'twitter:site', name: 'twitter:site', property: 'twitter:site', content: '@tuan_yudha' },
      ],
    }
  },
  components: {
    HomeHero,
    HomePosts,
  },
  computed: {
    ...mapGetters({
      metas: 'home/metas',
    }),
    ...mapState({
      error: state => state.home.error,
    }),

  }
}
</script>
