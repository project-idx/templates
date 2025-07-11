{ pkgs, language ? "js", ... }: {
  packages = [
    pkgs.nodejs_20
  ];
  bootstrap = ''
    mkdir -p "$WS_NAME"
    npm create -y vite@latest "$WS_NAME" -- --template ${if language == "ts" then "lit-ts" else "lit"}
    mkdir -p "$WS_NAME/.idx/"
    cp -rf ${./icon.png} "$WS_NAME/.idx/icon.png"
    cp -rf ${./dev.nix} "$WS_NAME/.idx/dev.nix"
    chmod -R +w "$WS_NAME"
    mv "$WS_NAME" "$out"

    mkdir "$out/.idx"
    chmod -R u+w "$out"
    cp .idx/airules.md "$out/.idx"
    cp gemini.md "$out"
    
    cd "$out"; npm install --package-lock-only --ignore-scripts
  '';
}