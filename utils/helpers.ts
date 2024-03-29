interface StoryblokImageParams {
  blur?: number;
  grayscale?:boolean;
  url: string;
  height: number;
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

const storyblokImage = ({ blur = 0, url, grayscale = false, height, width }:StoryblokImageParams):string => {
  const filters:string[] = []

  if (blur > 0) { filters.push(`blur(${blur})`) }
  if (grayscale) { filters.push('grayscale()') }

  return `${url}/m/${width}x${height}${filters.length ? '/filters:' + filters.join(':') : ''}`
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
