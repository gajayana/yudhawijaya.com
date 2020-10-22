<template>
  <div class="container mx-auto md:px-4 py-20">
    <h2 class="font-bold font-sans leading-tight mb-4 px-4 md:px-0 text-indigo-600 text-3xl sm:text-4xl">
      <nuxt-link :to="`/jurnal${ lang !== 'id' ? '?hl=' + lang : ''}`">
        {{ sectionTitle }}
      </nuxt-link>
    </h2>
    <div class="flex flex-col">
      <div>
        <progress-loader v-if="$fetchState.pending" />
        <div v-else-if="$fetchState.error">
          Error
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-0 w-full">
          <div v-for="story in stories" :key="story.uuid" class="flex">
            <card-story
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
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'StoriesJournals',
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
    ) || {}

    this.stories = stories.map((ob) => {
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
