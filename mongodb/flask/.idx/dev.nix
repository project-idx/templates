{ pkgs, ... }: {
  channel = "stable-23.11";

  packages = [
    pkgs.python3
  ];

  services.mongodb = {
    enable = true;
  };

  idx = {
    extensions = [
      "mongodb.mongodb-vscode"
    ];

    workspace = {
      onCreate = {
        create-venv = "
          python -m venv .venv && \
          source .venv/bin/activate && \
          pip install -r requirements.txt
        ";
        default.openFiles = [
          "app.py" "README.md"
        ];
      };
      onStart = {
        start-database = "mongod --port 27017 --fork --logpath ./.idx/database.log --dbpath ./.idx/.data";
        run-server = "source .venv/bin/activate && ./devserver.sh";
        run-tests = "source .venv/bin/activate && python -m unittest test_app.py";
      };
    };

    previews = {
      enable = true;
      previews = {
      };
    };
  };
}
