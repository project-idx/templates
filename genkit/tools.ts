import { GenkitBeta, z } from 'genkit/beta';
import { HNItemsSchema } from './schema';

export const createWeatherTool = (ai: GenkitBeta) => ai.defineTool({
	name: 'getWeather',
	description: 'Gets the weather for a given location',
	inputSchema: z.object({
		location: z.string().describe('The location to get the weather for')
	}),
	outputSchema: z.string().describe('The weather for the given location')
}, async ({ location }) => {
	return `The weather in ${location} is sunny`
});

export const createHackerNewsTool = (ai: GenkitBeta) => ai.defineTool<z.ZodVoid, typeof HNItemsSchema>({
	name: 'getHackerNewsByPage',
	description: 'Gets the json page number',
	inputSchema: z.void(),
	outputSchema: HNItemsSchema,
}, async () => {
	const response = await fetch(`https://api.hnpwa.com/v0/news/1.json`)
	const jsonData = await response.json();
	const parseMeMaybe = HNItemsSchema.safeParse(jsonData)
	if (parseMeMaybe.success) {
		return parseMeMaybe.data
	}
	const errorDetails = parseMeMaybe.error.errors
		.map((error) => `Path: ${error.path.join('.')} - ${error.message}`)
		.join('\n');
	const stack = `STACK: ${parseMeMaybe.error.stack}`;
	throw new Error(`Zod Validation Error:\n${errorDetails}\n\n${stack}`);
});

export const createHackerNewsSummaryTool = (params: { 
  hackerNewsTool: ReturnType<typeof createHackerNewsTool>, 
  ai: GenkitBeta 
}) => params.ai.defineTool<z.ZodVoid, z.ZodString>({
	name: 'getHackerNewsSummary',
	description: 'Gets a summary of the Hacker News item',
	inputSchema: z.void(),
	outputSchema: z.string(),
}, async () => {
	const items = await params.hackerNewsTool();
	const result = await params.ai.generate<z.ZodString>(
    `Summarize the following news: ${JSON.stringify(items)}`
  );
	return result.text;
});
