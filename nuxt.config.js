require('dotenv').config()
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:creator', name: 'twitter:creator', content: '@tuan_yudha' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@tuan_yudha' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700|Roboto:700&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#3182ce',
    height: '0.25rem'
  },

  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/directives/scroll',
    '~/plugins/filters/dateTimeFormatter',
    '~/plugins/injects/socialParser'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // https://github.com/nuxt-community/google-fonts-module
    [
      '@nuxtjs/google-fonts',
      {
        display: 'swap',
        families: {
          'Open+Sans': {
            wght: [400, 700],
            ital: [400]
          },
          Roboto: [700]
        }
      }
    ],
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/fontawesome',
      {
        icons: {
          solid: ['faExternalLinkAlt'],
          brands: ['faGithub', 'faGitlab', 'faLinkedin', 'faTwitter']
        }
      }
    ]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    [
      '@nuxtjs/dotenv',
      {
        only: []
      }
    ],
    '@nuxtjs/pwa',
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
    '@nuxtjs/sitemap'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
  ** TailwindCSS module configuration
  ** See https://github.com/nuxt-community/tailwindcss-module
  */
  tailwindcss: {},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  // serverMiddleware: [
  //   '~/api/index'
  // ],

  // server: {
  //   port: process.env.NODE_ENV !== 'production' ? 3000 : 80,
  //   host: process.env.NODE_ENV !== 'production' ? 'localhost' : process.env.BASE_URL
  // },

  telemetry: false

}
