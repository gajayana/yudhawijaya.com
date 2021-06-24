export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Muka',
    titleTemplate: '%s – yudhawijaya.com',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@tuan_yudha' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@tuan_yudha' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://composition-api.nuxtjs.org
    '@nuxtjs/composition-api/module',
    // https://github.com/nuxt-community/google-fonts-module
    [
      '@nuxtjs/google-fonts',
      {
        display: 'swap',
        families: {
          'Open+Sans': {
            wght: [400, 700],
            ital: [400, 700]
          },
          Roboto: [700]
        }
      }
    ],
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/fontawesome',
      {
        icons: {
          solid: ['faBars', 'faExternalLinkAlt', 'faLanguage', 'faTimes'],
          brands: ['faGithub', 'faGitlab', 'faLinkedin', 'faTwitter']
        }
      }
    ]

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.STORYBLOK_TOKEN || '',
        cacheProvider: 'memory'
      }
    ],
    [
      '@nuxtjs/markdownit',
      // See https://github.com/markdown-it/markdown-it
      {
        injected: true
      }
    ],
    // See https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots',
    // See https://github.com/nuxt-community/sitemap-module
    '@nuxtjs/sitemap',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config) {
      config.node = {
        fs: 'empty'
      }
    }
  },

  createRequire: 'jiti'
}
