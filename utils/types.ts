type SocialAccount = {
  icon: string;
  medium: string;
  url: string;
}

interface StoryblokSpace {
  space: {
    id: number;
    name: string;
    domain: string;
    version: number,
    language_codes: string[]
  }
}

interface StoryblokStory {
  name: string;
  created_at: string;
  published_at: string;
  id: number;
  uuid: string;
  content: {
    _uid: string;
    // sizes: StoryblokTable;
    // images: StoryblokImage[]
    // component: string;
    // description: ISbRichtext;
    // discount_idr: string;
    // original_price_idr: string;
    // displayed_price_idr: string;
    // shopee?: StoryblokLink;
    // tokopedia?: StoryblokLink;
  },
  slug: string;
  full_slug: string;
  sort_by_date: any | null;
  position: number;
  tag_list: any;
  is_startpage: boolean;
  parent_id: number;
  meta_data: any | null;
  group_id: string;
  first_published_at: string;
  release_id: any | null;
  lang: string;
  path: any | null;
  alternates: any;
  default_full_slug: any | null;
  translated_slugs: any | null;
}


type StoryblokStoryResponse = {
  story: StoryblokStory;
  cv: number;
  rels: any;
  links: any;
}

export type {
  SocialAccount,
  StoryblokSpace,
  StoryblokStory,
  StoryblokStoryResponse
}