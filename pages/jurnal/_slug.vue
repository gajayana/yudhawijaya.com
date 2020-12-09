<template>
  <div class="pb-8 w-full">
    <div
      class="bg-no-repeat bg-center bg-cover mb-6"
      :style="{
        backgroundImage: `url('${featuredImage}')`,
        height: 'calc(75vh - 64px)'
      }"
    />
    <div class="-mt-16">
      <article class="bg-white border-t-8 border-indigo-400 mx-auto p-4 max-w-2xl">
        <header class="mb-4 md:mb-6">
          <story-title>{{ title }}</story-title>
        </header>
        <section class="border-b border-gray-400 border-solid mb-8 md:mb-16 pb-4">
          <story-excerpt>
            {{ excerpt }}
          </story-excerpt>
          <p class="mx-auto max-w-3xl text-base text-gray-800 md:text-base">
            <span>Yosef Yudha Wijaya</span>
            <span class="mx-1">&middot;</span>
            <time :datetime="firstPublishedAt">{{ firstPublishedAt | dateTimeFormatter($route.query.hl) }}</time>
          </p>
        </section>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <section v-if="body" class="story-body" v-html="$md.render(body)" />

        <section>
          <lazy-story-tags v-if="tags" :tags="tags" class="mb-8" />
          <client-only>
            <lazy-stories-related v-if="tags" :excluding-ids="id" :tags="tags" path="jurnal" />
          </client-only>
        </section>
      </article>
    </div>
  </div>
</template>
<script>
import '~/assets/css/_post.css'
export default {
  name: 'JournalSingle',
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
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
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.excerpt },
        { hid: 'og:description', property: 'og:description', content: this.excerpt },
        { hid: 'og:image', property: 'og:image', content: this.featuredImage },
        { hid: 'og:title', property: 'og:title', content: this.title },
        { hid: 'og:url', property: 'og:url', content: `https://yudhawijaya.com${this.$route.path}` },
        { hid: 'article:published_time', property: 'article:published_time', content: this.firstPublishedAt }
      ]
    }
  },
  computed: {
    body () {
      return this.story.content.body || ''
    },
    excerpt () {
      return this.story.content.excerpt || ''
    },
    featuredImage () {
      return this.story.content.featured_image.filename.replace('a.storyblok.com', 'img2.storyblok.com/960x540/smart') || ''
    },
    firstPublishedAt () {
      return this.story.first_published_at || ''
    },
    id () {
      return this.story.id || 0
    },
    tags () {
      return this.story.tag_list.length > 0 ? this.story.tag_list : ''
    },
    title () {
      return this.story.content.title || ''
    }
  },
  watchQuery: ['hl']
}
</script>
