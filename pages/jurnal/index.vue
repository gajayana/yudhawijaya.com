<template>
  <div class="container mx-auto py-8">
    <h1 class="font-bold font-sans leading-tight mb-4 px-4 md:px-0 text-gray-600 text-3xl sm:text-4xl">Jurnal</h1>
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
  name: 'Journal',
  // data:() => ({
  //   posts: ''
  // }),
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect, error}) {
    try {
      const result = await app.$storyapi.get(
        'cdn/stories',
        {
          cv: Date.now(),
          per_page: 24,
          sort_by: 'first_published_at:desc',
          starts_with: `${ query.hl ? 'en/' : '' }posts/`,
          version: 'published'
        }
      )

      return {
        lang: query.hl ? query.hl : '',
        posts : Object.freeze(result.data.stories)
      }
    } catch(err) {
      error({
        statusCode: err.statusCode,
        message: err.message,
      })
    }
  },
  head() {
    return {
      title: 'Jurnal – yudhawijaya.com',
      meta: [
        { hid: 'description', name: 'description', content: 'Kumpulan artikel yudhawijaya.com' },
        { hid: 'og:description', name: 'og:description', property: 'og:description', content: 'Kumpulan artikel yudhawijaya.com' },
        // { hid: 'og:image', name: 'og:image', property: 'og:image', content: `https:${this.metas.og_image}` },
        { hid: 'og:title', name: 'og:title', property: 'og:title', content: 'Jurnal – yudhawijaya.com' },
        { hid: 'og:url', name: 'og:url', property: 'og:url', content: 'https://yudhawijaya.com/' },
        { hid: 'twitter:card', name: 'twitter:card', property: 'twitter:card', content: 'summary' },
        { hid: 'twitter:creator', name: 'twitter:creator', property: 'twitter:creator', content: '@tuan_yudha' },
        { hid: 'twitter:site', name: 'twitter:site', property: 'twitter:site', content: '@tuan_yudha' },
      ],
    }
  },
  methods: {
    permalink(post) {
      const locale = this.lang ? `?hl=${this.lang}` : ''
      return `/jurnal/${post.slug + locale}`
    }
  },
}
</script>
