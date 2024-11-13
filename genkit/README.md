# Genkit

<a href="https://idx.google.com/new?template=https%3A%2F%2Fgithub.com%2Fi2amsam%2Ftemplates%2Ftree%2Fupdate-genkit-example%2Fgenkit">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://cdn.idx.dev/btn/open_dark_32.svg">
    <source
      media="(prefers-color-scheme: light)"
      srcset="https://cdn.idx.dev/btn/open_light_32.svg">
    <img
      height="32"
      alt="Open in IDX"
      src="https://cdn.idx.dev/btn/open_purple_32.svg">
  </picture>
</a>

This is a simple demonstration web app using the [Firebase Genkit Library](https://github.com/firebase/genkit) with Gemini to generate recipes from images.

To get started, get an API key at https://g.co/ai/idxGetGeminiKey and enter it in `.idx/dev.nix` and rebuild the environment.

After running this code, open a new terminal (`Ctrl`+ `` ` ``) and run `genkit ui:start` to start the interactive Genkit Developer UI and inspect the calls to Gemini.


## Set up your Gemini API Key
Get a Gemini API Key from https://g.co/ai/idxGetGeminiKey 

and add it to `.idx/dev.nix` in the `GOOGLE_GENAI_API_KEY`
```
## Start the Genkit Developer UI
Run the Genkit Developer UI with `genkit ui:start`

## Set up the IDX Preview Panel

Near the bottom of `.idx/dev.nix` add the preview panel configuration below and rebuild the environment.
