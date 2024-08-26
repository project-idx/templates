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