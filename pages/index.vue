<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const { t } = useI18n({
  useScope: 'local'
})

useHead(seo({
  description: t('description'),
  url: `${runtimeConfig.baseUrl}${route.fullPath}`
}))

</script>

<i18n lang="yaml">
en:
  description: 'A professional digital product engineer with 7 plus years of experience.'
id:
  description: 'Seorang pengembang produk aplikasi digital profesional dengan pengalaman lebih dari 7 tahun.'
</i18n>

<template>
  <main class="flex flex-col w-full">
    <HeroIntro/>
    <WorksListFeatured />
  </main>
</template>