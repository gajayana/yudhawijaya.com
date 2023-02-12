import { MESSAGES } from './constants/localizations';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // See https://v8.i18n.nuxtjs.org/
    [
      '@nuxtjs/i18n', 
      {
        locales: ['en', 'id'],
        defaultLocale: 'id',
        vueI18n: {
          fallbackLocale: 'id',
          messages: MESSAGES
        },
        vueI18nLoader: true
      }
    ],
    // https://github.com/nuxt-modules/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://google-fonts.nuxtjs.org/
    [
      '@nuxtjs/google-fonts',
      {
        download: true,
        families: {
          Roboto: {
            wght: [300, 400, 500, 700],
            ital: [],
          },
          'Open Sans': {
            wght: [400, 700],
            ital: [400],
          }
        },
        // overwriting: false
      }
    ]
  ],
})
