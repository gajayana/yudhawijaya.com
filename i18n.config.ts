export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'id',
  locale: 'id',
  messages: {
    en: {
      layouts: {
        title: SEO_TITLE_DEFAULT
      },
      loading: 'Loading...'
    },
    id: {
      layouts: {
        title: SEO_TITLE_DEFAULT
      },
      loading: 'Memuat data...'
    }
  }
}))
