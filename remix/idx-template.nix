{ pkgs, ... }: {
  packages = [
    pkgs.nodejs_20
    pkgs.git
  ];
  bootstrap = ''
    npx create-remix@latest --yes --no-install --no-git-init --no-init-script "$WS_NAME"
    mkdir -p "$WS_NAME/.idx/"
    cp -rf ${./dev.nix} "$WS_NAME/.idx/dev.nix"
    chmod -R +w "$WS_NAME"
    mv "$WS_NAME" "$out"

    mkdir -p "$out/.idx"
    chmod -R u+w "$out"
    cp .idx/airules.md "$out/.idx"
    cp gemini.md "$out"

    cd "$out"; npm install --package-lock-only --ignore-scripts
  '';
}