{ pkgs, ... }: {
  packages = [ pkgs.cargo ];

  bootstrap = ''
    cargo new app
    mkdir -p app/.idx
    cp ${./dev.nix} app/.idx/dev.nix
    chmod +w app/.idx/dev.nix
    mv app "$out"
  '';
}