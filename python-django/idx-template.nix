{ pkgs, ... }: {
  bootstrap = ''
    cp -rf ${./.}/app "$WS_NAME"
    chmod -R +w "$WS_NAME"
    chmod +x "$WS_NAME"/devserver.sh
    mv "$WS_NAME" "$out"
  '';
}