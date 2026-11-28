import type { SvgComponent } from "astro/types"
import Email from "@/assets/icons/email.svg"
import GitHub from "@/assets/icons/github.svg"
import RSS from "@/assets/icons/rss.svg"
import Twitter from "@/assets/icons/twitter.svg"

export const SITE = {
  title: "Vanam Erudite",
  description: "An open-source Astro portfolio, blog, and gallery.",
  locale: "en-US",
  dir: "ltr",
  defaultPageImage: "/static/opengraph-image.png",
  defaultPostImage: "/static/1200x630.png",
} as const

export const TEMPLATE = {
  showcase: true,
  title: "Astro Portfolio Template for Developers",
  description:
    "An open-source Astro website template for developer portfolios, personal blogs, project showcases, and photo galleries.",
  repository: "https://github.com/vanam-san/vanam-erudite",
}

export const HERO = {
  name: "Your Name",
  title: "Your Title",
  bio: "A short bio about yourself. Tell visitors what you do and what you're passionate about.",
} as const

export const NAVIGATION = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/projects", label: "Projects" },
  { href: "/playground", label: "Playground" },
]

export const SOCIALS: { href: string; label: string; icon: SvgComponent }[] = [
  { href: "https://github.com/yourusername", label: "GitHub", icon: GitHub },
  { href: "https://twitter.com/yourusername", label: "Twitter", icon: Twitter },
  { href: "mailto:your@email.com", label: "Email", icon: Email },
  { href: "/rss.xml", label: "RSS", icon: RSS },
]

export const UMAMI = {
  websiteId: import.meta.env.UMAMI_WEBSITE_ID || "",
  host: import.meta.env.UMAMI_HOST || "cloud.umami.is",
}

export const GISCUS = {
  repo: import.meta.env.GISCUS_REPO || "",
  repoId: import.meta.env.GISCUS_REPO_ID || "",
  category: import.meta.env.GISCUS_CATEGORY || "Comments",
  categoryId: import.meta.env.GISCUS_CATEGORY_ID || "",
}
