/*

rm -rf ./test && \
idx-template \
  /home/user/<workspace>/data-connect \
  --output-dir /home/user/<workspace>/test -a '{}'

*/
{pkgs, ... }: {
  packages = [
    pkgs.postgresql
  ];

  bootstrap = ''
    mkdir "$out"
    initdb -D "$out"/local
    mkdir "$out"/.idx
    cp -r ${./dev}/* "$out"
    cp ${./dev}/.firebaserc "$out"/.firebaserc
    cp ${./dev}/.graphqlrc.yaml "$out"/.graphqlrc.yaml
    cp ${./dev.nix} "$out"/.idx/dev.nix
    chmod -R u+w "$out"
  '';
}