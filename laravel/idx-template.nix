{ pkgs, version ? "latest", ... }: {
	
    packages = [
      pkgs.php82
      pkgs.php82Packages.composer
      pkgs.nodejs_20
    ];

    bootstrap = ''
      mkdir composer-home
      export COMPOSER_HOME=./composer-home
			mkdir "$out"
      composer create-project laravel/laravel "$out"
			mkdir -p "$out"/.idx
  		cp ${./dev.nix} "$out"/.idx/dev.nix

      cp -rf ${./.idx/airules.md} "$out/.idx/airules.md"
      cp -rf "$out/.idx/airules.md" "$out/GEMINI.md"
      chmod -R u+w "$out"
    '';
}