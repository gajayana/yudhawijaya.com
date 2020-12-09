<template>
  <div class="container mx-auto pb-8">
    <sheet-section class="mx-4 lg:mx-0 my-8">
      {{ sectionTitle }}
    </sheet-section>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 lg:mx-0">
      <div v-for="story in stories" :key="story.uuid" class="flex">
        <card-story
          :excerpt="story.excerpt"
          :featured-image="story.featuredImage"
          :published-at="story.firstPublishedAt"
          path="jurnal"
          :slug="story.slug"
          :title="story.title"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Journal',
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    try {
      const { hl = 'id' } = query || {}

      if (hl) { store.commit('locale/setLang', hl) }

      const {
        data: {
          stories
        }
      } = await app.$storyapi.get(
        'cdn/stories',
        {
          cv: store.state.storyblok.cv,
          per_page: 24,
          sort_by: 'first_published_at:desc',
          starts_with: `${hl !== 'id' ? hl + '/' : ''}posts/`,
          version: 'published'
        }
      ) || {}

      return {
        metas: {
          description: hl !== 'id' ? 'A collection of stories in yudhawijaya.com' : 'Kumpulan kisah di yudhawijaya.com',
          image: require('~/assets/img/me/64x64.png'),
          title: hl !== 'id' ? 'Journal' : 'Jurnal'
        },
        stories: Object.freeze(
          stories.map((ob) => {
            const {
              content: {
                excerpt = '',
                featured_image: {
                  filename: featuredImage = ''
                },
                title = ''
              },
              first_published_at: publishedAt,
              slug = '',
              uuid = ''
            } = ob || {}

            return {
              excerpt,
              featuredImage,
              publishedAt,
              slug,
              title,
              uuid
            }
          })
        )
      }
    } catch (err) {
      error({
        statusCode: err.statusCode,
        message: err.message
      })
    }
  },
  computed: {
    ...mapState({
      lang: state => state.locale.lang
    }),
    sectionTitle () {
      return this.lang !== 'id' ? 'Journal' : 'Jurnal'
    }
  },
  watchQuery: ['hl'],
  // eslint-disable-next-line vue/order-in-components
  head () {
    return {
      title: this.metas.title,
      meta: [
        { hid: 'description', name: 'description', content: this.metas.description },
        { hid: 'og:description', property: 'og:description', content: this.metas.description },
        { hid: 'og:image', property: 'og:image', content: this.metas.image },
        { hid: 'og:title', property: 'og:title', content: this.metas.title },
        { hid: 'og:url', property: 'og:url', content: `https://yudhawijaya.com${this.$route.path}` }
      ]
    }
  }
}
</script>
