import {
  IMAGE_OF_ME,
  SCHEMA_PERSON_SAME_AS,
  SEO_DESCRIPTION_DEFAULT,
  SEO_TITLE_DEFAULT,
} from "./utils/constants";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: SEO_TITLE_DEFAULT,
      titleTemplate: "%s",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "author", content: "Yosef Yudha Wijaya" },
        { name: "description", content: SEO_DESCRIPTION_DEFAULT },
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
    "@nuxtjs/google-fonts",
    "@nuxt/ui",
    "@storyblok/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
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

  css: ["~/assets/css/main.css"],

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
  },

  icon: {
    serverBundle: false,
  },

  colorMode: {
    preference: "light",
    fallback: "light",
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
      name: "Yosef Yudha Wijaya",
      description: SEO_DESCRIPTION_DEFAULT,
      url: process.env.NUXT_PUBLIC_BASE_URL,
      image: IMAGE_OF_ME,
      sameAs: SCHEMA_PERSON_SAME_AS,
      jobTitle: "Frontend Architect",
      knowsAbout: [
        "Vue.js",
        "Nuxt.js",
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Web3",
        "Laravel",
        "WordPress",
        "Tailwind CSS",
        "Frontend Architecture",
        "Web Development",
      ],
      knowsLanguage: ["id-ID", "en-GB"],
      worksFor: [
        {
          type: "Organization",
          name: "Undercurrent Capital Pte Ltd",
          url: "https://undercurrentcapital.com",
        },
        {
          type: "Organization",
          name: "PT Kompas Media Nusantara",
          url: "https://kompas.id",
        },
      ],
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
    provider: "storyblok",
    storyblok: {
      baseURL: "https://a.storyblok.com",
    },
  },

  imports: {
    dirs: ["./stores"],
  },

  robots: {
    blockAiBots: false,
    blockNonSeoBots: true,
  },

  // Security headers
  nitro: {
    routeRules: {
      "/api/storyblok/**": {
        cors: false,
        headers: {
          "Access-Control-Allow-Origin": "",
        },
      },
      "/**": {
        headers: {
          "X-Frame-Options": "DENY",
          "X-Content-Type-Options": "nosniff",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "X-XSS-Protection": "1; mode=block",
          "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
          "Content-Security-Policy": [
            "default-src 'self'",
            `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${(process.env.NUXT_CSP_SCRIPT_SRC || "").split(",").join(" ")}`.trim(),
            `style-src 'self' 'unsafe-inline' ${(process.env.NUXT_CSP_STYLE_SRC || "").split(",").join(" ")}`.trim(),
            `img-src 'self' data: ${(process.env.NUXT_CSP_IMG_SRC || "").split(",").join(" ")}`.trim(),
            `font-src 'self' data: ${(process.env.NUXT_CSP_FONT_SRC || "").split(",").join(" ")}`.trim(),
            `connect-src 'self' ${(process.env.NUXT_CSP_CONNECT_SRC || "").split(",").join(" ")}`.trim(),
            `frame-src 'self' ${(process.env.NUXT_CSP_FRAME_SRC || "").split(",").join(" ")}`.trim(),
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self'",
          ].join("; "),
        },
      },
    },
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
