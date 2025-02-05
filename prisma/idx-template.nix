{pkgs, database ? "ppg", ... }: {
  packages = [
    pkgs.nodejs_20
  ];

  bootstrap = let 
    databaseSuffix = if database == "ppg" then "ppg" else "sqlite";
    sample = "app-${databaseSuffix}";
    in ''
    mkdir "$out"
    chmod -R u+w "$out"
    ${
      if sample == "app-ppg" then "cp -r ${./app-ppg}/* \"$out\""
      else "cp -r ${./app-sqlite}/* \"$out\""
    }
    chmod -R u+w "$out"
  '';
}