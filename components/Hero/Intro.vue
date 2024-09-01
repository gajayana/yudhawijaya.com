<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local'
})

const scrollToWorks = () => {
  if (!window) { return }
  const el = document.getElementById('latest-works')
  if (!el) { return }

  if ('scrollBehavior' in document.documentElement.style) {
    return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  } else {
    return window.scrollTo(0, el.offsetTop)
  }
}
</script>

<i18n lang="yaml">
en:
  greeting: "Hi, I'm Yudha"
  buttonWorks: 'Works & Contributions'
  resume: 'I am a professional fullstack developer who specializes in [Vue.js](https://vuejs.org/), [Nuxt.js](https://nuxtjs.org/), [React](https://reactjs.org/), [Next.js](https://nextjs.org/), [Laravel](https://laravel.com/), [WordPress](https://wordpress.org/), and [Strapi](https://strapi.io/).'
id:
  greeting: 'Halo, saya Yudha'
  buttonWorks: 'Karya & Kontribusi'
  resume: 'Saya pengembang aplikasi berbasis web profesional yang berpengalaman dengan [Vue.js](https://vuejs.org/), [Nuxt.js](https://nuxtjs.org/), [React](https://reactjs.org/), [Next.js](https://nextjs.org/), [Laravel](https://laravel.com/), [WordPress](https://wordpress.org/), dan [Strapi](https://strapi.io/).'
</i18n>

<template>
  <div
    class="flex flex-col p-4 w-full"
    :style="{
      height: 'calc(100vh - 4rem)'
    }"
  >
    <div class="bg-transparent from-indigo-600 to-indigo-800 flex h-full items-center justify-center rounded-md w-full p-4">
      <div class="max-w-xl mx-auto">
        <MDC :value="t('greeting')" tag="h1" class="drop-shadow font-sans font-medium leading-tight mb-4 sm:mb-8 text-center text-3xl md:text-6xl lg:text-8xl text-white" />

        <MDC :value="t('resume')" tag="div" class="drop-shadow font-serif leading-snug sm:leading-tight mb-4 sm:mb-8 text-center text-md sm:text-2xl text-white" />

        <div class="flex items-center justify-center">
          <button
            class="border border-white drop-shadow flex px-8 py-2 mr-4 rounded-sm text-white uppercase"
            @click="scrollToWorks"
          >
            {{ t('buttonWorks') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
