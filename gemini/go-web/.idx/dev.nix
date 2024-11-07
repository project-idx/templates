# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  channel = "stable-24.05"; # "stable-23.11" or "unstable"
  # Use https://search.nixos.org/packages to  find packages
  packages = [
    pkgs.go
  ];
  # Sets environment variables in the workspace
  env = {};
  # search for the extension on https://open-vsx.org/ and use "publisher.id"
  idx.extensions = [
    "golang.go"
  ];
  idx.workspace = {
    # Runs when a workspace is first created with this `dev.nix` file
    onCreate = {
      # Example: install JS dependencies from NPM
      # npm-install = "npm install";
      # Open editors for the following files by default, if they exist:
      default.openFiles = [ "static/index.html" "cmd/web/main.go" ];
    };
    # To run something each time the workspace is (re)started, use the `onStart` hook
  };
  # preview configuration, identical to monospace.json
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = ["go" "run" "./cmd/web" "-addr" "localhost:$PORT"];
        manager = "web";
      };
    };
  };
}
