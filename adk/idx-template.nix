{ pkgs, ... }: {
  packages = [
    pkgs.python3
  ];
  bootstrap = ''
    mkdir "$out"
    mkdir "$out"/.idx
    mkdir "$out"/.gemini
    mkdir "$out"/multi_tool_agent
    cp -r ${./.idx}/. "$out/.idx/"
    cp -f ${./.gitignore} "$out/.gitignore"
    cp -f ${./requirements.txt} "$out/requirements.txt"
    cp -f ${./llms-full.txt} "$out/llms-full.txt"
    cp -f ${./.gemini/settings.json} "$out/settings.json"
    cp -f ${./multi_tool_agent} "$out/multi_tool_agent"

    cp ${./README_TEMPLATE.md} "$out"/README.md

    cp ${./.idx/airules.md} "$out/.idx/airules.md"
    cp ${./.idx/airules.md} "$out/GEMINI.md"
    cp ${./AGENTS.md} "$out/AGENTS.md"
    chmod -R u+w "$out"
  '';
}
