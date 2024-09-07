import { SEO_TITLE_DEFAULT } from './utils/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: SEO_TITLE_DEFAULT,
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'Yosef Yudha Wijaya' },
        { name: 'description', content: '' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:creator', content: '@tuan_yudha' },
        { name: 'twitter:site', content: '@tuan_yudha' },
        {
          name: 'og:site_name',
          content: 'Yosef Yudha Wijaya',
          property: 'og:site_name'
        }
      ]
    }
  },

  modules: [
    '@nuxtjs/i18n', // https://github.com/nuxt-modules/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@storyblok/nuxt',
    [
      '@pinia/nuxt', // https://nuxt.com/modules/pinia
      {
        autoImports: ['defineStore', 'acceptHMRUpdate']
      }
    ], // https://github.com/nuxt-modules/eslint
    '@nuxtjs/eslint-module', // https://github.com/ymmooot/nuxt-jsonld
    'nuxt-jsonld', // https://nuxt.com/modules/lodash
    'nuxt-lodash',
    '@nuxtjs/mdc', // https://nuxt.com/modules/icon
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/sitemap'
  ],
  googleFonts: {
    // https://google-fonts.nuxtjs.org/
    download: true,
    families: {
      Roboto: {
        wght: [300, 400, 500, 700],
        ital: []
      },
      'Open Sans': {
        wght: [400, 500, 700],
        ital: [400]
      }
    }
    // overwriting: false
  },
  i18n: {
    // See https://i18n.nuxtjs.org/
    vueI18n: './i18n.config.ts',
    baseUrl: process.env.NUXT_BASE_URL,
    defaultLocale: 'id',
    locales: [
      {
        code: 'en',
        language: 'en-GB'
      },
      {
        code: 'id',
        language: 'id-ID'
      }
    ],
    lazy: false
  },

  mdc: {
    // https://nuxt.com/modules/mdc
    // components: {
    //   prose: false, // Disable predefined prose components
    //   map: {
    //     h1: 'HeadingPrimary'
    //   }
    // }
  },

  site: {
    // https://nuxtseo.com/sitemap/getting-started/installation
    url: process.env.NUXT_BASE_URL,
    name: 'Yosef Yudha Wijaya'
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.NUXT_BASE_URL,
    gzip: true,
    sources: ['/api/__sitemap__/urls']
  },

  // https://nuxt.com/modules/storyblok
  storyblok: {
    accessToken: process.env.NUXT_STORYBLOK_ACCESS_TOKEN
  },

  image: {
    domains: ['a.storyblok.com']
  },

  imports: {
    dirs: ['./stores']
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_BASE_URL
    }
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler'
      }
    }
  },

  // nitro: {
  //   prerender: {
  //     crawlLinks: true,
  //     routes: [
  //       '/',
  //       '/karya',
  //       '/jurnal',
  //       '/kontak',
  //       '/en',
  //       '/en/works',
  //       '/en/journals',
  //       '/en/contact'
  //     ]
  //   }
  // },

  vite: {
    optimizeDeps: {
      exclude: ['fsevents']
    }
  },

  compatibilityDate: '2024-08-31'
})
