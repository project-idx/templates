import { z } from 'genkit';

export const UserSchema = z.object({
  username: z.string().describe('The name of the user who sent the message'),
  fullName: z.string().describe('The full name of the user who sent the message'),
});

export const HNItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  points: z.number().optional(),
  user: z.string().optional(),
  time: z.number(),
  time_ago: z.string(),
  comments_count: z.number().optional(),
  type: z.string(),
  url: z.string().optional(),
  domain: z.string().optional(),
}).partial();

export const HNItemsSchema = z.array(HNItemSchema);

export const HNPageSchema = z.object({
	page: z.number().describe('The page to get the news for'),
	items: HNItemsSchema,
});


export const PageSchema = z.object({
	page: z.number().describe('The page to get the news for')
})