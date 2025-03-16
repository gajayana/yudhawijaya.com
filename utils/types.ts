// Notification types
export type ToastNotificationType = "error" | "success" | "warning";

export type ToastNotification = Readonly<{
  type: ToastNotificationType;
  message: string;
}>;

// Social media types
export type SocialAccount = Readonly<{
  icon: string;
  medium: string;
  url: string;
}>;

// Storyblok types
export type StoryblokImage = Readonly<{
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: string;
}>;

export type StoryblokSpace = Readonly<{
  space: {
    id: number;
    name: string;
    domain: string;
    version: number;
    language_codes: readonly string[];
  };
}>;

export type StoryblokContent = Readonly<{
  _uid: string;
  body?: string;
  body_rich?: unknown;
  component?: string;
  date_end?: string;
  date_start?: string;
  excerpt?: string;
  is_featured?: boolean;
  featured_image?: StoryblokImage;
  title?: string;
  url?: string;
  url_is_invalid?: boolean;
}>;

export type StoryblokStory = Readonly<{
  name: string;
  created_at: string;
  published_at: string;
  id: number;
  uuid: string;
  content: StoryblokContent;
  slug: string;
  full_slug: string;
  sort_by_date: unknown | null;
  position: number;
  tag_list: readonly string[];
  is_startpage: boolean;
  parent_id: number;
  meta_data: unknown | null;
  group_id: string;
  first_published_at: string;
  release_id: unknown | null;
  lang: string;
  path: unknown | null;
  alternates: unknown;
  default_full_slug: unknown | null;
  translated_slugs: unknown | null;
}>;

export type StoryblokStoriesResponse = Readonly<{
  story?: StoryblokStory;
  stories?: readonly StoryblokStory[];
  cv: number;
  rels: unknown;
  links: unknown;
}>;
