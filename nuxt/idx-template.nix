/*
  Copyright 2024 Google LLC
  
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.  
  
  You may obtain a copy of the License at
  
   https://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed  
  under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing  
  permissions and
  limitations under the License.
*/
{ pkgs, packageManager, ... }: {

    packages = [
      pkgs.nodejs_20
      pkgs.git
    ];

    # Available options as of 1/17/2024
    # https://github.com/nuxt/cli/blob/f113a083f000d19c9ae7f35ae2534ac5c0dba77b/src/commands/init.ts
    # npx nuxi@latest init nuxt-idx --package-manager bun --install true --git-init true --force true

    # To test this configuration:
    # /nix/store/mvr5wczap3ga80iq548n2griy8kx9ksx-idx-template/bin/idx-template ~/Monospace/workspace/nix_templates/nuxt --output-dir ~ --workspace-name foo -a '{"packageManager": "bun"}'

    bootstrap = ''
      npx nuxi@latest -y init "$out" \
        --package-manager ${packageManager} \
        --no-install \
        --git-init

      mkdir "$out"/.idx
      cp ${./dev.nix} "$out"/.idx/dev.nix
      chmod -R +w "$out"

      sed -i "s/PACKAGE_MANAGER/${packageManager}/g" "$out"/.idx/dev.nix

      sed -i "s/PM_COMMAND/${
        if packageManager == "npm" then
          "npm ci --no-audit --prefer-offline --no-progress --timing"
        else
          "${packageManager} install"        
      }/g" "$out"/.idx/dev.nix

      sed -i "s/PM_NIX_PACKAGE/${
        if packageManager == "npm" then
          ""
        else if packageManager == "pnpm" then
          "pkgs.nodePackages.pnpm"
        else if packageManager == "bun" then
          "pkgs.bun"
        else
          "pkgs.yarn"
      }/g" "$out"/.idx/dev.nix

      ${if packageManager == "npm" then "( cd \$out && npm i --package-lock-only --ignore-scripts )" else ""}
    '';
}