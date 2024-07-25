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
{ pkgs, environment ? "js-web", useLangChain ? false, ... }: {
    packages = if environment == "js-web" then [ pkgs.nodejs_20 ] else [];
  bootstrap = ''
    cp -rf ${./.}/${environment} "$WS_NAME"
    chmod -R +w "$WS_NAME"
    ${if useLangChain then "cp -rf ${./.}/langchain-overlay/${environment}/* $WS_NAME" else "" }
    chmod -R +wx "$WS_NAME"
    ${if useLangChain && environment == "js-web" then "mv $WS_NAME/example.env $WS_NAME/.env" else "" }
    mv "$WS_NAME" "$out"
    ${if environment == "js-web" then "( cd \$out && npm i --package-lock-only --ignore-scripts )" else ""}
  '';
}