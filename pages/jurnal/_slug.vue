<template>
  <div class="container mx-auto py-8">
    <article>
      <header v-if="title" class="mb-6 px-4">
        <h1 class="font-bold font-sans leading-tight mx-auto text-center text-gray-900 text-2xl sm:text-3xl md:text-4xl max-w-3xl">{{ title }}</h1>
      </header>
      <section v-if="excerpt" class="mb-6 px-4">
        <p class="italic mb-4 mx-auto max-w-3xl text-base md:text-lg text-center text-gray-700">{{ excerpt }}</p>
        <p class="mx-auto max-w-3xl text-base text-center text-gray-600 text-sm md:text-base">
          <span>Yosef Yudha Wijaya</span>
          <span class="mx-1">&middot;</span>
          <time :datetime="firstPublishedAt">{{ firstPublishedAt | dateTimeFormatter($route.query.hl) }}</time>
        </p>
      </section>
      <section v-if="featuredImage" class="max-w-3xl mb-6 mx-4 lg:mx-auto p-2 lg:p-4 shadow-md">
        <img :alt="title" :src="featuredImage" class="block w-full" />
      </section>
      <section v-if="body" v-html="$md.render(body)" class="story-body"></section>
    </article>
  </div>
</template>
<script>
// import { mapGetters, mapState } from 'vuex'
export default {
  name: 'JournalSingle',
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
    const lang = query.hl ? query.hl : ''
    const story = await $axios.$get(`api/journal/${params.slug}/${lang ? lang : ''}`)

    store.commit('journal/setStory', story)
    store.commit('locale/setLang', lang)

    return {
      story: Object.freeze(story)
    }
  },
  watchQuery: ['hl'],
  head() {
    return {
      title: `${this.title} – yudhawijaya.com`,
      meta: [
        { hid: 'description', name: 'description', content: this.excerpt },
        { hid: 'og:description', name: 'og:description', property: 'og:description', content: this.excerpt },
        { hid: 'og:image', name: 'og:image', property: 'og:image', content: this.featuredImage },
        { hid: 'og:title', name: 'og:title', property: 'og:title', content: `${this.title} – yudhawijaya.com` },
        { hid: 'og:url', name: 'og:url', property: 'og:url', content: `https://yudhawijaya.com${this.$route.path}` },
        { hid: 'article:published_time', name: 'article:published_time', property: 'article:published_time', content: this.firstPublishedAt},
      ],
    }
  },
  computed: {
    body() {
      if (this.story) return this.story.content.body
    },
    excerpt() {
      if (this.story) return this.story.content.excerpt
    },
    featuredImage() {
      if (this.story) return this.story.content.featured_image.replace('a.storyblok.com', 'img2.storyblok.com/768x0')
    },
    firstPublishedAt() {
      if (this.story) return this.story.first_published_at
    },
    title() {
      if (this.story) return this.story.content.title
    }
  },
}
</script>
