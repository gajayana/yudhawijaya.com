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

const storyblokImage = ({blur = 0, url, grayscale = false, height, width}:StoryblokImageParams):string => {
  const filters:string[] = []

  if (blur > 0) filters.push(`blur(${blur})`)
  if (grayscale) filters.push('grayscale()')
  
  return `${url}/m/${width}x${height}${filters.length ? '/filters:' + filters.join(':') : ''}`;
}

const seo = <seoResult>({canonical, description, image, keywords, title, type, url}: seoParams) => {
  const runtimeConfig = useRuntimeConfig()
  return {
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords || '' },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image || '' },
      { name: 'og:title', content: title || SEO_TITLE_DEFAULT },
      { name: 'og:type', content: '' },
      { name: 'og:url', content: url || runtimeConfig.baseUrl },
    ],
    title: title || SEO_TITLE_DEFAULT,
    link: [
      {rel: 'canonical', href: canonical || runtimeConfig.baseUrl }
    ] 
  }
}

export {
  seo,
  storyblokImage
}