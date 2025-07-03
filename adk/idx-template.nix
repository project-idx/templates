{ pkgs, ... }: {
  packages = [
    pkgs.python3
  ];
  bootstrap = ''
    cp -rf ${./.} "$out"
    chmod -R +wx "$out"
    rm -rf "$out/.git" "$out/idx-template".{nix,json}
  '';
}