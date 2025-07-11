{ pkgs, environment ? "js-web", useLangChain ? false, ... }: {
    packages = if environment == "js-web" then [ pkgs.nodejs_20 ] else [];
  bootstrap = ''
    cp -rf ${./.}/${environment} "$WS_NAME"
    chmod -R +w "$WS_NAME"
    ${if useLangChain then "cp -rfa ${./.}/langchain-overlay/${environment}/. $WS_NAME" else "" }
    chmod -R +wx "$WS_NAME"
    ${if useLangChain && environment == "js-web" then "mv $WS_NAME/example.env $WS_NAME/.env" else "" }
    mv "$WS_NAME" "$out"

    mkdir "$out/.idx"
    chmod -R u+w "$out"
    cp .idx/airules.md "$out/.idx"
    cp gemini.md "$out"
    
    ${if environment == "js-web" then "( cd \$out && npm i --package-lock-only --ignore-scripts )" else ""}
  '';
}