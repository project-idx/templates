{ pkgs, ... }: {
  channel = "stable-24.11";
  packages = [ pkgs.nodejs_20 ];
  bootstrap = ''
    npx --prefer-offline -y @angular/cli new --skip-git --defaults --skip-install --directory "$WS_NAME" "$WS_NAME"
    mkdir "$WS_NAME"/.idx
    cp ${./dev.nix} "$WS_NAME"/.idx/dev.nix && chmod +w "$WS_NAME"/.idx/dev.nix
    mv "$WS_NAME" "$out"
    
    mkdir -p "$out/.idx"
    chmod -R u+w "$out"
    cp -r ${./.idx/airules.md} "$out/.idx"
    

    (cd "$out"; npm install --package-lock-only --ignore-scripts)
  '';
}
