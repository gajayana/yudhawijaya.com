<script setup lang="ts">
const { t, locale } = useI18n({
  useScope: 'local'
})

defineI18nRoute({
  paths: {
    en: '/contact',
    id: '/kontak'
  }
})

useHead(seo({
  description: t('intro'),
  title: `${t('heading')} ${SEO_TITLE_DEFAULT}`
}))

const socialAccounts = SOCIAL_ACCOUNTS.filter(({medium}) => ['linkedin', 'twitter'].includes(medium))

</script>

<i18n lang="yaml">
en:
  heading: 'Contact'
  intro: 'For enquiries, or just to say hello, please contact me at these following platforms:'
id:
  heading: 'Contact'
  intro: 'Silakan menyapa saya melalui platform berikut:'
</i18n>

<template>
  <main class="flex flex-col w-full p-4">
    <div 
      class="flex flex-col w-full"
      :style="{
        height: 'calc(100vh - 4rem - 9.063rem - 2rem)'
      }"
    >
      <div class="container flex flex-col items-center mx-auto p-4 w-full">
        <h1 class="flex font-medium font-sans mb-4 lg:mb-8 text-2xl lg:text-5xl">
          {{ t('heading') }}
        </h1>

        <p class="font-serif mb-8 italic">{{ t('intro') }}</p>

        <ul class="flex gap-4">
          <li v-for="{ icon, medium, url } in socialAccounts" :key="`footer-social-${medium}`" class="flex">
            <a 
              :href="url" 
              :title="url" 
              rel="noreferrer"
              target="_blank" 
              class="text-gray-500 hover:text-gray-600 text-2xl"
            >
              <Icon :name="icon" size="3rem" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>