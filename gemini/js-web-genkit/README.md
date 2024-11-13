# Genkit

<a href="https://idx.google.com/new?template=https%3A%2F%2Fgithub.com%2Fproject-idx%2Ftemplates%2Ftree%2Fmain%2Fgemini%2Fjs-web-genkit">
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
