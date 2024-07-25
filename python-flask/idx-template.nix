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
{ pkgs, packageManager ? "pip", type ? "web", ... }: {
  packages = [
    pkgs.j2cli
    pkgs.nixfmt
  ];
  bootstrap = ''
    cp -rf ${./.}/${packageManager}/${type} "$WS_NAME"
    chmod -R +w "$WS_NAME"
    chmod +x "$WS_NAME"/devserver.sh
    mkdir -p "$WS_NAME"/.idx
    packageManager=${packageManager} type=${type} j2 ${./devNix.j2} -o "$WS_NAME"/.idx/dev.nix
    nixfmt "$WS_NAME"/.idx/dev.nix
    mv "$WS_NAME" "$out"
  '';
}
