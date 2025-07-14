{ pkgs, template ? "web", typescript ? false, ... }: {
  bootstrap = ''
    cp -rf ${./.}/${template}${if typescript then "-ts" else ""} "$WS_NAME"
    chmod -R +w "$WS_NAME"
    mv "$WS_NAME" "$out"

    mkdir -p "$out/.idx"
    chmod -R u+w "$out"
    cp -r ${./.idx/airules.md} "$out/.idx"
    cp gemini.md "$out"
  '';
}