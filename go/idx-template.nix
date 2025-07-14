{ pkgs, environment ? "web", ... }: {
  bootstrap = ''
    cp -rf ${./.}/${environment} "$WS_NAME"
    chmod -R +w "$WS_NAME"
    mv "$WS_NAME" "$out"

    mkdir -p "$out/.idx"
    chmod -R u+w "$out"
    cp -r ${./.idx/airules.md} "$out/.idx/airules.md"
    
  '';
}