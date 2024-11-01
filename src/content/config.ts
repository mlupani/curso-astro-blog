// 1. Import utilities from `astro:content`
import { z, defineCollection, reference } from 'astro:content';

// 2. Define a `type` and `schema` for each collection
const blogCollection = defineCollection({
  type: 'content', // v2.5.0 and later
  schema: ({image}) => z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: image().refine(img => img.width < 1200, {
      message: 'Image width must be less than 1200px'
    }),
    //relaciones
    //author: z.string(),
    author: reference('author'),
    tags: z.array(z.string()),
    isDraft: z.boolean().default(false),
  }),
});

const authorCollection = defineCollection({
  type: 'data',
  schema: ({image}) =>  z.object({
    name: z.string(),
    avatar: image().refine(img => img.width < 1200, {
      message: 'Image width must be less than 1200px'
    }),
    twitter: z.string(),
    linkedIn: z.string(),
    github: z.string(),
    bio: z.string(),
    subtitle: z.string(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
  author: authorCollection
};