import { z } from 'genkit';

export const HNItemSchema = z.object({
  id: z.number().optional(),
  title: z.string().optional(),
  points: z.number().nullable().optional(),
  user: z.string().nullable().optional(),
  time: z.number().optional(),
  time_ago: z.string().optional(),
  comments_count: z.number().optional(),
  type: z.string().optional(),
  url: z.string().optional(),
  domain: z.string().optional(),
});

export const HNItemsSchema = z.array(HNItemSchema.partial());
