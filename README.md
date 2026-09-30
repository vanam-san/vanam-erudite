# vanam-erudite

A personal portfolio and blog built with [Astro](https://astro.build/), based on the [astro-erudite](https://github.com/jktrn/astro-erudite) theme.

## Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js ≥ 22
- The search index is built with [Pagefind](https://pagefind.app/) during `bun run build` — no account or API key needed. (Must install with Bun: `package-lock.json` is stale and lacks Pagefind.)

## Quick Start

```bash
git clone https://github.com/vanam-san/vanam-erudite.git
cd vanam-erudite
bun install
bun run dev
```

Visit `http://localhost:4321`. Search (⌘K) falls back to a title index in dev; full-text search works in production builds where Pagefind has indexed `dist/`.

---

## Customize in 7 Steps

### 1. Site identity — `src/consts.ts`

```ts
export const SITE = {
  title: "Your Site Title",
  description: "A personal blog and portfolio built with Astro.",
  locale: "en-US",
  dir: "ltr",
  defaultPageImage: "/static/opengraph-image.png",
  defaultPostImage: "/static/1200x630.png",
} as const

export const HERO = {
  name: "Your Name",
  title: "Your Title",
  bio: "A short bio about yourself.",
} as const

export const NAVIGATION = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/projects", label: "Projects" },
  { href: "/playground", label: "Playground" },
]

export const SOCIALS = [
  { href: "https://github.com/yourusername", label: "GitHub", icon: GitHub },
  { href: "https://twitter.com/yourusername", label: "Twitter", icon: Twitter },
  { href: "mailto:your@email.com", label: "Email", icon: Email },
  { href: "/rss.xml", label: "RSS", icon: RSS },
]
```

`HERO` drives the homepage who/intro tiles. `NAVIGATION` renders the sidebar on desktop and the dropdown menu on mobile (Home is added automatically). Also set `site:` in `astro.config.ts` to your production domain — it feeds canonical URLs, sitemap, RSS, and social cards.

### 2. Images — `public/static/`

- `avatar.svg` — homepage avatar placeholder (replace with your square photo, ~500px)
- `opengraph-image.png` / `1200x630.png` / `twitter-card.png` — social cards
- `logo.png` / `logo.svg` — sidebar brand mark (or edit `src/assets/logo.svg`)
- Favicons + `site.webmanifest` at `public/` root

### 3. Authors — `src/content/authors/`

One file per author (id = filename). Referenced from posts via `authors: ['id']`:

```yaml
---
name: 'Your Name'
pronouns: 'he/him'
avatar: 'https://avatars.githubusercontent.com/u/...' # or '/static/you.png'
bio: 'Your bio'
mail: 'your@email.com'
socials:
  github: 'https://github.com/you'
---
```

### 4. Blog posts — `src/content/blog/`

Create a folder per post with an `index.md` (co-locate images next to it). Nested `subpost.md` files become series parts:

```yaml
---
title: 'Your Post Title'
description: 'A brief description'
date: 2026-01-01
authors: ['author-id']
tags: ['tag1', 'tag2']
image: './cover.png' # optional
pinned: false # optional, pins to top of /blog
draft: false # optional
---

Your content here.
```

Markdown supports callouts (`:::note` / `tip` / `warning` / `caution` / `important`), math, and collapsible/annotated code blocks.

### 5. Galleries — `src/content/gallery/`

Folder per gallery with images and an `index.md`:

```yaml
---
title: 'Gallery Title'
description: 'Description'
date: 2026-01-01
cover: './cover.jpg'
photos:
  - './photo1.jpg'
  - './photo2.jpg'
---

Optional gallery description.
```

Galleries get listing cards, detail pages with lightbox, and the 3 most recent appear on the homepage photography tile.

### 6. Projects — `src/content/projects/`

One markdown file per project (`link` is required):

```yaml
---
name: 'Project Name'
description: 'Description'
link: 'https://github.com/you/project'
tags: ['TypeScript', 'React']
startDate: 2024-01-01
endDate: 2024-06-01 # optional
---
```

The 3 most recent (by `startDate`) appear on the homepage projects tile.

### 7. Optional services — `.env`

All optional; copy from `.env.example`. The site works fully without them:

```env
PUBLIC_UMAMI_WEBSITE_ID=
PUBLIC_UMAMI_HOST=cloud.umami.is
PUBLIC_GISCUS_REPO=
PUBLIC_GISCUS_REPO_ID=
PUBLIC_GISCUS_CATEGORY=Comments
PUBLIC_GISCUS_CATEGORY_ID=
```

- **Umami** — cookieless analytics; script only loads when the website ID is set.
- **Giscus** — GitHub Discussions comments on posts; needs repo + category IDs from [giscus.app](https://giscus.app).

---

## What's Included

- **Editorial bento homepage** — who/intro/latest-post/blog/projects/photography tiles plus a live time + weather tile (wttr.in, no key, 8s timeout with graceful fallback)
- **Command palette** (⌘K / Ctrl+K, `/` to focus) — full-text [Pagefind](https://pagefind.app/) search in production, title-index fallback in dev
- **Keyboard shortcuts** — press `?` anywhere for the shortcut dialog
- **Circuit backdrop** — animated PCB traces (desktop only), paper grain + theme-aware wash on all screens
- **Designed 404** — bento-style error page, excluded from the search index
- **Gallery system** — collections with lightbox, keyboard nav, auto tag pages
- **Unified tags** — cross-collection (`/tags`) spanning blog, gallery, projects
- **Giscus + Umami** — optional, zero-config-when-absent integrations
- **Ocean Depths theme** — cyan/lume accents, glow tokens, `light-dark()` auto light/dark mode
- **Typography** — Fraunces display, IBM Plex Sans body, IBM Plex Mono meta

## Commands

| Command               | Description                                    |
| --------------------- | ---------------------------------------------- |
| `bun run dev`         | Start development server                       |
| `bun run build`       | Typecheck + build + index search (`postbuild`) |
| `bun run preview`     | Preview production build                       |
| `bun run format`      | Format code with Biome                         |
| `bun run format:check`| Check formatting without writing               |

`bun run build` runs `astro check && astro build && pagefind --site dist`. The `/pagefind` bundle is generated into `dist/` — any static host serves it, nothing extra to deploy.

## Deployment

```bash
bun run build
```

Deploy `dist/` to Vercel, Netlify, Cloudflare Pages, or any static host. Two things to set first:

1. `site:` in `astro.config.ts` → your production domain (canonicals/sitemap/RSS depend on it).
2. Serve over HTTPS if you use analytics/comments third parties — no other server requirements.

## Troubleshooting

| Symptom | Cause / fix |
| ------- | ----------- |
| `pagefind: command not found` on build | Installed with npm (stale lockfile) — use `bun install` |
| Search shows only titles in dev | Expected — full-text index exists only in `dist/` after build |
| Weather tile stuck at `--°C` | wttr.in unreachable/blocked; tile degrades gracefully, no action needed |
| Port already in use | `bun run dev -- --port 4322` |
| Fonts look wrong | Display font (Fraunces) loads from Google Fonts; needs network on first paint, then caches |

---

## Credits

- [astro-erudite](https://github.com/jktrn/astro-erudite) by [@jktrn](https://github.com/jktrn) — base theme
- [merox.dev](https://github.com/meroxdotdev) by Robert Melcher — design inspiration
- [Frontend Design](https://agenticskills.io/skills/frontend-design) — frontend design patterns
- [Theme Factory](https://github.com/anthropics/skills/tree/main/skills/theme-factory) — theme system reference

---

## License

[MIT](LICENSE)
