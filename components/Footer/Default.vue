<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import { SOCIAL_ACCOUNTS } from '~~/utils/constants.js'
const { t } = useI18n({
  useScope: 'local'
})
const { $mdit } = useNuxtApp()

</script>

<i18n lang="yaml">
en:
  text: 'Built with 🤔 by Yosef Yudha Wijaya'
id:
  text: 'Terbikin dengan penuh [🤔](https://kbbi.kemdikbud.go.id/entri/kemelitan) oleh Yosef Yudha Wijaya'
</i18n>

<template>
  <footer class="footer backdrop-blur-sm flex flex-col items-center px-4 pb-8 pt-6 w-full">
    <div class="border-t border-solid border-gray-300 mb-8 w-full" />
    <p class="font-mono mb-2 text-gray-500 text-center text-xs">
      <span v-html="($mdit as MarkdownIt).renderInline(t('text'))" />
    </p>
    <ul class="flex gap-2">
      <li v-for="{icon, medium, url} in SOCIAL_ACCOUNTS" :key="`footer-social-${medium}`" class="flex">
        <a
          :href="url"
          :title="url"
          rel="noreferrer"
          target="_blank"
          class="text-gray-500 hover:text-gray-600 text-2xl"
        >
          <Icon :name="icon" />
        </a>
      </li>
    </ul>
  </footer>
</template>

<style lang="postcss">
.footer {
  a {
    @apply no-underline
  }
}
</style>
