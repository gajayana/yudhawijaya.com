<template>
  <div class="container mx-auto md:px-4 py-20">
    <h2 class="font-bold font-sans leading-tight mb-4 px-4 md:px-0 text-gray-600 text-3xl sm:text-4xl">
      <nuxt-link :to="`/jurnal${ lang ? '?hl=' + lang : ''}`">Jurnal</nuxt-link>
    </h2>
    <div v-if="stories" class="flex flex-wrap mx-0 md:-mx-4">
      <div class="flex w-full md:w-1/2 lg:w-1/3 px-4 mb-4" v-for="story in stories" :key="story.uuid">
        <journal-card :story="story"></journal-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import JournalCard from '~/components/journal/card'
export default {
  name: 'HomePosts',
  data() {
    return {
      stories: '',
    }
  },
  computed: {
    ...mapState({
      lang: state => state.locale.lang
    })
  },
  async fetch () {
    try {
      const result = await this.$axios.$get(`/api/home/stories${ this.lang ? '?hl=' + this.lang : ''}`)
      this.stories = Object.freeze(result)
    } catch(err) {
      this.$nuxt.context.error({
        statusCode: err.statusCode,
        message: err.message,
      })
    }
  },
  fetchOnServer: true,
  components: {
    JournalCard,
  },
}
</script>
