interface StoryblokImageParams {
  blur?: number;
  grayscale?:boolean;
  url: string;
  height: number;
  width: number;
}

interface seoParams {
  description: string;
  image?: string;
  keywords?: string;
  title?:string;
  type?:string;
  url?:string;
}

interface seoResult {
  meta: {
    hid: string;
    name: string;
    content: string;
  }[];
  title: string;
}

const storyblokImage = ({blur = 0, url, grayscale = false, height, width}:StoryblokImageParams):string => {
  const filters:string[] = []

  if (blur > 0) filters.push(`blur(${blur})`)
  if (grayscale) filters.push('grayscale()')
  
  return `${url}/m/${width}x${height}${filters.length ? '/filters:' + filters.join(':') : ''}`;
}

const seo = <seoResult>({description, image, keywords, title, type, url}: seoParams) => {
  return {
    meta: [
      { hid: 'description', name: 'description', content: description },
      { hid: 'keywords', name: 'keywords', content: keywords || '' },
      { hid: 'og:description', name: 'og:description', content: description },
      { hid: 'og:image', name: 'og:image', content: image || '' },
      { hid: 'og:title', name: 'og:title', content: title || SEO_TITLE_DEFAULT },
      { hid: 'og:type', name: 'og:type', content: '' },
      { hid: 'og:url', name: 'og:url', content: url || 'https://yudhawijaya.com' },
    ],
    title: title || SEO_TITLE_DEFAULT
  }
}

export {
  seo,
  storyblokImage
}