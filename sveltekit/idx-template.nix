# /opt/nix/store/qgx9xsmmwjkflakfcxz52ncmihhr3mg9-idx-env-usr-target/bin/idx-template ~/Monospace/workspace/nix_templates/sveltekit --output-dir ~ --workspace-name foo -a '{"template": "default", "types": "checkjs", "prettier": "true", "eslint": "true", "playwright": "true", "vitest": "true"}'
{ pkgs, template, types, eslint ? false, prettier ? false, playwright ? false, vitest ? false, ... }: {
    packages = [
      pkgs.nodejs_20
    ];
    bootstrap = ''
      mkdir -p "$WS_NAME"

      cp ${./package.json} ./package.json
      cp ${./init.js} ./init.js

      # install every time so that we get latest version of `create-svelte`
      npm install
      node init.js name="$WS_NAME" --template=${template} --types=${types} prettier=${toString prettier} eslint=${toString eslint} playwright=${toString playwright} vitest=${toString vitest}

      chmod -R +w "$WS_NAME"
      cp -rf "$WS_NAME" "$out"

      mkdir "$out"/.idx/
      cp ${./dev.nix} "$out"/.idx/dev.nix
      chmod +w "$out"/.idx/dev.nix

      cd "$out"; npm install --package-lock-only --ignore-scripts
    '';
}
