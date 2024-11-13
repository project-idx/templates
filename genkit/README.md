# Genkit

## Set up your Gemini API Key
Get a Gemini API Key from https://g.co/ai/idxGetGeminiKey 

and add it to `.idx/dev.nix` in the `GOOGLE_GENAI_API_KEY`
```
## Start the Genkit Developer UI
Run the Genkit Developer UI with `genkit ui:start`

## Set up the IDX Preview Panel

Near the bottom of `.idx/dev.nix` add the preview panel configuration below and rebuild the environment.

```nix
  idx.previews = {
    enable = true;
    previews = [
      {
        command = [
          "npx"
          "genkit"
          "start"
          "--port"
          "$PORT"
        ];
        manager = "web";
        id = "web";
      }
    ];
  };
```