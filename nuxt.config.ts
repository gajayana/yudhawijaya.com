import { SEO_TITLE_DEFAULT } from './utils/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: SEO_TITLE_DEFAULT,
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ],
      meta: [
        { hid: 'charset', charset: 'utf-8' },
        { hid: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'twitter:creator', name: 'twitter:creator', content: '@tuan_yudha' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@tuan_yudha' },
        { hid: 'og:site_name', name: 'og:site_name', content: 'Yosef Yudha Wijaya', property: 'og:site_name' },
      ],
    }
  },
  modules: [
    // See https://v8.i18n.nuxtjs.org/
    [
      '@nuxtjs/i18n', 
      {
        locales: ['en', 'id'],
        defaultLocale: 'id',
        vueI18n: {
          fallbackLocale: 'id',
        },
        vueI18nLoader: true,
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
    ],
    // https://nuxt.com/modules/icon
    'nuxt-icon',

    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_TOKEN_PUBLIC || ''
      }
    ],
    // https://nuxt.com/modules/pinia
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      }
    ]
  ],

  imports: {
    dirs: ['./stores'],
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_BASE_URL || 'http://localhost:3000'
    }
  }
})
