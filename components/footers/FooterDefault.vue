<template>
  <div class="bg-gray-900 flex flex-col items-center px-4 pb-8 pt-6">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-if="text" class="font-mono mb-2 text-white text-center text-xs" v-html="$md.render(text)" />
    <ul v-if="social" class="flex -mx-2">
      <li v-for="(item, key) in social" :key="`social-${key}`" class="px-2">
        <a :href="item.link" :title="item.link" class="text-white hover:text-gray-600 text-2xl" rel="noreferrer" target="_blank">
          <font-awesome-icon :icon="item.icon" />
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'FooterDefault',
  computed: {
    ...mapState({
      text: state => state.core.footer_text,
      social: state => state.core.social
    })
  }
}
</script>
