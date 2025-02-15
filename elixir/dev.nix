# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.gh
    pkgs.nodejs_23
    pkgs.elixir_1_18
    pkgs.elixir-ls
  ];
  # Sets environment variables in the workspace
  env = {
    
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    #elixir-ls is being used as default extension, uncomment other ones to use them too...
    extensions = [
      "krish-r.vscode-toggle-terminal"
      "elixir-lsp.elixir-ls"
      #"lexical-lsp.lexical"
      #"elixir-tools.elixir-tools"
      "paulo-silva.elixir-test"
      #"fermuch.surface"
      "benvp.vscode-hex-pm-intellisense"
      "victorbjorklund.phoenix"

    ];
    workspace = {
      onCreate = {
        # Open editors for the following files by default, if they exist:
        #default.openFiles = ["src/"];
      };
    };
    # Enable previews and customize configuration
    previews = {};
  };
}