{pkgs, database ? "ppg", ... }: {
  packages = [
    pkgs.nodejs_20
  ];

  bootstrap = let 
    databaseSuffix = if database == "ppg" then "ppg" else "sqlite";
    sample = "app-${databaseSuffix}";
    in ''
    mkdir "$out"
    mkdir "$out"/.idx
    cp -rf ${./.}/${sample}/* "$out"
    chmod -R u+w "$out"
    install --mode u+rw ${./.}/${sample}/.idx/dev.nix "$out"/.idx/dev.nix

    mkdir -p "$out/.idx"
    chmod -R u+w "$out"
    cp -r ${./.idx/airules.md} "$out/.idx/airules.md"
    
    '';
}