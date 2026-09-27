---
title: 'Setup and Customize This Theme'
description: 'A step-by-step guide to setting up and personalizing the astro-erudite theme for your own portfolio.'
date: 2026-07-30
authors: ['vanam']
tags: ['setup', 'astro', 'guide']
pinned: true
---

This guide walks you through setting up and customizing this Astro theme for your own use.

## Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js ≥ 22

## Installation

```bash
git clone https://github.com/vanam-san/vanam-erudite2.git
cd vanam-erudite2
bun install
```

Start the dev server:

```bash
bun run dev
```

Visit `http://localhost:4321`. Press `⌘K` (or `/`) any time to try the command palette — in dev it searches titles; production builds get full-text search via a Pagefind index generated at build time.

## Configuration

Edit `src/consts.ts` to personalize your site:

```typescript
export const SITE = {
  title: "Your Site",
  description: "Your description.",
  locale: "en-US",
  dir: "ltr",
  defaultPageImage: "/static/opengraph-image.png",
  defaultPostImage: "/static/1200x630.png",
}

export const HERO = {
  name: "Your Name",
  title: "Your Title",
  bio: "Short bio about yourself.",
}

export const NAVIGATION = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/projects", label: "Projects" },
]

export const SOCIALS = [
  { href: "https://github.com/yourusername", label: "GitHub", icon: GitHub },
  { href: "https://twitter.com/yourusername", label: "Twitter", icon: Twitter },
  { href: "mailto:your@email.com", label: "Email", icon: Email },
  { href: "/rss.xml", label: "RSS", icon: RSS },
]
```

`HERO` drives the homepage who/intro tiles. `NAVIGATION` renders the sidebar (Home is added automatically). Also set `site:` in `astro.config.ts` to your production domain — canonical URLs, sitemap, and RSS depend on it.

## Images

Replace the placeholders in `public/static/`:

- `avatar.svg` — homepage avatar placeholder (replace with your square photo, ~500px)
- `opengraph-image.png`, `1200x630.png`, `twitter-card.png` — social cards
- `logo.png` / `logo.svg` — sidebar brand mark (or edit `src/assets/logo.svg`)

## Adding Content

### Blog Posts

Create a folder in `src/content/blog/` with an `index.md`:

```markdown
---
title: 'My Post'
description: 'Post description'
date: 2026-01-01
authors: ['your-author-id']
tags: ['tag1', 'tag2']
draft: false
---

Your content here.
```

### Projects

Create markdown files in `src/content/projects/`:

```markdown
---
name: 'Project Name'
description: 'Description'
link: 'https://github.com/you/project'
tags: ['TypeScript', 'React']
startDate: 2024-01-01
endDate: 2024-06-01
draft: false
---
```

### Galleries

Create a folder in `src/content/gallery/` with images and an `index.md`:

```markdown
---
title: 'Gallery Title'
description: 'Description'
date: 2026-01-01
cover: './cover.jpg'
photos:
  - './photo1.jpg'
  - './photo2.jpg'
draft: false
---
```

### Authors

Create files in `src/content/authors/`:

```markdown
---
name: 'Your Name'
avatar: 'https://avatars.githubusercontent.com/u/...'
bio: 'Your bio'
socials:
  github: 'https://github.com/you'
---
```

`avatar` accepts a full URL or a `/static/...` path. `pronouns`, `mail`, and `bio` are optional.

## Environment Variables

Copy `.env.example` to `.env` and fill in (all optional — the site works without them):

- `PUBLIC_UMAMI_WEBSITE_ID` (+ `PUBLIC_UMAMI_HOST`, defaults to `cloud.umami.is`) — Umami analytics
- `PUBLIC_GISCUS_REPO`, `PUBLIC_GISCUS_REPO_ID`, `PUBLIC_GISCUS_CATEGORY`, `PUBLIC_GISCUS_CATEGORY_ID` — Giscus comments (values from [giscus.app](https://giscus.app))

## Deployment

Build and deploy to your preferred platform:

```bash
bun run build
```

The output is in `dist/`. Deploy to Vercel, Netlify, Cloudflare Pages, or any static host — the Pagefind search bundle is generated into `dist/pagefind/`, nothing extra to configure. Set `site:` in `astro.config.ts` to your production domain first.
