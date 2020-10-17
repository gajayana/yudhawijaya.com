<template>
  <div class="container mx-auto pb-8 pt-16">
    <app-sheet-section class="mx-4 lg:mx-0 my-8">{{ sectionTitle }}</app-sheet-section>
    <div class="flex flex-col items-center">
      <h2 class="leading-tight mb-8 text-center text-4xl max-w-md">{{ intro }}</h2>
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
import consola from 'consola'
import { mapState } from 'vuex'
import AppSheetSection from '~/components/sheets/Section'
export default {
  name: 'Contact',
  watchQuery: ['hl'],
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect, error}) {
    const { hl = 'id' } = query || {}

    if (hl) store.commit('locale/setLang', hl)

    const {
      data: {
        story: {
          content: {
            intro = ''
          }
        }
      }
    } = await app.$storyapi.get(
      `cdn/stories/${ hl }/contact`,
      {
        cv: store.state.storyblok.cv,
        version: 'published'
      }
    ) || {}

    return {
      intro
    }
  },
  components: {
    AppSheetSection,
  },
  computed: {
    ...mapState({
      lang: state => state.locale.lang,
      social: state => state.footer.social,
    }),
    sectionTitle() {
      return this.lang !== 'id' ? 'Contact' : 'Kontak'
    },
    socialItems() {
      if (!this.social) return
      const items = [ ...this.social ]
      return items.splice(0, 2)
    }
  },
}
</script>
