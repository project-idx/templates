/*
rm -rf ./test && \
idx-template \
  /home/user/g \
  --output-dir /home/user/g/test -a '{ "language": "go", "tos": "true" }'
*/
{pkgs, language ? "js", tos ? "false", ... }: {  
  packages = [
    pkgs.nodejs
    pkgs.go
  ];
  bootstrap = ''
    mkdir "$out"
    mkdir "$out"/.idx
    cp ${./dev.nix} "$out"/.idx/dev.nix
    cp ${./README.md} "$out"/README.md
    ${if language == "go" then "env -C \"$out\" go mod init genkit" else "" }
    chmod -R u+w "$out"
  '';
}
