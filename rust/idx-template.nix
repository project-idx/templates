{ pkgs, ... }: {
  packages = [ pkgs.cargo ];

  bootstrap = ''
    cargo new app
    mkdir -p app/.idx
    cp ${./dev.nix} app/.idx/dev.nix
    chmod +w app/.idx/dev.nix
    mkdir -p app/.vscode
    printf "{\n    \"rust-analyzer.cargo.extraArgs\": [\"-Z\", \"unstable-options\"]\n}" > app/.vscode/settings.json
    mv app "$out"
  '';
}
