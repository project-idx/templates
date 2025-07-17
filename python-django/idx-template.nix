{ pkgs, ... }: {
  bootstrap = ''
    cp -rf ${./.}/app "$WS_NAME"
    chmod -R +w "$WS_NAME"
    chmod +x "$WS_NAME"/devserver.sh
    mv "$WS_NAME" "$out"

    mkdir -p "$out/.idx"
    chmod -R u+w "$out"
    cp -rf ${./app/.idx/airules.md} "$out/.idx/airules.md"
    cp -rf "$out/.idx/airules.md" "$out/GEMINI.md"
    chmod -R u+w "$out"
  '';
}
