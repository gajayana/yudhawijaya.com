<template>
  <div class="container mx-auto pb-8 pt-16">

    <app-sheet-section class="mx-4 lg:mx-0 my-8">{{ sectionTitle }}</app-sheet-section>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 lg:mx-0">
      <div class="flex" v-for="story in stories" :key="story.uuid">
        <app-card-story :story="story" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import AppSheetSection from '~/components/sheets/Section'
import AppCardStory from '~/components/cards/Story'
export default {
  name: 'Journal',
  watchQuery: ['hl'],
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
    try {
      const { hl = 'id' } = query || {}

      if (hl) store.commit('locale/setLang', hl)

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
          starts_with: `${ hl ? hl + '/' : '' }posts/`,
          version: 'published'
        }
      ) || {}

      return {
        metas : {
          description : hl ? 'A collection of stories in yudhawijaya.com' : 'Kumpulan kisah di yudhawijaya.com',
          image: 'https://a.storyblok.com/f/76789/480x640/7157934e9e/img_20150606_174246.jpg',
          title: `${ hl ? 'Journal' : 'Jurnal' } – yudhawijaya.com`,
        },
        stories: Object.freeze(stories),
        pageTitle: (hl !== 'id' ? 'Journal' : 'Jurnal'),
      }
    } catch(err) {
      error({
        statusCode: err.statusCode,
        message: err.message,
      })
    }
  },
  components: {
    AppCardStory,
    AppSheetSection,
  },
  computed: {
    ...mapState({
      lang: state => state.locale.lang,
    }),
    sectionTitle() {
      return this.lang !== 'id' ? 'Journal' : 'Jurnal'
    }
  },
  head() {
    return {
      title: this.metas.title,
      meta: [
        { hid: 'description', name: 'description', content: this.metas.description },
        { hid: 'og:description', name: 'og:description', property: 'og:description', content: this.metas.description },
        { hid: 'og:image', name: 'og:image', property: 'og:image', content: this.metas.image },
        { hid: 'og:title', name: 'og:title', property: 'og:title', content: this.metas.title },
        { hid: 'og:url', name: 'og:url', property: 'og:url', content: `https://yudhawijaya.com${ this.$route.path }` },
      ],
    }
  },
}
</script>
