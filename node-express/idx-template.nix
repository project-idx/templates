{ pkgs, template ? "web", typescript ? false, ... }: {
  bootstrap = ''
    cp -rf ${./.}/${template}${if typescript then "-ts" else ""} "$WS_NAME"
    chmod -R +w "$WS_NAME"
    mv "$WS_NAME" "$out"

    mkdir -p "$out/.idx"
    chmod -R u+w "$out"
    cp -rf ${./.idx/airules.md} "$out/.idx/airules.md"
    cp -rf "$out/.idx/airules.md" "$out/gemini.md"
  '';
}