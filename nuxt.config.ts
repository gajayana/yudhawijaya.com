import { MESSAGES } from './constants/localizations';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // See https://v8.i18n.nuxtjs.org/
    ['@nuxtjs/i18n', {
      locales: ['en', 'id'],
      defaultLocale: 'id',
      vueI18n: {
        fallbackLocale: 'id',
        messages: MESSAGES
      },
      vueI18nLoader: true
    }],
  ],
})
