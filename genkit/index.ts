import { genkit, z } from 'genkit/beta';
import { googleAI, gemini20Flash } from '@genkit-ai/googleai';
import { HNItemsSchema } from './schema';
import { createInterface } from "node:readline/promises";

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

export const hackerNewsTool = ai.defineTool<z.ZodVoid, typeof HNItemsSchema>({
	name: 'getHackerNewsByPage',
	description: 'Gets the json page number',
	inputSchema: z.void(),
	outputSchema: HNItemsSchema,
}, async () => {
	const response = await fetch(`https://api.hnpwa.com/v0/news/1.json`)
	const jsonData = await response.json();
	const parseMeMaybe = HNItemsSchema.safeParse(jsonData)
	if(parseMeMaybe.success) {
		return parseMeMaybe.data
	}
	const errorDetails = parseMeMaybe.error.errors
  .map((error) => `Path: ${error.path.join('.')} - ${error.message}`)
  .join('\n');
	const stack = `STACK: ${parseMeMaybe.error.stack}`;
	throw new Error(`Zod Validation Error:\n${errorDetails}\n\n${stack}`);
});

export const hackerNewsSummaryTool = ai.defineTool<z.ZodVoid, z.ZodString>({
	name: 'getHackerNewsSummary',
	description: 'Gets a summary of the Hacker News item',
	inputSchema: z.void(),
	outputSchema: z.string(),
}, async () => {
	const items = await hackerNewsTool()
	const result = await ai.generate<z.ZodString>(`Summarize the following news: ${JSON.stringify(items)}`)
	return result.text;
})

const chat = ai.chat({
	model: gemini20Flash,
	system: 'You are a helpful assistant. If the user asks you what you can do, respond with your tools and creative uses.',
	tools: [weatherTool, hackerNewsSummaryTool],
});


async function main() {
  console.log("You're chatting with Gemini. Ctrl-C to quit.\n");
  const readline = createInterface(process.stdin, process.stdout);
  while (true) {
    const userInput = await readline.question("> ");
		const result = await chat.send(userInput)
    console.log(result.text);
  }
}

main();