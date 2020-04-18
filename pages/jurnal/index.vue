<template>
  <div class="container mx-auto py-8">
    <h1 class="font-bold font-sans leading-tight mb-4 px-4 md:px-0 text-gray-600 text-3xl sm:text-4xl">Jurnal</h1>
    <div v-if="stories" class="flex flex-wrap mx-0 md:-mx-4">
      <div class="flex w-full md:w-1/2 lg:w-1/3 px-4 mb-4" v-for="story in stories" :key="story.uuid">
        <journal-card :story="story"></journal-card>
      </div>
    </div>
  </div>
</template>
<script>
import JournalCard from '~/components/journal/card'
export default {
  name: 'Journal',
  async asyncData({app, isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
    try {
      const lang = query.hl ? query.hl : ''
      const { metas, stories } = await $axios.$get(`/api/journals${ lang ? '/' + lang : ''}`)

      store.commit('locale/setLang', lang)

      return {
        metas,
        stories,
      }
    } catch(err) {
      error({
        statusCode: err.statusCode,
        message: err.message,
      })
    }
  },
  components: {
    JournalCard,
  },
  head() {
    return {
      title: this.metas.title,
      meta: [
        { hid: 'description', name: 'description', content: this.metas.description },
        { hid: 'og:description', name: 'og:description', property: 'og:description', content: this.metas.description },
        { hid: 'og:image', name: 'og:image', property: 'og:image', content: this.metas.image },
        { hid: 'og:title', name: 'og:title', property: 'og:title', content: this.metas.title },
        { hid: 'og:url', name: 'og:url', property: 'og:url', content: `https://yudhawijaya.com${ this.$route.path }` },
      ],
    }
  },
}
</script>
