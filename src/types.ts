export type Site = {
  title: string
  description: string
  href: string
  author: string
  heroBio: string
  locale: string
  featuredPostCount: number
  postsPerPage: number
}

export type SocialLink = {
  href: string
  label: string
}

export type IconLabel =
  | 'Website'
  | 'GitHub'
  | 'LinkedIn'
  | 'Twitter'
  | 'Instagram'
  | 'Mastodon'
  | 'Bluesky'
  | 'Email'
  | 'RSS'

export type IconMap = {
  [K in IconLabel]: string
}
