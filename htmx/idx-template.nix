{ pkgs, backend ? "go", ... }: {
  packages = if backend == "node" then [ pkgs.nodejs_20 ] else [];
  bootstrap = ''
    cp -rf ${./.}/${backend} "$WS_NAME"
    chmod -R +w "$WS_NAME"
    mv "$WS_NAME" "$out"

    mkdir -p "$out/.idx"
    chmod -R u+w "$out"
    cp -rf ${./.idx/airules.md} "$out/.idx/airules.md"
    cp -rf "$out/.idx/airules.md" "$out/GEMINI.md"
    
    ${if backend == "node" then "( cd \$out && npm i --package-lock-only --ignore-scripts )" else ""}
  '';
}
