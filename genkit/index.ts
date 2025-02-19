import { genkit, z } from 'genkit';
import { googleAI, gemini20Flash } from '@genkit-ai/googleai';
import { messages } from './initial-data';
import { HNItemSchema, HNItemsSchema, HNPageSchema, PageSchema, UserSchema } from './schema';

export const ai = genkit({
	plugins: [googleAI()],
	model: gemini20Flash,
});

export const weatherTool = ai.defineTool({
	name: 'getWeather',
	description: 'Gets the weather for a given location',
	inputSchema: z.object({
		location: z.string().describe('The location to get the weather for')
	}),
	outputSchema: z.string().describe('The weather for the given location')
}, async ({ location }) => {
	return `The weather in ${location} is sunny`
});

export const hackerNewsTool = ai.defineTool<z.ZodVoid, z.ZodAny>({
	name: 'getHackerNewsByPage',
	description: 'Gets the json page number',
	inputSchema: z.void(),
	outputSchema: z.any(),
}, async () => {
	const response = await fetch(`https://api.hnpwa.com/v0/news/1.json`)
	const jsonData = await response.json() as typeof HNItemsSchema;
	// const items = HNItemsSchema.safeParse(jsonData)
	// console.log('--------------')
	// console.log(`
	
	// 	ITEMS
	
	// `)
	// console.log('--------------')
	// console.log(jsonData)
	return { page: 1, items: jsonData };
});

export const hackerNewsSummaryTool = ai.defineTool<z.ZodVoid, z.ZodString>({
	name: 'getHackerNewsSummary',
	description: 'Gets a summary of the Hacker News item',
	inputSchema: z.void(),
	outputSchema: z.string(),
}, async () => {
	const pageResult = await hackerNewsTool()
	const result = await ai.generate<z.ZodString>(`Summarize the following new on page ${pageResult.page}: ${JSON.stringify(pageResult.items)}`)
	return result.text
})

const chatPrompt = ai.definePrompt({
  name: 'chat',
	model: gemini20Flash,
	system: 'You are a helpful assistant.',
	prompt: async ({ text, user }) => `
		Help this user with their task below.
		The user ${user?.fullName} says: ${text}
	`,
  input: {
    schema: z.object({
      text: z.string().describe('A chat message from a user'),
			// Schemas can be imported as well
			user: UserSchema.optional(),
    })
  },
	tools: [weatherTool, hackerNewsSummaryTool],
});


const result = await chatPrompt({
	text: "Summarize the first page of Hacker News",
	user: {
		username: 'davideast',
		fullName: 'David East'
	}
});

console.log(`

-----------

// SUMMARY

-----------

${result.message?.text}

`)
