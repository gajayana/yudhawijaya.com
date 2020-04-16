<template>
  <div class="container mx-auto md:px-4 py-20">
    <h2 class="font-bold font-sans leading-tight mb-4 px-4 md:px-0 text-gray-600 text-3xl sm:text-4xl">Jurnal</h2>
    <div v-if="posts" class="flex flex-wrap mx-0 md:-mx-4">
      <div class="flex w-full md:w-1/2 lg:w-1/3 px-4 mb-4" v-for="post in posts" :key="post.uuid">
        <nuxt-link :to="permalink(post)" class="bg-white flex flex-col h-full overflow-hidden rounded shadow">
          <div class="bg-center bg-cover bg-no-repeat flex" :style="{ backgroundImage: `url(${post.content.featured_image})`, paddingBottom: '56.25%' }"></div>
          <div class="flex flex-col h-full justify-between p-4">
            <div class="flex flex-col mb-3">
              <h3 class="font-bold font-sans leading-tight mb-2 text-xl">{{ post.content.title }}</h3>
              <p class="text-gray-800">{{ post.content.excerpt }}</p>
            </div>
            <div class="flex text-gray-600 text-xs">
              <time :datetime="post.first_published_at">{{ post.first_published_at | dateTimeFormatter(lang) }}</time>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'HomePosts',
  data() {
    return {
      lang: this.$route.query.hasOwnProperty('hl') && this.$route.query.hl === 'en' ? this.$route.query.hl : '',
      posts: '',
    }
  },
  async fetch () {
    try {
      const result = await this.$storyapi.get(
        'cdn/stories',
        {
          cv: Date.now(),
          per_page: 6,
          sort_by: 'first_published_at:desc',
          starts_with: `${ this.lang ? 'en/' : '' }posts/`,
          version: 'published'
        }
      )

      this.posts = Object.freeze(result.data.stories)
    } catch(err) {
      this.$nuxt.context.error({
        statusCode: err.statusCode,
        message: err.message,
      })
    }
  },
  fetchOnServer: true,
  methods: {
    permalink(post) {
      const locale = this.lang ? `?hl=${this.lang}` : ''
      return `/jurnal/${post.slug + locale}`
    }
  }
}
</script>
