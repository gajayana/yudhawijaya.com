interface StoryblokImageParams {
  // blur?: number;
  // grayscale?:boolean;
  filters?: string[];
  url: string;
  height: number;
  smart?:boolean;
  width: number;
}

interface seoParams {
  canonical?:string;
  description: string;
  image?: string;
  keywords?: string;
  title?:string;
  type?:string;
  url?:string;
}

interface seoResult {
  meta: {
    name: string;
    content: string;
  }[];
  title: string;
  link: {
    rel: string;
    href: string;
  }[]
}

const storyblokImage = ({ filters = [], url, height, smart, width }:StoryblokImageParams):string => {
  const params = ['m', `${width}x${height}`]

  if (smart) { params.push('smart') }
  if (filters && Array.isArray(filters) && filters.length) { params.push(`filters:${filters.join(':')}`) }

  return `${url}/${params.join('/')}`
}

const seo = ({ canonical, description, image, keywords, title, type, url }: seoParams):seoResult => {
  const runtimeConfig = useRuntimeConfig()

  const meta = [
    { name: 'description', content: description },
    { name: 'keywords', content: keywords || '' },
    { name: 'og:description', content: description },
    { name: 'og:image', content: image || '' },
    { name: 'og:title', content: title || SEO_TITLE_DEFAULT },
    { name: 'og:url', content: url || runtimeConfig.public.baseUrl as string }
  ]

  if (type) {
    meta.push({ name: 'og:type', content: type || '' })
  }

  return {
    meta,
    title: title || SEO_TITLE_DEFAULT,
    link: [
      { rel: 'canonical', href: canonical || runtimeConfig.public.baseUrl as string }
    ]
  }
}

export {
  seo,
  storyblokImage
}
