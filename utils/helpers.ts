interface StoryblokImageParams {
  filters?: string[];
  url: string;
  height: number;
  smart?: boolean;
  width: number;
}

interface SeoParams {
  canonical?: string;
  description: string;
  image?: string;
  keywords?: string;
  title?: string;
  type?: string;
  url?: string;
}

interface SeoResult {
  meta: {
    name: string;
    content: string;
  }[];
  title: string;
  link: {
    rel: string;
    href: string;
  }[];
}

/**
 * Generates a Storyblok image URL with specified parameters
 * @param params - Image parameters including dimensions and filters
 * @returns Formatted image URL string
 */
export const storyblokImage = ({
  filters = [],
  url,
  height,
  smart,
  width,
}: StoryblokImageParams): string => {
  // Pre-allocate array size for better performance
  const params = new Array(filters.length + 2);
  params[0] = "m";
  params[1] = `${width}x${height}`;

  let paramIndex = 2;

  if (smart) {
    params[paramIndex++] = "smart";
  }

  if (filters.length) {
    params[paramIndex] = `filters:${filters.join(":")}`;
  }

  // Use slice to only include used array elements
  return `${url}/${params.slice(0, paramIndex + 1).join("/")}`;
};

/**
 * Generates SEO metadata for a page
 * @param params - SEO parameters including title, description etc
 * @returns Object containing meta tags, title and canonical link
 */
export const seo = ({
  canonical,
  description,
  image = "",
  keywords = "",
  title,
  type,
  url,
}: SeoParams): SeoResult => {
  const runtimeConfig = useRuntimeConfig();
  const baseUrl = runtimeConfig.public.baseUrl as string;
  const pageUrl = url || baseUrl;
  const pageTitle = title || SEO_TITLE_DEFAULT;

  // Pre-allocate meta array size
  const meta = [
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "og:description", content: description },
    { name: "og:image", content: image },
    { name: "og:title", content: pageTitle },
    { name: "og:url", content: pageUrl },
  ];

  if (type) {
    meta.push({ name: "og:type", content: type });
  }

  return {
    meta,
    title: pageTitle,
    link: [
      {
        rel: "canonical",
        href: canonical || baseUrl,
      },
    ],
  };
};
