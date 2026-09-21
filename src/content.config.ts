import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const notes = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		published: z.coerce.date(),
		updated: z.coerce.date().optional(),
		// draft = rough first pass, growing = actively adding to it, solid = I'd stand behind it
		status: z.enum(['draft', 'growing', 'solid']).default('draft'),
		tags: z.array(z.string()).default([]),
		related: z.array(z.string()).default([]), // ids of other notes
		video: z.string().optional(), // YouTube video id
		premium: z.boolean().default(false), // not enforced yet; reserved for future gating
		hidden: z.boolean().default(false), // set true to keep a WIP out of listings and the feed
	}),
});

export const collections = { notes };
