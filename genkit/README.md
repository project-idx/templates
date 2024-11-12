# Genkit + IDX

## Accept the Genkit CLI terms
Open the IDX terminal and run the `genkit` command. This will show a prompt for the terms and conditions for Genkit. Hit enter to accept.

## Set up your Gemini API Key
Use the IDX Integration Panel to the left to get an API Key and replace it in the `.idx/dev.nix` file.

```nix
  # Sets environment variables in the workspace
  env = {
    # You can get a Gemini API key through the IDX Integrations panel to the left!
    GOOGLE_API_KEY = "<your-api-key>";
  };
```

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
