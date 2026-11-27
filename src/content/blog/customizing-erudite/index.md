---
title: "Customizing astro-erudite: What I Added to the Base Template"
description: "A walkthrough of every feature added to astro-erudite v2, from the editorial homepage and animated backdrop to Giscus comments."
date: 2026-07-30
authors:
  - vanam
tags:
  - v2
  - customization
---

astro-erudite v2 is a minimal, opinionated blogging template. Out of the box it gives you a blog, projects, an about page, and a sidebar. This post covers everything I added on top of that foundation.

## Editorial homepage

The homepage opens with a portrait, a short introduction, and links to About and Projects. Writing, projects, and photography each feature one entry next to a list of recent items. On narrow screens the lists stack below the featured cards.

The shared layout puts navigation, search, and the theme picker in the header. Article pages keep their breadcrumbs and table of contents, and the homepage includes a live clock and weather widget.

## Umami analytics

[Umami](https://umami.is/) — a privacy-focused, cookieless analytics tool.

Configuration lives in `consts.ts`:

```ts
export const UMAMI = {
  websiteId: import.meta.env.UMAMI_WEBSITE_ID || "",
  host: import.meta.env.UMAMI_HOST || "cloud.umami.is",
}
```

The tracking script is injected conditionally in `MetaHead.astro` — it only loads if `UMAMI_WEBSITE_ID` is set:

```astro
{UMAMI.websiteId && (
  <script
    is:inline
    defer
    src={`https://${UMAMI.host}/script.js`}
    data-website-id={UMAMI.websiteId}
  />
)}
```

This means the template works identically without analytics configured. No cookies, no personal data collection, no GDPR banner needed.

## Giscus comments

[Giscus](https://giscus.app/) — uses GitHub Discussions as a backend.

The `Giscus.astro` component handles three things:

1. **Loading** — it creates a `<script>` tag pointing to `giscus.app/client.js` with the repo, category, and mapping configuration as data attributes.
2. **Theme syncing** — a `MutationObserver` watches `data-theme` on `<html>` and posts a `setConfig` message to the Giscus iframe whenever the theme changes.
3. **Re-initialization** — on View Transitions page loads (`astro:page-load` and `astro:after-swap`), it tears down the old iframe and script, then reloads fresh.

The component is conditionally rendered on blog posts:

```astro
{GISCUS.repo && GISCUS.repoId && GISCUS.categoryId && <Giscus />}
```

Like Umami, it requires no configuration to function — just set three environment variables and comments appear.

## Gallery system

A complete gallery feature with:

- **Content collection** — `gallery` entries with a title, description, date, cover image, and an array of photos
- **Listing page** — a responsive grid of `GalleryCard` components at `/gallery`
- **Detail pages** — individual gallery pages with a photo grid, lightbox, and optional Markdown content
- **Lightbox** — a full-screen overlay with prev/next navigation, keyboard support, and a photo counter
- **Homepage integration** — the homepage features a gallery cover and links to recent galleries

The gallery card styling mirrors the blog and project cards: border, background, hover effects, and image scaling.

## Setup as a blog post

A dedicated setup blog post at `/blog/my-setup` showcasing hardware and software tools, instead of a standalone `/setup` page. This keeps all content in the blog collection and makes it easier to maintain alongside other posts.

## Scroll-to-top button

A `floating` variant of `ScrollToTop.astro` that renders as a fixed-position button in the bottom-right corner on mobile. It appears after scrolling past 50% of the viewport height and uses `backdrop-filter: blur()` for a translucent background.

```astro
<ScrollToTop floating />
```

This component is used on the homepage, blog posts, and gallery detail pages.

## Blog and project card hover effects

Blog and project cards were flat list items with no visual containment. I added card-like styling to match the gallery cards:

- `border: 1.5px solid var(--border)` with `border-radius: var(--radius-2xl)`
- `background-color: color-mix(in oklab, var(--muted) 20%, transparent)`
- Hover state: border brightens, background darkens, box shadow appears, card translates up 2px
- Image containers get `overflow: hidden` and `border-radius: var(--radius-xl)`, with images scaling to 1.05x on hover

## Animated circuit backdrop

Two softly blurred waves drift through the upper half of the screen on every page. One follows a sine curve and the other follows a cosine curve. Both inherit colors from the active palette. On desktop, pulses also travel along the circuit traces at the edges. The backdrop stays still when reduced motion is enabled.

## Weather widget

The homepage requests current conditions from `wttr.in` and displays the provider's reported location alongside the temperature and conditions. The request times out after eight seconds. If it fails, the widget shows an unavailable message and the local clock keeps updating.

## Theme system — Ocean Depths + HANCORE archive

The base erudite template uses a simple light/dark scheme with neutral grays. I replaced it with a palette switcher that defaults to Moodpeak: a built-in Ocean Depths theme (cyan/lume accents, `light-dark()` auto mode) plus seven palettes adapted from the [HANCORE-linux Omarchy theme archive](https://github.com/HANCORE-linux/HANCORE-linux/blob/main/THEMES.md) — each mapped from its upstream `colors.toml` onto the site tokens:

```css
:root[data-palette="banish"] {
  --background: #0c0b0d;
  --foreground: #d8d1cc;
  --primary: #ff2fb3; /* upstream accent */
  --secondary: #6c70e0; /* upstream blue */
  --muted: #19181a; /* upstream lighter_background */
}
```

The palette icon in the header opens the theme menu. Each entry shows a color dot (the palette accent), the theme name, and a tick marking the selection. The menu opens below the trigger on desktop and mobile. Use the arrow keys to move through it and Escape to close it. The choice persists to `localStorage`, applies pre-paint to avoid a flash, and each palette's designed light/dark mode is mirrored to `data-theme` so the circuit backdrop and Giscus comments follow it.

To add a theme: append an entry to `THEMES` in `src/lib/themes.ts`, add a matching `:root[data-palette="<id>"]` block in `src/styles/themes.css` — the menu renders from the registry, no component changes needed.

Glow effects are layered on interactive elements:

```css
--glow-primary: 0 0 20px color-mix(in oklab, var(--cyan-9) 25%, transparent);
--glow-secondary: 0 0 20px color-mix(in oklab, var(--lume-9) 20%, transparent);
```

Cards, navigation links, and the backdrop all reference these tokens, keeping the visual language consistent.

## Typography — terminal-inspired pairing

The base template uses a single sans-serif stack everywhere. I split typography into three roles, chosen to match the terminal/desktop-theme aesthetic:

- **Display (headings):** Space Grotesk — a techy geometric sans, loaded via Google Fonts
- **Body:** Inter — a neutral variable sans for readability, loaded via Google Fonts
- **Mono:** JetBrains Mono — the developer monospace for code and metadata, loaded via Google Fonts

Space Grotesk is applied via a `--font-display` custom property and used on the header brand, page titles, and homepage hero name. The heading scale uses tighter tracking (`-0.02em` on large sizes) and a heavier weight (700) to create contrast against the body text.

```css
--font-display: "Space Grotesk", "Inter", system-ui, sans-serif;
```

The fonts are preconnected in `MetaHead.astro` and defined in `fonts.css`.

## Vertical bar hover effect on list cards

Blog, gallery, and project cards all share a list-item layout (date | title | tags | meta). I added a 2px vertical accent bar on the left edge that animates in on hover.

Each `<li>` gets `position: relative` and a `::before` pseudo-element:

```css
li::before {
  content: "";
  position: absolute;
  left: 0;
  top: var(--space-2xs);
  bottom: var(--space-2xs);
  width: 2px;
  background: var(--primary);
  opacity: 0;
  transform: scaleY(0);
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

li:hover::before {
  opacity: 1;
  transform: scaleY(1);
}
```

The bar scales from center using `scaleY`, giving a smooth reveal effect.

## Unified tag system

The base v2 template has no tag infrastructure. I built a unified tag system that spans all three collections:

- **`getAllTags()`** in `content.ts` collects tags from blog, gallery, and projects into a single `Map<string, TagGroup>`
- **Tags index** at `/tags` shows all tags with total counts across collections
- **Tag detail pages** at `/tags/[id]` render matching items grouped by type (blog, gallery, projects)
- All tags are normalized to lowercase for consistency

```ts
type TagGroup = {
  blog: CollectionEntry<"blog">[]
  gallery: CollectionEntry<"gallery">[]
  projects: CollectionEntry<"projects">[]
}
```

Tags are clickable on every card and on the tag detail pages, creating cross-collection navigation.

## Gallery list layout with year sorting

The gallery started as a grid of cards with cover images. I converted it to a list layout matching the blog and project cards:

- Date, title, tags, photo count, and optional description in a grid
- Galleries sorted by year with year group headings
- Vertical bar hover effect matching other list cards
- Tags normalized to lowercase on display

The `getGalleriesByYear()` utility groups galleries by year and returns a `Map<number, Gallery[]>` sorted descending.

## Blog card alignment

The blog card was originally a different layout from gallery and project cards. I aligned all three to share the same structure:

| Column | Content |
|--------|---------|
| 1 (4.5rem) | Date in monospace |
| 2 (1fr) | Title as link |
| Full width | Tags in mono |
| Full width | Meta (words/time or photo count) |

Blog cards show `words · min read`, gallery cards show `N photos`, and project cards show an optional description. All use the same grid template, border treatment, and hover effects.

## Summary

| Feature | Added |
| - | - |
| Homepage | Portrait, featured writing, projects, and photography |
| Analytics | Umami (cookieless) |
| Comments | Giscus (GitHub Discussions) |
| Galleries | Full gallery with lightbox |
| Setup | Blog post with hardware/software showcase |
| Scroll to top | Floating mobile button |
| Card hover effects | Blog, projects, vertical bar accent |
| Reading time + word count | Blog listing cards too |
| Animated backdrop | Blurred sine and cosine waves with desktop circuit traces |
| Weather widget | Live wttr.in data |
| Color theme | Ocean Depths + 7 HANCORE palettes, switcher menu |
| Typography | Space Grotesk display + Inter body + JetBrains Mono |
| Tag system | Unified cross-collection tags |
| Gallery layout | List with year sorting |

Every addition follows the same principle as the base template: minimal JavaScript, native CSS, and no unnecessary dependencies. Giscus and Umami are optional. The homepage clock continues to work if the external weather service is unavailable.
