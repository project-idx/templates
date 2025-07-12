{ pkgs, ... }: {
  bootstrap = ''
    cp -rf ${./.}/app "$WS_NAME"
    chmod -R +w "$WS_NAME"
    chmod +x "$WS_NAME"/devserver.sh
    mv "$WS_NAME" "$out"

    mkdir -p "$out/.idx"
    chmod -R u+w "$out"
    cp .idx/airules.md "$out/.idx"
    cp gemini.md "$out"
  '';
}