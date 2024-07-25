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
{pkgs, template ? "basics", version ? "latest", packageManager ? "npm", typescript ? "strict", git ? true, tailwind ? false, ... }: {
  packages = [
    pkgs.nodejs_20
    pkgs.yarn
    pkgs.nodePackages.pnpm
    pkgs.bun
    pkgs.j2cli
    pkgs.nixfmt
  ];

  bootstrap = ''
    mkdir "$out"
    ${
      if packageManager == "npm" then "npm create astro@${version} \"$out\" -- --template ${template} --typescript ${typescript} ${if git then "--git" else "--no-git" } --no-install"
      else if packageManager == "yarn" then "yarn create astro \"$out\" --template ${template} --typescript ${typescript} ${if git then "--git" else "--no-git" } --no-install" 
      else if packageManager == "pnpm" then "pnpm create astro \"$out\" --template ${template} --typescript ${typescript} ${if git then "--git" else "--no-git" } --no-install"
      else if packageManager == "bun" then "bun create astro \"$out\" --template ${template} --typescript ${typescript} ${if git then "--git" else "--no-git" } --no-install"
      else "npm create astro@${version} \"$out\" -- --template ${template} --typescript ${typescript} ${if git then "--git" else "--no-git" } --no-install"
    }

    mkdir -p "$out"/.idx
    packageManager=${packageManager} tailwind=${if tailwind then "true" else "false"} j2 ${./devNix.j2} -o "$out"/.idx/dev.nix
    nixfmt "$out"/.idx/dev.nix

    ${if packageManager == "npm" then "( cd \$out && npm i --package-lock-only --ignore-scripts )" else ""}
  '';
}
