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
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'Yosef Yudha Wijaya' },
        { name: 'description', content: '' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:creator', content: '@tuan_yudha' },
        { name: 'twitter:site', content: '@tuan_yudha' },
        { name: 'og:site_name', content: 'Yosef Yudha Wijaya', property: 'og:site_name' }
      ]
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
          messages: {
            en: {
              loading: 'Loading...'
            },
            id: {
              loading: 'Memuat data...'
            }
          }
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
            ital: []
          },
          'Open Sans': {
            wght: [400, 700],
            ital: [400]
          }
        }
        // overwriting: false
      }
    ],
    // https://nuxt.com/modules/icon
    'nuxt-icon',

    '@storyblok/nuxt',

    // https://nuxt.com/modules/pinia
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate']
      }
    ],
    // https://nuxt.com/modules/simple-sitemap
    'nuxt-simple-sitemap',

    // https://github.com/nuxt-modules/eslint
    ['@nuxtjs/eslint-module', { /* module options */ }],

    // https://github.com/ymmooot/nuxt-jsonld
    'nuxt-jsonld',

    // https://nuxt.com/modules/lodash
    'nuxt-lodash',

    // https://nuxt.com/modules/mdc
    '@nuxtjs/mdc'

    // https://github.com/vite-pwa/nuxt
    // [
    //   '@vite-pwa/nuxt',
    //   {
    //     registerType: 'autoUpdate',
    //     manifest: {
    //       name: 'Yosef Yudha Wijaya',
    //       short_name: 'yudhawijaya',
    //       theme_color: '#ffffff',
    //       icons: [
    //         {
    //           src: 'pwa-192x192.png',
    //           sizes: '192x192',
    //           type: 'image/png',
    //         },
    //         {
    //           src: 'pwa-512x512.png',
    //           sizes: '512x512',
    //           type: 'image/png',
    //         },
    //         {
    //           src: 'pwa-512x512.png',
    //           sizes: '512x512',
    //           type: 'image/png',
    //           purpose: 'any maskable',
    //         },
    //       ],
    //     },
    //     workbox: {
    //       navigateFallback: '/',
    //       globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    //     },
    //     client: {
    //       installPrompt: true,
    //       // you don't need to include this: only for testing purposes
    //       // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
    //       // periodicSyncForUpdates: 20,
    //     },
    //     devOptions: {
    //       enabled: true,
    //       type: 'module',
    //     },
    //   }
    // ]
  ],

  site: {
    // @ts-expect-error no explanation in docs about how to get env values here
    url: process.env.NUXT_BASE_URL
  },
  // https://nuxt.com/modules/storyblok
  storyblok: {
    // @ts-expect-error no explanation in docs about how to get env values here
    accessToken: process.env.NUXT_STORYBLOK_ACCESS_TOKEN
  },

  imports: {
    dirs: ['./stores']
  },

  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:3000'
    }
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler'
      }
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/karya',
        '/jurnal',
        '/kontak',
        '/en',
        '/en/works',
        '/en/journals',
        '/en/contact'
      ]
    }
  },

  vite: {
    optimizeDeps: {
      exclude: [
        'fsevents'
      ]
    }
  }
})
