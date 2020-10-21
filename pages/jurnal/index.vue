<template>
  <div class="container mx-auto pb-8 pt-16">
    <app-sheet-section class="mx-4 lg:mx-0 my-8">
      {{ sectionTitle }}
    </app-sheet-section>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 lg:mx-0">
      <div v-for="story in stories" :key="story.uuid" class="flex">
        <app-card-story
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
import consola from 'consola'
import { mapState } from 'vuex'
import AppCardStory from '~/components/cards/Story'
import AppSheetSection from '~/components/sheets/Section'
export default {
  name: 'Journal',
  watchQuery: ['hl'],
  components: {
    AppCardStory,
    AppSheetSection
  },
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error, $axios }) {
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
          title: `${hl !== 'id' ? 'Journal' : 'Jurnal'} – yudhawijaya.com`
        },
        stories: Object.freeze(
          stories.map((ob) => {
            consola.log(ob)
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
