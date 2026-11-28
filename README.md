# vanam-erudite

An open-source developer portfolio website template built with [Astro](https://astro.build/), based on the [astro-erudite](https://github.com/jktrn/astro-erudite) theme.

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

`HERO` drives the homepage introduction. `NAVIGATION` renders the shared top navigation and the dropdown menu on mobile (Home is added automatically). Also set `site:` in `astro.config.ts` to your production domain — it feeds canonical URLs, sitemap, RSS, and social cards. Set `TEMPLATE.showcase` to `false` if you are using this for your own portfolio. This removes the template promotion and its homepage metadata.

### 2. Images — `public/static/`

- `avatar.svg` — homepage avatar placeholder (replace with your square photo, ~500px)
- `opengraph-image.png` / `1200x630.png` / `twitter-card.png` — social cards
- `logo.png` / `logo.svg` — header brand mark (or edit `src/assets/logo.svg`)
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

Galleries get listing cards, detail pages with lightbox, and the 3 most recent appear on the homepage photography section.

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

The 3 most recent (by `startDate`) appear on the homepage projects section.

### 7. Optional services — `.env`

All optional; copy from `.env.example`. The site works fully without them:

```env
UMAMI_WEBSITE_ID=
UMAMI_HOST=cloud.umami.is
GISCUS_REPO=
GISCUS_REPO_ID=
GISCUS_CATEGORY=Comments
GISCUS_CATEGORY_ID=
```

- **Umami** — cookieless analytics; script only loads when the website ID is set.
- **Giscus** — GitHub Discussions comments on posts; needs repo + category IDs from [giscus.app](https://giscus.app).

---

## What's Included

- **Editorial homepage** — a portrait and introduction, featured writing, projects, and photography, plus a live time + weather tile (wttr.in, no key, 8s timeout with graceful fallback)
- **Command palette** (⌘K / Ctrl+K, `/` to focus) — full-text [Pagefind](https://pagefind.app/) search in production, title-index fallback in dev
- **Keyboard shortcuts** — press `?` anywhere for the shortcut dialog
- **Circuit backdrop** — blurred sine and cosine waves in the upper half of every page, with animated PCB traces on desktop. Reduced-motion preferences pause both effects
- **Designed 404** — bento-style error page, excluded from the search index
- **Gallery system** — collections with lightbox, keyboard nav, auto tag pages
- **Unified tags** — cross-collection (`/tags`) spanning blog, gallery, projects
- **Giscus + Umami** — optional, zero-config-when-absent integrations
- **Ocean Depths theme** — cyan/lume accents, glow tokens, `light-dark()` auto light/dark mode
- **Theme menu** — 8 palettes (Ocean Depths and 7 [HANCORE-linux Omarchy themes](https://github.com/HANCORE-linux/HANCORE-linux/blob/main/THEMES.md)); see [Themes](#themes)
- **Typography** — Space Grotesk display, Inter body, JetBrains Mono meta

## Themes

Click the palette icon in the header to open the theme menu. Each entry shows a color dot (the palette accent), the theme name, and a tick marking the selected theme. The menu opens below the trigger and aligns with its end edge, renders as an opaque panel, and supports keyboard navigation (`↑`/`↓` to move, `Esc` to close). The choice persists in `localStorage` (`theme-palette`), applies pre-paint (no flash), and follows the OS while Ocean Depths is active.

| Theme | Mode | Accent | Upstream |
| ----- | ---- | ------ | -------- |
| Ocean Depths | system | `#0891b2` | — |
| Banish | dark | `#ff2fb3` | [omarchy-banish-theme](https://github.com/HANCORE-linux/omarchy-banish-theme) |
| Harbor | light | `#365b87` | [omarchy-harbor-theme](https://github.com/HANCORE-linux/omarchy-harbor-theme) |
| InkyPinky | dark | `#a795ed` | [omarchy-inkypinky-theme](https://github.com/HANCORE-linux/omarchy-inkypinky-theme) |
| Moodpeak (default) | dark | `#4ecdc4` | [omarchy-moodpeak-theme](https://github.com/HANCORE-linux/omarchy-moodpeak-theme) |
| The Greek | light | `#924025` | [omarchy-thegreek-theme](https://github.com/HANCORE-linux/omarchy-thegreek-theme) |
| Turbonite | dark | `#ed9a1d` | [omarchy-turbonite-theme](https://github.com/HANCORE-linux/omarchy-turbonite-theme) |
| White Gold | light | `#005c32` | [omarchy-whitegold-theme](https://github.com/HANCORE-linux/omarchy-whitegold-theme) |

Each HANCORE palette maps its upstream `colors.toml` onto the site tokens (`--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--destructive`, …); glass/glow helpers derive automatically. The palette's designed mode is mirrored to `data-theme`, so the circuit backdrop and Giscus comments follow it.

### Adding a theme

1. Append an entry to `THEMES` in `src/lib/themes.ts` (id, label, mode, dot, upstream `colors.toml` values).
2. Add a matching `:root[data-palette="<id>"]` block in `src/styles/themes.css`.
3. Add a row to the table above. The menu renders from the registry — no component changes needed.

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
| Weather unavailable | The weather provider could not return usable readings. The local clock still runs. |
| Port already in use | `bun run dev -- --port 4322` |
| Fonts look wrong | Display/body/mono fonts load from Google Fonts; needs network on first paint, then caches |

---

## Credits

- [astro-erudite](https://github.com/jktrn/astro-erudite) by [@jktrn](https://github.com/jktrn) — base theme
- [merox.dev](https://github.com/meroxdotdev) by Robert Melcher — design inspiration
- [Frontend Design](https://agenticskills.io/skills/frontend-design) — frontend design patterns
- [Theme Factory](https://github.com/anthropics/skills/tree/main/skills/theme-factory) — theme system reference

### Theme palettes

The seven additional palettes are adapted from the [HANCORE-linux theme archive](https://github.com/HANCORE-linux/HANCORE-linux/blob/main/THEMES.md) — each upstream `colors.toml` mapped onto the site tokens:

[Banish](https://github.com/HANCORE-linux/omarchy-banish-theme) · [Harbor](https://github.com/HANCORE-linux/omarchy-harbor-theme) · [InkyPinky](https://github.com/HANCORE-linux/omarchy-inkypinky-theme) · [Moodpeak](https://github.com/HANCORE-linux/omarchy-moodpeak-theme) · [The Greek](https://github.com/HANCORE-linux/omarchy-thegreek-theme) · [Turbonite](https://github.com/HANCORE-linux/omarchy-turbonite-theme) · [White Gold](https://github.com/HANCORE-linux/omarchy-whitegold-theme)

### Fonts

- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) by Florian Karsten — display
- [Inter](https://fonts.google.com/specimen/Inter) by Rasmus Andersson — body
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) by JetBrains — code and metadata

---

## License

[MIT](LICENSE)
