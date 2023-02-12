<script setup lang="ts">
import { SOCIAL_ACCOUNTS } from '~~/constants'
const { $mdit } = useNuxtApp()
</script>

<template>
  <footer class="footer bg-gray-900 flex flex-col items-center px-4 pb-8 pt-6">
    <p class="font-mono mb-2 text-white text-center text-xs">
      <span v-html="$mdit.renderInline($t('footer.text'))" />
    </p>
    <ul class="flex gap-2">
      <li v-for="{icon, medium, url} in SOCIAL_ACCOUNTS" :key="`footer-social-${medium}`" class="flex">
        <a 
          :href="url" 
          :title="url" 
          rel="noreferrer"
          target="_blank" 
          class="text-white hover:text-gray-600 text-2xl"
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