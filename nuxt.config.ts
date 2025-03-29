import {
  IMAGE_OF_ME,
  SCHEMA_PERSON_SAME_AS,
  SEO_TITLE_DEFAULT,
} from "./utils/constants";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: SEO_TITLE_DEFAULT,
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "Yosef Yudha Wijaya" },
        { name: "description", content: "" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:creator", content: "@tuan_yudha" },
        { name: "twitter:site", content: "@tuan_yudha" },
        {
          name: "og:site_name",
          content: "Yosef Yudha Wijaya",
          property: "og:site_name",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      appName: process.env.NUXT_PUBLIC_APP_NAME,
    },
  },

  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@storyblok/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "nuxt-lodash",
    "@nuxtjs/mdc",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/seo",
  ],
  googleFonts: {
    // https://google-fonts.nuxtjs.org/
    download: true,
    families: {
      Roboto: {
        wght: [300, 400, 500, 700],
        ital: [],
      },
      "Open Sans": {
        wght: [400, 500, 700],
        ital: [400],
      },
    },
    // overwriting: false
  },
  i18n: {
    // See https://i18n.nuxtjs.org/
    vueI18n: "i18n.config.ts",
    baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    defaultLocale: "id",
    locales: [
      {
        code: "en",
        language: "en-GB",
      },
      {
        code: "id",
        language: "id-ID",
      },
    ],
    lazy: false,
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  icon: {
    serverBundle: false,
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

  schemaOrg: {
    identity: {
      type: "Person",
      image: IMAGE_OF_ME,
      name: process.env.NUXT_PUBLIC_APP_NAME ?? "",
      sameAs: SCHEMA_PERSON_SAME_AS,
    },
  },

  site: {
    // https://nuxtseo.com/sitemap/getting-started/installation
    url: process.env.NUXT_PUBLIC_BASE_URL,
    name: process.env.NUXT_PUBLIC_APP_NAME,
  },

  sitemap: {
    // path: '/sitemap.xml',
    // hostname: process.env.NUXT_PUBLIC_BASE_URL,
    // gzip: true,
    sources: ["/api/__sitemap__/urls"],
  },

  // https://nuxt.com/modules/storyblok
  storyblok: {
    accessToken: process.env.NUXT_STORYBLOK_ACCESS_TOKEN,
  },

  // image: {
  //   domains: ["a.storyblok.com"],

  // },
  image: {
    storyblok: {
      baseURL: "https://a.storyblok.com",
    },
  },

  imports: {
    dirs: ["./stores"],
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: "bundler",
      },
    },
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
      exclude: ["fsevents"],
    },
  },

  compatibilityDate: "2024-08-31",
});
