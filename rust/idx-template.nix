{ pkgs, ... }: {
  packages = [ pkgs.cargo ];

  bootstrap = ''
    cargo new app
    mkdir -p app/.idx
    cp ${./dev.nix} app/.idx/dev.nix
    chmod +w app/.idx/dev.nix
    mv app "$out"

    mkdir -p "$out/.idx"
    chmod -R u+w "$out"
    cp -rf ${./.idx/airules.md} "$out/.idx/airules.md"
    cp -rf "$out/.idx/airules.md" "$out/GEMINI.md"
    chmod -R u+w "$out"
  '';
}