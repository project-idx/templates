{ pkgs, backend ? "go", ... }: {
  packages = if backend == "node" then [ pkgs.nodejs_20 ] else [];
  bootstrap = ''
    cp -rf ${./.}/${backend} "$WS_NAME"
    chmod -R +w "$WS_NAME"
    mv "$WS_NAME" "$out"

    mkdir "$out/.idx"
    chmod -R u+w "$out"
    cp .idx/airules.md "$out/.idx"
    cp gemini.md "$out"
    
    ${if backend == "node" then "( cd \$out && npm i --package-lock-only --ignore-scripts )" else ""}
  '';
}
