<template>
  <div class="container mx-auto md:px-4 py-20">
    <h2 class="font-bold font-sans leading-tight mb-4 px-4 md:px-0 text-indigo-600 text-3xl sm:text-4xl">
      <nuxt-link :to="`/jurnal${ lang !== 'id' ? '?hl=' + lang : ''}`">{{ sectionTitle }}</nuxt-link>
    </h2>
    <div v-if="stories" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 sm:mx-0">
      <div class="flex" v-for="story in stories" :key="story.uuid">
        <journal-card :story="story"></journal-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import JournalCard from '~/components/journal/card'
export default {
  name: 'HomePosts',
  watch: {
    '$route.query': '$fetch'
  },
  async fetch() {
    const {
      data: {
        stories = {}
      }
    } = await this.$storyapi.get(
      'cdn/stories',
      {
        cv: this.cv,
        per_page: 6,
        sort_by: 'first_published_at:desc',
        starts_with: `${ this.lang ? this.lang + '/' : '' }posts/`,
        version: 'published'
      }
    )

    this.stories = Object.freeze(stories)
  },
  data: () => ({
    stories: '',
  }),
  computed: {
    ...mapState({
      cv: state => state.storyblok.cv,
      lang: state => state.locale.lang,
    }),
    sectionTitle() {
      return this.lang !== 'id' ? 'Journal' : 'Jurnal'
    }
  },
  components: {
    JournalCard,
  },
}
</script>
