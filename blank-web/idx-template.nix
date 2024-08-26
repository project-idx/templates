{ pkgs, ... }: {
  packages = [];
  bootstrap = ''
    cp -rf ${./app} "$out"
    chmod -R +w "$out"
  '';
}