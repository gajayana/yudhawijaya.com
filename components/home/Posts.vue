<template>
  <div class="container mx-auto md:px-4 py-20">
    <h2 class="font-bold font-sans leading-tight mb-4 px-4 md:px-0 text-indigo-600 text-3xl sm:text-4xl">
      <nuxt-link :to="`/jurnal${ lang !== 'id' ? '?hl=' + lang : ''}`">
        {{ sectionTitle }}
      </nuxt-link>
    </h2>
    <div v-if="stories" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 sm:mx-0">
      <div v-for="story in stories" :key="story.uuid" class="flex">
        <app-card-story
          :excerpt="story.excerpt"
          :featured-image="story.featuredImage"
          :published-at="story.publishedAt"
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
import AppCardStory from '~/components/cards/Story'
export default {
  name: 'HomePosts',
  components: {
    AppCardStory
  },
  async fetch () {
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
        starts_with: `${this.lang ? this.lang + '/' : ''}posts/`,
        version: 'published'
      }
    )

    this.stories = stories.map((ob) => {
      const {
        content: {
          excerpt = '',
          featured_image: featuredImage,
          title = ''
        },
        first_published_at: publishedAt,
        slug = ''
      } = ob || {}

      return {
        excerpt,
        featuredImage,
        publishedAt,
        slug,
        title
      }
    })
  },
  data: () => ({
    stories: ''
  }),
  computed: {
    ...mapState({
      cv: state => state.storyblok.cv,
      lang: state => state.locale.lang
    }),
    sectionTitle () {
      return this.lang !== 'id' ? 'Journal' : 'Jurnal'
    }
  },
  watch: {
    '$route.query': '$fetch'
  }
}
</script>
