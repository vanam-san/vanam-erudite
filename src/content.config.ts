import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce
        .date()
        .refine((d) => !isNaN(d.getTime()), { message: 'Invalid date' }),
      order: z.number().optional(),
      image: image().optional(),
      imageCredit: z.string().optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
})

const authors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    pronouns: z.string().optional(),
    avatar: z.union([
      z.string().refine(
        (s) => {
          try {
            return !!new URL(s)
          } catch {
            return false
          }
        },
        { message: 'Avatar must be a valid URL' },
      ),
      z.string().refine((s) => s.startsWith('/'), {
        message: 'Avatar must be a URL or start with /',
      }),
    ]),
    bio: z.string().optional(),
    mail: z.string().email().optional(),
    website: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    discord: z.string().optional(),
    bluesky: z.string().url().optional(),
    mastodon: z.string().url().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      image: image(),
      link: z.string().url(),
      startDate: z.coerce
        .date()
        .refine((d) => !isNaN(d.getTime()), { message: 'Invalid start date' })
        .optional(),
      endDate: z.coerce
        .date()
        .refine((d) => !isNaN(d.getTime()), { message: 'Invalid end date' })
        .optional(),
    }),
})

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/gallery' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce
        .date()
        .refine((d) => !isNaN(d.getTime()), { message: 'Invalid date' }),
      cover: image(),
      photos: z.array(image()),
      draft: z.boolean().optional(),
    }),
})

export const collections = { blog, authors, projects, gallery }
