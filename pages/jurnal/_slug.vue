<template>
  <div class="container mx-auto py-8">
    <article>
      <header class="mb-6 px-4">
        <h1 class="font-bold font-sans leading-tight mx-auto text-center text-gray-900 text-2xl sm:text-3xl md:text-4xl max-w-3xl">{{ title }}</h1>
      </header>
      <section class="mb-6 px-4">
        <p class="italic mb-4 mx-auto max-w-3xl text-base md:text-lg text-center text-gray-700">{{ excerpt }}</p>
        <p class="mx-auto max-w-3xl text-base text-center text-gray-600 text-sm md:text-base">
          <span>Yosef Yudha Wijaya</span>
          <span class="mx-1">&middot;</span>
          <time :datetime="firstPublishedAt">{{ firstPublishedAt | dateTimeFormatter }}</time>
        </p>
      </section>
      <section class="max-w-3xl mb-6 mx-4 lg:mx-auto p-2 lg:p-4 shadow-md">
        <img :alt="title" :src="featuredImage" class="block w-full" />
      </section>
      <section class="story-body" v-html="$md.render(body)"></section>
    </article>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import dateTimeFormatter from '~/mixins/filters/dateTimeFormatter'
export default {
  name: 'JournalSingle',
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect, error}) {
    await store.dispatch(
      'journal/fetch',
      {
        app,
        slug: params.slug
      }
    )
  },
  head() {
    return {
      title: `${this.title} – yudhawijaya.com`,
      meta: [
        { hid: 'description', name: 'description', content: this.excerpt },
        { hid: 'og:description', name: 'og:description', property: 'og:description', content: this.excerpt },
        { hid: 'og:image', name: 'og:image', property: 'og:image', content: this.featuredImage },
        { hid: 'og:title', name: 'og:title', property: 'og:title', content: `${this.title} – yudhawijaya.com` },
        { hid: 'og:url', name: 'og:url', property: 'og:url', content: `https://yudhawijaya.com${this.$route.path}` },
        { hid: 'twitter:card', name: 'twitter:card', property: 'twitter:card', content: 'summary' },
        { hid: 'twitter:creator', name: 'twitter:creator', property: 'twitter:creator', content: '@tuan_yudha' },
        { hid: 'twitter:site', name: 'twitter:site', property: 'twitter:site', content: '@tuan_yudha' },
        { hid: 'article:published_time', name: 'article:published_time', property: 'article:published_time', content: this.firstPublishedAt},
      ],
    }
  },
  computed: {
    ...mapGetters({
      body: 'journal/body',
      excerpt: 'journal/excerpt',
      featuredImage: 'journal/featuredImage',
      firstPublishedAt: 'journal/firstPublishedAt',
      title: 'journal/title',
    }),
    // ...mapState({
    //   raw: state => state.journal.raw
    // }),
  },
  mixins: [
    dateTimeFormatter,
  ],
}
</script>
