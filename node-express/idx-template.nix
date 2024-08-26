{ pkgs, template ? "web", typescript ? false, ... }: {
  bootstrap = ''
    cp -rf ${./.}/${template}${if typescript then "-ts" else ""} "$WS_NAME"
    chmod -R +w "$WS_NAME"
    mv "$WS_NAME" "$out"
  '';
}