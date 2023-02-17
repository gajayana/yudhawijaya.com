import { SocialAccount } from "~~/utils/types"

const IMAGE_OF_ME = 'https://a.storyblok.com/f/76789/96x96/83851cc667/me.jpeg'

const SEO_TITLE_DEFAULT = 'Yosef Yudha Wijaya'

const SOCIAL_ACCOUNTS:SocialAccount[] = [
  {
    icon: 'mdi:twitter',
    medium: 'twitter',
    url: 'https://twitter.com/tuan_yudha'
  },
  {
    icon: 'mdi:linkedin',
    medium: 'linkedin',
    url: 'https://www.linkedin.com/in/yudhawijaya'
  },
  {
    icon: 'mdi:gitlab',
    medium: 'gitlab',
    url: 'https://gitlab.com/gajayana'
  },
  {
    icon: 'mdi:github',
    medium: 'github',
    url: 'https://github.com/gajayana'
  },
]



export {
  IMAGE_OF_ME,
  SEO_TITLE_DEFAULT,
  SOCIAL_ACCOUNTS
}