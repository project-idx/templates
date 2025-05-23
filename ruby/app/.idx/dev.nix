# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.ruby
    pkgs.bundler
    pkgs.gcc
    pkgs.gnumake
  ];
  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "Shopify.ruby-lsp"
    ];
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        bundle-install = "bundle install";
        # Open editors for the following files by default, if they exist:
        default.openFiles = ["app.rb"];
      };
      # Runs when a workspace is (re)started
      onStart= {
        run-server = "bundle exec rerun 'ruby app.rb'";
      };
    };
  };
}