const DATETIME_FORMAT_DEFAULT = "dd MMMM yyyy";
const IMAGE_OF_ME = "https://a.storyblok.com/f/76789/96x96/83851cc667/me.jpeg";
const SEO_TITLE_DEFAULT = "Yosef Yudha Wijaya";
const SOCIAL_ACCOUNTS: SocialAccount[] = [
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
];
const SCHEMA_PERSON_SAME_AS: string[] = SOCIAL_ACCOUNTS.map(
  (account) => account.url
);

const LOCALES = ["en", "id"];
const DEFAULT_LOCALE = "id";

export {
  DATETIME_FORMAT_DEFAULT,
  DEFAULT_LOCALE,
  IMAGE_OF_ME,
  LOCALES,
  SCHEMA_PERSON_SAME_AS,
  SEO_TITLE_DEFAULT,
  SOCIAL_ACCOUNTS,
};
