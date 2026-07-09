import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    discipline: z.enum([
      'software-engineering',
      'quality-engineering',
      'data-science-ai',
      'multidisciplinary',
    ]),
    projectType: z.enum(['case-study', 'notebook-experiment', 'applied-analysis', 'demonstration']),
    summary: z.string(),
    context: z.string(),
    problem: z.string(),
    constraints: z.string(),
    role: z.string(),
    technologies: z.array(z.string()),
    outcomes: z.array(z.string()),
    lessons: z.array(z.string()),
    publicEvidence: z.string(),
    confidentiality: z.enum(['public', 'anonymized', 'representative']),
    evidenceLevel: z.enum(['high', 'medium', 'low']),
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  'case-studies': caseStudies,
};
