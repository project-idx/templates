# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [ pkgs.python3 ];
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [ "ms-python.python" ];
    workspace = {
      # Runs when a workspace is first created with this `dev.nix` file
      onCreate = {
        install = "python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt";
        samples = "git clone https://github.com/google/adk-samples";
        web = "devserver.sh";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [
          "README.md"
          "./multi_tool_agent/.env.local"
          "./multi_tool_agent/agent.py"
        ];
      };
      # Runs each time the workspace is (re)started
      onStart = {
        install = "python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt";
        samples = "git clone https://github.com/google/adk-samples";
        web = "devserver.sh";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [
          "README.md"
          "./multi_tool_agent/.env.local"
          "./multi_tool_agent/agent.py"
        ];
      };
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = [ "devserver.sh" ];
          manager = "web";
          env = {
            PORT = "$PORT";
            FIREBASE_STUDIO = "1";
          };
        };
      };
    };
  };
}
