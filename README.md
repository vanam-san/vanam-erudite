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

- **Editorial bento homepage** — who/intro/latest-post/blog/projects/photography tiles plus a live time + weather tile (wttr.in, no key, 8s timeout with graceful fallback)
- **Command palette** (⌘K / Ctrl+K, `/` to focus) — full-text [Pagefind](https://pagefind.app/) search in production, title-index fallback in dev
- **Keyboard shortcuts** — press `?` anywhere for the shortcut dialog
- **Circuit backdrop** — animated PCB traces (desktop only), paper grain + theme-aware wash on all screens
- **Designed 404** — bento-style error page, excluded from the search index
- **Gallery system** — collections with lightbox, keyboard nav, auto tag pages
- **Unified tags** — cross-collection (`/tags`) spanning blog, gallery, projects
- **Giscus + Umami** — optional, zero-config-when-absent integrations
- **Ocean Depths theme** — cyan/lume accents, glow tokens, `light-dark()` auto light/dark mode
- **Theme menu** — 29 palettes (Moodpeak default, plus Ocean Depths and 28 [HANCORE-linux Omarchy themes](https://github.com/HANCORE-linux/HANCORE-linux/blob/main/THEMES.md)); see [Themes](#themes)
- **Typography** — Space Grotesk display, Inter body, JetBrains Mono meta

## Themes

Click the palette icon in the sidebar to open the theme menu. Each entry shows a color dot (the palette accent), the theme name, and a tick marking the selected theme. The menu opens upward on desktop, anchors to the viewport edge on mobile, renders as an opaque panel, and supports keyboard navigation (`↑`/`↓` to move, `Esc` to close). The choice persists in `localStorage` (`theme-palette`), applies pre-paint (no flash), and follows the OS while Ocean Depths is active.

| Theme | Mode | Accent | Upstream |
| ----- | ---- | ------ | -------- |
| Ocean Depths | system | `#0891b2` | — |
| Banish | dark | `#ff2fb3` | [omarchy-banish-theme](https://github.com/HANCORE-linux/omarchy-banish-theme) |
| Batou | dark | `#605d5b` | [omarchy-batou-theme](https://github.com/HANCORE-linux/omarchy-batou-theme) |
| BlackGold | dark | `#6e6a58` | [omarchy-blackgold-theme](https://github.com/HANCORE-linux/omarchy-blackgold-theme) |
| BlackMoney | dark | `#d8d4b4` | [omarchy-blackmoney-theme](https://github.com/HANCORE-linux/omarchy-blackmoney-theme) |
| BlackTurq | dark | `#adf0e9` | [omarchy-blackturq-theme](https://github.com/HANCORE-linux/omarchy-blackturq-theme) |
| Demon | dark | `#5c624b` | [omarchy-demon-theme](https://github.com/HANCORE-linux/omarchy-demon-theme) |
| Dos-Moos | dark | `#819890` | [omarchy-dos-moos-theme](https://github.com/HANCORE-linux/omarchy-dos-moos-theme) |
| Greek Noir | dark | `#f25623` | [omarchy-greek-noir-theme](https://github.com/HANCORE-linux/omarchy-greek-noir-theme) |
| Harbor | light | `#5e81ac` | [omarchy-harbor-theme](https://github.com/HANCORE-linux/omarchy-harbor-theme) |
| Harbor Dark | dark | `#e75a50` | [omarchy-harbordark-theme](https://github.com/HANCORE-linux/omarchy-harbordark-theme) |
| InkyPinky | dark | `#7c7ca8` | [omarchy-inkypinky-theme](https://github.com/HANCORE-linux/omarchy-inkypinky-theme) |
| Kansō | dark | `#8ba4b0` | [omarchy-kanso-theme](https://github.com/HANCORE-linux/omarchy-kanso-theme) |
| Labra | dark | `#e33d84` | [omarchy-labra-theme](https://github.com/HANCORE-linux/omarchy-labra-theme) |
| Last Horizon | dark | `#d7857f` | [omarchy-lasthorizon-theme](https://github.com/HANCORE-linux/omarchy-lasthorizon-theme) |
| Mecha no Onna | dark | `#d4bd99` | [omarchy-mechanoonna-theme](https://github.com/HANCORE-linux/omarchy-mechanoonna-theme) |
| Moodpeak (default) | dark | `#4ecdc4` | [omarchy-moodpeak-theme](https://github.com/HANCORE-linux/omarchy-moodpeak-theme) |
| Oxford | dark | `#bda07f` | [omarchy-oxford-theme](https://github.com/HANCORE-linux/omarchy-oxford-theme) |
| Oxocarbon | dark | `#33b1ff` | [omarchy-oxocarbon-theme](https://github.com/HANCORE-linux/omarchy-oxocarbon-theme) |
| Rose of Dune | light | `#76634c` | [omarchy-roseofdune-theme](https://github.com/HANCORE-linux/omarchy-roseofdune-theme) |
| Ryū | dark | `#525e5a` | [omarchy-ryu-theme](https://github.com/HANCORE-linux/omarchy-ryu-theme) |
| Saga | dark | `#b2fff3` | [omarchy-saga-theme](https://github.com/HANCORE-linux/omarchy-saga-theme) |
| Sapphire | dark | `#f7c3c6` | [omarchy-sapphire-theme](https://github.com/HANCORE-linux/omarchy-sapphire-theme) |
| Shades of Jade | dark | `#d1ffb0` | [omarchy-shadesofjade-theme](https://github.com/HANCORE-linux/omarchy-shadesofjade-theme) |
| Solitude | dark | `#798186` | [omarchy-solitude-theme](https://github.com/HANCORE-linux/omarchy-solitude-theme) |
| The Greek | light | `#de6a41` | [omarchy-thegreek-theme](https://github.com/HANCORE-linux/omarchy-thegreek-theme) |
| Turbonite | dark | `#ed9a1d` | [omarchy-turbonite-theme](https://github.com/HANCORE-linux/omarchy-turbonite-theme) |
| Velvet Night | dark | `#9099a5` | [omarchy-velvetnight-theme](https://github.com/HANCORE-linux/omarchy-velvetnight-theme) |
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
| Weather tile stuck at `--°C` | wttr.in unreachable/blocked; tile degrades gracefully, no action needed |
| Port already in use | `bun run dev -- --port 4322` |
| Fonts look wrong | Display/body/mono fonts load from Google Fonts; needs network on first paint, then caches |

---

## Credits

- [astro-erudite](https://github.com/jktrn/astro-erudite) by [@jktrn](https://github.com/jktrn) — base theme
- [merox.dev](https://github.com/meroxdotdev) by Robert Melcher — design inspiration
- [Frontend Design](https://agenticskills.io/skills/frontend-design) — frontend design patterns
- [Theme Factory](https://github.com/anthropics/skills/tree/main/skills/theme-factory) — theme system reference

### Theme palettes

All 28 palettes are adapted from the [HANCORE-linux theme archive](https://github.com/HANCORE-linux/HANCORE-linux/blob/main/THEMES.md) — each upstream `colors.toml` mapped onto the site tokens:

[Banish](https://github.com/HANCORE-linux/omarchy-banish-theme) · [Batou](https://github.com/HANCORE-linux/omarchy-batou-theme) · [BlackGold](https://github.com/HANCORE-linux/omarchy-blackgold-theme) · [BlackMoney](https://github.com/HANCORE-linux/omarchy-blackmoney-theme) · [BlackTurq](https://github.com/HANCORE-linux/omarchy-blackturq-theme) · [Demon](https://github.com/HANCORE-linux/omarchy-demon-theme) · [Dos-Moos](https://github.com/HANCORE-linux/omarchy-dos-moos-theme) · [Greek Noir](https://github.com/HANCORE-linux/omarchy-greek-noir-theme) · [Harbor](https://github.com/HANCORE-linux/omarchy-harbor-theme) · [Harbor Dark](https://github.com/HANCORE-linux/omarchy-harbordark-theme) · [InkyPinky](https://github.com/HANCORE-linux/omarchy-inkypinky-theme) · [Kansō](https://github.com/HANCORE-linux/omarchy-kanso-theme) · [Labra](https://github.com/HANCORE-linux/omarchy-labra-theme) · [Last Horizon](https://github.com/HANCORE-linux/omarchy-lasthorizon-theme) · [Mecha no Onna](https://github.com/HANCORE-linux/omarchy-mechanoonna-theme) · [Moodpeak](https://github.com/HANCORE-linux/omarchy-moodpeak-theme) · [Oxford](https://github.com/HANCORE-linux/omarchy-oxford-theme) · [Oxocarbon](https://github.com/HANCORE-linux/omarchy-oxocarbon-theme) · [Rose of Dune](https://github.com/HANCORE-linux/omarchy-roseofdune-theme) · [Ryū](https://github.com/HANCORE-linux/omarchy-ryu-theme) · [Saga](https://github.com/HANCORE-linux/omarchy-saga-theme) · [Sapphire](https://github.com/HANCORE-linux/omarchy-sapphire-theme) · [Shades of Jade](https://github.com/HANCORE-linux/omarchy-shadesofjade-theme) · [Solitude](https://github.com/HANCORE-linux/omarchy-solitude-theme) · [The Greek](https://github.com/HANCORE-linux/omarchy-thegreek-theme) · [Turbonite](https://github.com/HANCORE-linux/omarchy-turbonite-theme) · [Velvet Night](https://github.com/HANCORE-linux/omarchy-velvetnight-theme) · [White Gold](https://github.com/HANCORE-linux/omarchy-whitegold-theme)

### Fonts

- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) by Florian Karsten — display
- [Inter](https://fonts.google.com/specimen/Inter) by Rasmus Andersson — body
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) by JetBrains — code and metadata

---

## License

[MIT](LICENSE)
