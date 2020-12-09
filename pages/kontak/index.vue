<template>
  <div class="container mx-auto pb-8">
    <sheet-section class="mx-4 lg:mx-0 my-8">
      {{ sectionTitle }}
    </sheet-section>
    <div class="flex flex-col items-center">
      <h2 class="leading-tight mb-8 mx-4 md:mx-0 text-center text-4xl max-w-md">
        {{ intro }}
      </h2>
      <ul class="flex mb-8 -mx-2">
        <li v-for="(item, key) in socialItems" :key="`contact-social-${key}`" class="px-2">
          <a :href="item.link" :title="item.link" class="text-gray-600 hover:text-gray-900 text-3xl" rel="noreferrer" target="_blank">
            <font-awesome-icon :icon="item.icon" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Contact',
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    const { hl = 'id' } = query || {}

    if (hl) { store.commit('locale/setLang', hl) }

    const {
      data: {
        story: {
          content: {
            intro = ''
          }
        }
      }
    } = await app.$storyapi.get(
      `cdn/stories/${hl}/contact`,
      {
        cv: store.state.storyblok.cv,
        version: 'published'
      }
    ) || {}

    return {
      intro
    }
  },
  computed: {
    ...mapState({
      lang: state => state.locale.lang,
      social: state => state.core.social
    }),
    sectionTitle () {
      return this.lang !== 'id' ? 'Contact' : 'Kontak'
    },
    socialItems () {
      if (!this.social) { return }
      const items = [...this.social]
      return items.splice(0, 2)
    }
  },
  watchQuery: ['hl'],
  // eslint-disable-next-line vue/order-in-components
  head () {
    return {
      title: 'Kontak'
    }
  }
}
</script>
