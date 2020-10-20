<template>
  <div class="container mx-auto pb-8 pt-16">
    <article>
      <header v-if="title" class="mb-6 px-4">
        <h1 class="font-bold font-sans leading-tight mx-auto text-center text-gray-900 text-2xl sm:text-3xl md:text-4xl max-w-3xl">
          {{ title }}
        </h1>
      </header>

      <section class="mb-6 px-4">
        <p class="mx-auto max-w-3xl text-base text-center text-gray-600 md:text-base">
          {{ period }}
        </p>
        <p v-if="url" class="flex flex-col mx-auto max-w-3xl text-base text-center md:text-base">
          <a
            :href="url"
            :title="url"
            :class="[
              urlIsInvalid ? 'text-red-600' : 'text-blue-600'
            ]"
            target="_blank"
          >
            <span class="underline">{{ url }}</span>
            <font-awesome-icon v-if="!urlIsInvalid" class="ml-1" :icon="['fas', 'external-link-alt']" />
          </a>
        </p>
      </section>

      <section v-if="featuredImage" class="border border-gray-600 max-w-3xl mb-6 mx-4 lg:mx-auto shadow-md">
        <img :alt="title" :src="featuredImage" class="block w-full">
      </section>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <section v-if="body" class="story-body" v-html="$md.render(body)" />
    </article>
  </div>
</template>
<script>
import '~/assets/css/_post.css'
import { mapState } from 'vuex'
import format from 'date-fns/format'
import { enGB, id } from 'date-fns/locale'

export default {
  name: 'WorkSingle',
  watchQuery: ['hl'],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    const { hl = 'id' } = query || {}
    store.commit('locale/setLang', hl)

    const story = await app.$storyapi.get(
      `cdn/stories/${hl !== 'id' ? hl + '/' : ''}projects/${params.slug}`,
      { cv: store.state.storyblok.cv, version: 'published' }
    )
    store.commit('journal/setStory', story.data.story)

    return {
      story: Object.freeze(story.data.story)
    }
  },
  computed: {
    ...mapState({
      lang: state => state.locale.lang
    }),
    body () {
      return this.story.content.body || ''
    },
    excerpt () {
      return this.story.content.excerpt || ''
    },
    featuredImage () {
      return this.story.content.featured_image.replace('a.storyblok.com', 'img2.storyblok.com/768x0') || ''
    },
    firstPublishedAt () {
      return this.story.first_published_at || ''
    },
    period () {
      const {
        content: {
          date_end: dateEnd,
          date_start: dateStart
        }
      } = this.story || {}
      const config = {
        locale: this.lang !== 'id' ? enGB : id
      }
      let end = this.lang !== 'id' ? 'present' : 'kini'

      if (new Date() >= new Date(dateEnd)) {
        end = format(new Date(dateEnd), 'PPP', config)
      }

      return `${format(new Date(dateStart), 'PPP', config)} - ${end}`
    },
    title () {
      return this.story.content.title || ''
    },
    url () {
      return this.story.content.url || ''
    },
    urlIsInvalid () {
      return this.story.content.url_is_invalid || false
    }
  },
  head () {
    return {
      title: `${this.title} – yudhawijaya.com`,
      meta: [
        { hid: 'description', name: 'description', content: this.excerpt },
        { hid: 'og:description', name: 'og:description', property: 'og:description', content: this.excerpt },
        { hid: 'og:image', name: 'og:image', property: 'og:image', content: this.featuredImage },
        { hid: 'og:title', name: 'og:title', property: 'og:title', content: `${this.title} – yudhawijaya.com` },
        { hid: 'og:url', name: 'og:url', property: 'og:url', content: `https://yudhawijaya.com${this.$route.path}` },
        { hid: 'article:published_time', name: 'article:published_time', property: 'article:published_time', content: this.firstPublishedAt }
      ]
    }
  }
}
</script>
