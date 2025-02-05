{pkgs, database ? "ppg", ... }: {
  packages = [
    pkgs.nodejs_20
  ];

  bootstrap = let 
    databaseSuffix = if database == "ppg" then "ppg" else "sqlite";
    sample = "app-${databaseSuffix}";
    in ''
    mkdir "$out"
    cp -rf ${./.}/${sample}/* "$out"
    cp ${./.}/${sample}/.idx/dev.nix "$out"/.idx/dev.nix
    chmod -R u+w "$out"
    install --mode u+rw ${./dev.nix} "$out"/.idx/dev.nix
    '';
}