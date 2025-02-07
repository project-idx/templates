/*

rm -rf ./test && \
idx-template \
  /home/user/community-templates/dataconnect \
  --output-dir /home/user/community-templates/template-test -a '{}'

*/
{pkgs, platform ? "web", appType ? "blank", ... }: {
  packages = [
    pkgs.nodejs_20
    pkgs.git
  ];

  bootstrap = let 
    platformPrefix = if platform == "web" then "js" else "flutter";
    suffix = if platform == "web" && appType == "quickstart" then "movie-app" else if platform == "flutter" && appType == "quickstart" then "movie" else appType;
    sample = "${platformPrefix}-${suffix}";
    in ''
    mkdir "$out"
    chmod -R u+w "$out"
    mkdir "$out"/.idx
    ${
    if sample == "quickstart-js" then "git clone -b mtewani/idx-updates --single-branch https://github.com/firebase/quickstart-js \"$out\"" else ""}
    ${
    if sample == "flutter-blank" || sample == "flutter-movie" then "cp -r ${./flutter}/dev.nix \"$out\"/.idx/dev.nix"
      else "cp ${./.}/${sample}/dev.nix \"$out\"/.idx/dev.nix"
    }
    
    ${
      if sample == "js-blank" then "cp -r ${./nextjs-blank}/* \"$out\""
      else if sample == "flutter-blank" then "cp -r ${./flutter-blank}/* \"$out\""
      else if sample == "flutter-movie" then "cp -r ${./flutter-movie}/* \"$out\""
      else ""
    }
    chmod -R u+w "$out"
    ${
      if sample == "flutter-blank" || sample == "flutter-movie" then "cp ${./flutter}/Caddyfile \"$out\"/" else ""
    }
    ${
      if sample == "flutter-blank" || sample == "flutter-movie" then "cp ${./flutter}/error_handler.dart \"$out\"/lib/" else ""
    }
    ${
      if sample == "js-quickstart" then "
        mv \"$out\"/app/src/lib/firebase.idx.tsx \"$out\"/app/src/lib/firebase.tsx  
        mv \"$out\"/app/vite.config.idx.ts \"$out\"/app/vite.config.ts 
      " else ""
    }
    cp ${./.firebaserc} "$out"/.firebaserc
    cp ${./.graphqlrc.yaml} "$out"/.graphqlrc.yaml
    mkdir "$out"/.vscode
    cp ${./.vscode/settings.json} "$out"/.vscode/settings.json
    chmod -R u+w "$out"
  '';
}
