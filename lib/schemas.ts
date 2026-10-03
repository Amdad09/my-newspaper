import { z } from 'zod';
import { CATEGORY_SLUGS } from '@/data/categories';

// Store timestamps as ISO 8601 with offset, e.g. 2026-10-03T14:30:00+06:00
const isoDate = z.string().datetime({ offset: true });

export const sourceSchema = z.object({
    name: z.string().min(1),
    type: z.enum(['official', 'document', 'interview', 'witness', 'secondary']),
    url: z.string().url().optional(),
    note: z.string().optional(),
});

// Corrections and update-log entries share one shape
export const logEntrySchema = z.object({
    at: isoDate,
    text: z.string().min(1),
});

export const articleSchema = z.object({
    id: z.string().min(1),
    slug: z
        .string()
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            'slug must be lowercase ASCII with hyphens',
        ),

    title: z.string().min(1),
    subtitle: z.string().optional(),
    summary: z.string().min(1),
    content: z.array(z.string().min(1)).min(1), // one string per paragraph

    category: z.enum(CATEGORY_SLUGS),
    tags: z.array(z.string()).default([]),

    // news = reported facts, analysis = interpretation, opinion = author's view
    kind: z.enum(['news', 'analysis', 'opinion', 'fact_check']),
    verification: z.enum([
        'verified',
        'in_review',
        'unverified',
        'not_applicable',
    ]),

    image: z.object({
        src: z.string().min(1),
        alt: z.string().min(1),
        width: z.number().int().positive(),
        height: z.number().int().positive(),
        caption: z.string().optional(),
        credit: z.string().optional(),
    }),

    author: z.object({ id: z.string(), name: z.string() }),

    publishedAt: isoDate,
    updatedAt: isoDate.optional(),

    sources: z.array(sourceSchema).default([]),
    corrections: z.array(logEntrySchema).default([]),
    updates: z.array(logEntrySchema).default([]),

    featured: z.boolean().default(false),
    breaking: z.boolean().default(false),
    status: z.enum(['draft', 'published', 'archived']).default('published'),

    // true for fake data: the UI can show a "dummy data" notice
    isDummy: z.boolean().default(false),
});

export const articleListSchema = z.array(articleSchema);

export type Article = z.infer<typeof articleSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type LogEntry = z.infer<typeof logEntrySchema>;

// Not stored here on purpose:
//  - readingTime: derived from content (see lib/format.ts)
//  - viewCount: changes constantly, belongs in a separate analytics store
