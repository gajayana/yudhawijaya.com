type SocialAccount = {
  icon: string;
  medium: string;
  url: string;
}

interface StoryblokImage {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: string;
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
    body?: string;
    component?: string; 
    date_end?: string;
    date_start?: string;
    excerpt?:string;
    is_featured?:boolean;
    featured_image?: StoryblokImage;
    title?: string;
    url?: string;
    url_is_invalid?:boolean
  },
  slug: string;
  full_slug: string;
  sort_by_date: any | null;
  position: number;
  tag_list: string[];
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


type StoryblokStoriesResponse = {
  story?: StoryblokStory;
  stories?: StoryblokStory[];
  cv: number;
  rels: any;
  links: any;
}

export type {
  SocialAccount,
  StoryblokSpace,
  StoryblokStory,
  StoryblokStoriesResponse
}