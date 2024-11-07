{ pkgs, ... }: {
  channel = "stable-23.11";

  packages = [
    pkgs.nodejs_20
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
        npm-install = "npm install";
        default.openFiles = [
          "server.js" "database.js" "README.md"
        ];
      };
      onStart = {
        start-database = "mongod --port 27017 --fork --logpath ./.idx/database.log --dbpath ./.idx/.data";
        run-server = "node server.js";
      };
    };

    previews = {
    };
  };
}
