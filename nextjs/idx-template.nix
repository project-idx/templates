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
{ pkgs, version ? "latest", importAlias ? "@/*",  language ? "ts", packageManager ? "npm", srcDir ? false, eslint ? false, app ? false, tailwind ? false, ... }: {
	
    packages = [
			pkgs.nodejs_20
			pkgs.yarn
			pkgs.nodePackages.pnpm
			pkgs.bun
    ];

    bootstrap = ''
		  if [ -d "/opt/create-next-app" ]; then
			  NEXT_CMD="node /opt/create-next-app/index.js --skip-install"
			else
			  NEXT_CMD="npx --yes create-next-app@${version}"
			fi

			mkdir "$out"
			$NEXT_CMD "$out" \
				--import-alias=${importAlias} \
				--${language} \
				--use-${packageManager} \
				${if eslint then "--eslint" else "--no-eslint" } \
				${if srcDir then "--src-dir" else "--no-src-dir" } \
				${if app then "--app" else "--no-app" } \
				${if tailwind then "--tailwind" else "--no-tailwind" }

			mkdir -p "$out"/.idx
  		cp ${./dev.nix} "$out"/.idx/dev.nix
			chmod -R +w "$out"

			${if packageManager == "npm" then "( cd \$out && npm i --package-lock-only --ignore-scripts )" else ""}
    '';
}
