<template>
  <div class="pb-8 pt-8 w-full">
    <div
      class="bg-no-repeat bg-center bg-cover mb-6"
      :style="{
        backgroundImage: `url('${featuredImage}')`,
        height: '75vh'
      }"
    />
    <div class="-mt-16">
      <article class="bg-white border-t-8 border-indigo-400 mx-auto p-4 max-w-2xl">
        <header class="mb-4 md:mb-6">
          <story-title>
            {{ title }}
          </story-title>
        </header>

        <section class="border-b border-gray-400 border-solid mb-8 md:mb-16 pb-4">
          <story-excerpt>
            {{ excerpt }}
          </story-excerpt>
          <p class="text-base text-gray-600">
            {{ period }}
          </p>
          <p v-if="url" class="flex flex-col text-base">
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

        <!-- eslint-disable-next-line vue/no-v-html -->
        <section v-if="body" class="story-body" v-html="$md.render(body)" />

        <section>
          <lazy-story-tags v-if="tags" :tags="tags" class="mb-8" />
          <client-only>
            <lazy-stories-related v-if="tags" :excluding-ids="id" :tags="tags" path="karya" />
          </client-only>
        </section>
      </article>
    </div>
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

    const {
      data: {
        story = {}
      }
    } = await app.$storyapi.get(
      `cdn/stories/${hl !== 'id' ? hl + '/' : ''}works/${params.slug}`,
      { cv: store.state.storyblok.cv, version: 'published' }
    ) || {}

    store.commit('journal/setStory', story)

    return {
      story: Object.freeze(story)
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
      return this.story.content.featured_image.filename.replace('a.storyblok.com', 'img2.storyblok.com/960x0') || ''
    },
    firstPublishedAt () {
      return this.story.first_published_at || ''
    },
    id () {
      return this.story.id || 0
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
    tags () {
      return this.story.tag_list.length > 0 ? this.story.tag_list : ''
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
