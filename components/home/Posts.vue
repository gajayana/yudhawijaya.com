<template>
  <div class="container mx-auto md:px-4 py-20">
    <h2 class="font-bold font-sans leading-tight mb-4 px-4 md:px-0 text-gray-600 text-3xl sm:text-4xl">
      <nuxt-link :to="`/jurnal${ lang ? '?hl=' + lang : ''}`">{{ lang ? 'Journals' : 'Jurnal'}}</nuxt-link>
    </h2>
    <div v-if="stories" class="flex flex-wrap mx-0 md:-mx-4">
      <div class="flex w-full md:w-1/2 lg:w-1/3 px-4 mb-4" v-for="story in stories" :key="story.uuid">
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
    })
  },
  components: {
    JournalCard,
  },
}
</script>
