<template>
  <div class="container mx-auto pb-8 pt-16">
    <article>
      <header v-if="title" class="mb-6 px-4">
        <h1 class="font-bold font-sans leading-tight mx-auto text-center text-gray-900 text-2xl sm:text-3xl md:text-4xl max-w-3xl">
          {{ title }}
        </h1>
      </header>
      <section v-if="excerpt" class="mb-6 px-4">
        <p class="italic mb-4 mx-auto max-w-3xl text-base md:text-lg text-center text-gray-700">
          {{ excerpt }}
        </p>
        <p class="mx-auto max-w-3xl text-base text-center text-gray-600 md:text-base">
          <span>Yosef Yudha Wijaya</span>
          <span class="mx-1">&middot;</span>
          <time :datetime="firstPublishedAt">{{ firstPublishedAt | dateTimeFormatter($route.query.hl) }}</time>
        </p>
      </section>
      <section v-if="featuredImage" class="max-w-3xl mb-6 mx-4 lg:mx-auto p-2 lg:p-4 shadow-md">
        <img :alt="title" :src="featuredImage" class="block w-full">
      </section>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <section v-if="body" class="story-body" v-html="$md.render(body)" />
    </article>
  </div>
</template>
<script>
import '~/assets/css/_post.css'
export default {
  name: 'JournalSingle',
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error, $axios }) {
    const { hl = 'id' } = query || {}
    store.commit('locale/setLang', hl)

    const story = await app.$storyapi.get(
      `cdn/stories/${hl ? hl + '/' : ''}posts/${params.slug}`,
      { cv: store.state.storyblok.cv, version: 'published' }
    )
    store.commit('journal/setStory', story.data.story)

    return {
      story: Object.freeze(story.data.story)
    }
  },
  watchQuery: ['hl'],
  computed: {
    body () {
      return this.story.content.body || ''
    },
    excerpt () {
      return this.story.content.excerpt || ''
    },
    featuredImage () {
      return this.story.content.featured_image.filename.replace('a.storyblok.com', 'img2.storyblok.com/768x0') || ''
    },
    firstPublishedAt () {
      return this.story.first_published_at || ''
    },
    title () {
      return this.story.content.title || ''
    }
  },
  head () {
    return {
      title: `${this.title} – yudhawijaya.com`,
      meta: [
        { hid: 'description', name: 'description', content: this.excerpt },
        { hid: 'og:description', property: 'og:description', content: this.excerpt },
        { hid: 'og:image', property: 'og:image', content: this.featuredImage },
        { hid: 'og:title', property: 'og:title', content: `${this.title} – yudhawijaya.com` },
        { hid: 'og:url', property: 'og:url', content: `https://yudhawijaya.com${this.$route.path}` },
        { hid: 'article:published_time', property: 'article:published_time', content: this.firstPublishedAt }
      ]
    }
  }
}
</script>
