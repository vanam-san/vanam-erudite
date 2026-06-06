# vanam-erudite

A personal portfolio and blog built with [Astro](https://astro.build/), [Tailwind CSS](https://tailwindcss.com/), and [shadcn/ui](https://ui.shadcn.com/). Based on the [astro-erudite](https://github.com/jktrn/astro-erudite) theme by [enscribe](https://enscribe.dev).

> **Note:** This project was modified and configured using [opencode](https://opencode.ai) with the **MiMo V2.5 Free** LLM. I am not a coder, so there may be mistakes or incomplete configurations. Contributions and corrections are welcome!

## Tech Stack

| Category   | Technology                                           |
| ---------- | ---------------------------------------------------- |
| Framework  | [Astro](https://astro.build/)                        |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com/)          |
| Components | [shadcn/ui](https://ui.shadcn.com/)                  |
| Content    | [MDX](https://mdxjs.com/)                            |
| Codeblocks | [Expressive Code](https://expressive-code.com/)      |

## Features

- Astro Islands architecture for selective hydration
- Light/dark theme support via shadcn/ui conventions
- MDX blog authoring with LaTeX math (KaTeX)
- RSS feed and sitemap generation
- SEO optimization with Open Graph tags
- View Transitions for smooth route animations
- Syntax highlighting with Expressive Code

## Getting Started

### Prerequisites

- Node.js 21+

### Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```
Open [http://localhost:1234](http://localhost:1234).

### Available Commands

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the development server             |
| `npm run build` | Type-check and build for production      |
| `npm run preview` | Preview the production build           |
| `npm run prettier` | Format all files with Prettier        |

## Project Structure

```
src/
  components/    # Astro and React components
  content/       # Blog posts, authors, projects (MDX)
  layouts/       # Page layouts
  lib/           # Utility functions
  pages/         # Route pages
  styles/        # Global CSS
public/          # Static assets (favicons, fonts, images)
```

## Adding Content

### Blog Posts

Create `.mdx` files in `src/content/blog/`:

```yml
---
title: 'Your Post Title'
description: 'A brief description'
date: 2024-01-01
tags: ['tag1', 'tag2']
image: './image.png'
authors: ['author-name']
draft: false
---
```

### Authors

Add author profiles in `src/content/authors/` as Markdown files.

### Projects

Add projects in `src/content/projects/` as Markdown files.

## Configuration

Edit `src/consts.ts` to update site metadata, navigation links, and social links.

## License

This project is licensed under the [MIT License](LICENSE).

---

Built with the [astro-erudite](https://github.com/jktrn/astro-erudite) theme, modified using [opencode](https://opencode.ai) with MiMo V2.5 Free LLM.
