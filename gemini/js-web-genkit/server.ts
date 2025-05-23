import { googleAI } from "@genkit-ai/googleai";
import express from "express";
import * as fs from 'fs/promises';
import { genkit, z } from 'genkit';
import { logger } from 'genkit/logging';

const port = process.env.PORT || 3000;

export const ai = genkit({
  plugins: [googleAI()],
});

logger.setLogLevel('debug');
const recipePrompt = ai.definePrompt({
  name: 'Recipes prompt',
  model: googleAI.model('gemini-2.0-flash'),
  input: {
    schema: z.object({
      photoUrl: z.string(),
      userPrompt: z.string(),
    })
  },
  output: {
    format: 'json',
    schema: z.object({
      recipe: z.string()
        .describe("A recipe, starting with a title, in markdown format"),
      tags: z.array(z.string())
        .describe("Two to Four 1-word keyword tags for the recipe, lowercase only"),
    })
  },
}, `
    You're an expert chef.  Make sure to follow all instructions.

    The user has asked 
    ====
    {{userPrompt}} 
    ====

    and provided this image: 
    ====
    {{media url=photoUrl}}
    ====

    `
);

async function createServer() {
  const app = express();
  app.use(express.static('static'));
  app.post("/api/generate", express.json(), async (req, res) => {
    const { image, userPrompt } = req.body;
    let imageUrl = `./static/images/${image}`;
    const imageBase64 = await fs.readFile(imageUrl, { encoding: 'base64' });

    const result = await recipePrompt({
      photoUrl: `data:image/jpeg;base64,${imageBase64}`,
      userPrompt: userPrompt
    });
    return res.send(result.output);
  });
  app.listen(port);
  console.log("Server started: http://localhost:" + port);
}

createServer();
