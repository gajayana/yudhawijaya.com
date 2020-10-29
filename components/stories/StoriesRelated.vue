<template>
  <div>
    <h2 class="leading-none mb-4 text-2xl">
      {{ pageTitle }}
    </h2>
    <div class="flex flex-col w-full">
      <div class="grid gap-4 grid-cols-2">
        <div v-for="story in stories" :key="story.uuid">
          <card-story-small
            :excerpt="story.content.excerpt"
            :featured-image="story.content.featured_image.filename"
            :path="path"
            :slug="story.slug"
            :title="story.content.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'StoriesRelated',
  props: {
    excludingIds: {
      type: Number,
      default: 0
    },
    path: {
      type: String,
      default: 'jurnal'
    },
    tags: {
      type: Array,
      default: () => ([])
    }
  },
  async fetch () {
    let folder
    switch (this.path) {
      case 'karya':
        folder = 'works'
        break
      default:
        folder = 'posts'
        break
    }

    const {
      data: {
        stories = ''
      }
    } = await this.$storyapi.get(
      'cdn/stories',
      {
        cv: this.cv,
        excluding_ids: this.excludingIds,
        per_page: 6,
        sort_by: 'first_published_at:desc',
        starts_with: `${this.lang ? this.lang + '/' : ''}${folder}/`,
        version: 'published',
        with_tag: this.tags
      }
    )

    this.stories = stories
  },
  data: () => ({
    stories: ''
  }),
  computed: {
    ...mapState({
      cv: state => state.storyblok.cv,
      lang: state => state.locale.lang
    }),
    pageTitle () {
      return this.lang !== 'id' ? 'Related Stories' : 'Artikel Terkait'
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    permalink (slug) {
      return `/${this.path}/${slug}${this.lang !== 'id' ? '?hl=' + this.lang : ''}`
    }
  }
}
</script>
