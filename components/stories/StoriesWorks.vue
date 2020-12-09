<template>
  <div class="flex flex-col w-full">
    <!-- start: stories -->
    <div class="flex flex-col items-start">
      <progress-loader v-if="$fetchState.pending" class="m-4" />
      <div v-else-if="$fetchState.error">
        Error
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 w-full">
        <div v-for="story in stories" :key="story.uuid" class="flex">
          <card-story-flat
            :featured-image="story.featuredImage"
            path="karya"
            :slug="story.slug"
            :title="story.title"
          />
        </div>
      </div>
    </div>
    <!-- end: stories -->

    <!-- start: cta -->
    <div class="flex justify-center py-8 px-4 w-full">
      <nuxt-link class="border-2 border-indigo-600 px-8 py-2 rounded-sm" :to="cta.to">
        <span class="font-sans text-indigo-600 font-bold text-xl">{{ cta.label }}</span>
      </nuxt-link>
    </div>
    <!-- end: cta -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'StoriesWorks',
  data: () => ({
    stories: ''
  }),
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
        sort_by: 'content.date_end:desc',
        starts_with: `${this.lang ? this.lang + '/' : ''}works/`,
        version: 'published'
      }
    ) || {}

    this.stories = stories.map((ob) => {
      const {
        content: {
          featured_image: {
            filename: featuredImage = ''
          },
          title = ''
        },
        slug = '',
        uuid = ''
      } = ob

      return {
        featuredImage,
        slug,
        title,
        uuid
      }
    })
  },
  computed: {
    ...mapState({
      cv: state => state.storyblok.cv,
      lang: state => state.locale.lang
    }),
    cta () {
      return {
        label: this.lang !== 'id' ? 'View All Works' : 'Lihat Semua Karya',
        to: `/karya${this.lang !== 'id' ? '?hl=' + this.lang : ''}`
      }
    }
  },
  watch: {
    '$route.query': '$fetch'
  }
}
</script>
