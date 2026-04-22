import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    order: z.number().optional(),
  }),
});

const terms = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/terms' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    categories: z.array(reference('categories')).min(1),
    lastUpdated: z.coerce.date(),
    plainEnglish: z.string(),
    detailedExplanation: z.string(),
    workedExample: z.string().optional(),
    usedInSentence: z.string().optional(),
    whenItApplies: z.string().optional(),
    commonMistakes: z.string().optional(),
    howToRemember: z.string().optional(),
    whenToConsult: z.string().optional(),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
    relatedTerms: z.array(reference('terms')).optional(),
  }),
});

export const collections = { categories, terms };
