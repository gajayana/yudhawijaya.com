<script setup lang="ts">
const { t } = useI18n({
  useScope: "local",
});
</script>

<i18n lang="yaml">
en:
  text: "Built with 🤔 by Yosef Yudha Wijaya"
id:
  text: "Terbikin dengan penuh [🤔](https://kbbi.kemdikbud.go.id/entri/kemelitan) oleh Yosef Yudha Wijaya"
</i18n>

<template>
  <footer
    class="footer backdrop-blur-sm flex flex-col items-center px-4 pb-8 pt-6 w-full"
  >
    <div class="border-t border-solid border-zinc-200 mb-8 w-full" />

    <MDC
      :value="t('text')"
      tag="div"
      class="font-mono mb-2 text-center text-xs"
    />

    <ul class="flex gap-2">
      <li
        v-for="{ icon, medium, url } in SOCIAL_ACCOUNTS"
        :key="`footer-social-${medium}`"
        class="flex"
      >
        <a
          :href="url"
          :title="url"
          rel="noreferrer"
          target="_blank"
          class="hover:text-white text-2xl"
        >
          <Icon :name="icon" />
        </a>
      </li>
    </ul>
  </footer>
</template>

<style scoped>
@reference "tailwindcss/theme";
.footer {
  a {
    @apply no-underline;
  }
}
</style>
