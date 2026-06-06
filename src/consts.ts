import type { IconMap, SocialLink, Site } from '@/types'

export const SITE: Site = {
  title: 'vanam-erudite',
  description:
    'A personal portfolio and blog built with Astro, Tailwind, and shadcn/ui.',
  href: 'https://vanam-erudite.vercel.app',
  author: 'Your Name',
  heroBio:
    'Full-stack developer and open-source enthusiast with a passion for building elegant solutions to complex problems. When not writing code, you will find me exploring new technologies, contributing to community projects, or sharing knowledge through technical writing. I believe in building tools that empower others and making the web a better, more accessible place for everyone.',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 6,
}

// Umami Analytics
// Configure via environment variables: PUBLIC_UMAMI_WEBSITE_ID, PUBLIC_UMAMI_HOST
export const UMAMI = {
  websiteId: import.meta.env.PUBLIC_UMAMI_WEBSITE_ID || '',
  host: import.meta.env.PUBLIC_UMAMI_HOST || 'cloud.umami.is',
}

// Giscus Comments
// Configure via environment variables: PUBLIC_GISCUS_REPO, PUBLIC_GISCUS_REPO_ID, etc.
// Get values from https://giscus.app after enabling Discussions on your repo
export const GISCUS = {
  repo: import.meta.env.PUBLIC_GISCUS_REPO || '',
  repoId: import.meta.env.PUBLIC_GISCUS_REPO_ID || '',
  category: import.meta.env.PUBLIC_GISCUS_CATEGORY || 'Comments',
  categoryId: import.meta.env.PUBLIC_GISCUS_CATEGORY_ID || '',
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/about',
    label: 'about',
  },
  {
    href: '/blog',
    label: 'blog',
  },
  // Gallery link - uncomment when gallery has sufficient content
  // {
  //   href: '/gallery',
  //   label: 'gallery',
  // },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/your-username',
    label: 'GitHub',
  },
  {
    href: 'https://linkedin.com/in/your-handle',
    label: 'LinkedIn',
  },
  {
    href: 'https://twitter.com/your-handle',
    label: 'Twitter',
  },
  {
    href: 'https://instagram.com/your-handle',
    label: 'Instagram',
  },
  {
    href: 'https://mastodon.social/@your-handle',
    label: 'Mastodon',
  },
  {
    href: 'https://bsky.app/profile/handle.bsky.social',
    label: 'Bluesky',
  },
  {
    href: 'mailto:you@example.com',
    label: 'Email',
  },
  {
    href: '/rss.xml',
    label: 'RSS',
  },
]

export const ICON_MAP: IconMap = {
  Website: 'simple-icons:html5',
  GitHub: 'simple-icons:github',
  LinkedIn: 'simple-icons:linkedin',
  Twitter: 'simple-icons:twitter',
  Instagram: 'simple-icons:instagram',
  Mastodon: 'simple-icons:mastodon',
  Bluesky: 'simple-icons:bluesky',
  Email: 'simple-icons:maildotru',
  RSS: 'simple-icons:rss',
}
