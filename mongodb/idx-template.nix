{ pkgs, environment ? "blank", ... }: {
  bootstrap = ''
    cp -rf ${./.}/${environment} "$WS_NAME"
    chmod -R +w "$WS_NAME"
    mv "$WS_NAME" "$out"

    mkdir "$out/.idx"
    chmod -R u+w "$out"
    cp .idx/airules.md "$out/.idx"
    cp gemini.md "$out"
  '';
}