{ pkgs, ... }: {
  packages = [ pkgs.dart ];
  bootstrap = ''
    export HOME=/home/user
    export PATH="$PATH":"$HOME/.pub-cache/bin"
    dart create -t server-shelf $WS_NAME

    mkdir -p "$WS_NAME/.idx"
    cp ${./app/dev.nix} "$WS_NAME/.idx/dev.nix"
    cp ${./app/watcher.dart} "$WS_NAME/watcher.dart"

    chmod -R +w "$WS_NAME"
    mv "$WS_NAME" "$out"
  '';
}