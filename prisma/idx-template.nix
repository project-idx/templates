{pkgs, database ? "app-ppg", ... }: {
  packages = [
    pkgs.nodejs_20
  ];

  bootstrap = let 
    databaseSuffix = if database == "ppg" then "ppg" else "sqlite";
    sample = "app-${databaseSuffix}";
    in ''
    mkdir "$out"
    cp -rf ${./.}/${database} "$out"
    chmod -R u+w "$out"
  '';
}