/**
 * Application-wide constants and configuration values
 */

// Date formatting
export const DATETIME_FORMAT_DEFAULT = "dd MMMM yyyy" as const;

// User profile
export const IMAGE_OF_ME =
  "https://a.storyblok.com/f/76789/96x96/83851cc667/me.jpeg" as const;
export const SEO_TITLE_DEFAULT = "Yosef Yudha Wijaya" as const;

// Social media accounts configuration
export const SOCIAL_ACCOUNTS = Object.freeze([
  {
    icon: "mdi:twitter",
    medium: "twitter",
    url: "https://twitter.com/tuan_yudha",
  },
  {
    icon: "mdi:linkedin",
    medium: "linkedin",
    url: "https://www.linkedin.com/in/yudhawijaya",
  },
  {
    icon: "mdi:gitlab",
    medium: "gitlab",
    url: "https://gitlab.com/gajayana",
  },
  {
    icon: "mdi:github",
    medium: "github",
    url: "https://github.com/gajayana",
  },
] as const) satisfies readonly SocialAccount[];

// Pre-compute schema URLs
export const SCHEMA_PERSON_SAME_AS = Object.freeze(
  SOCIAL_ACCOUNTS.map((account) => account.url)
) as readonly string[];

// Localization
export const LOCALES = Object.freeze(["en", "id"]) as readonly string[];
export const DEFAULT_LOCALE = "id" as const;
