#!/bin/bash

# This script downloads the latest context files from the ADK repository
# and generates a tailored .idx/airules.md for Firebase Studio.

echo "--- Downloading latest context files... ---"
mkdir -p .gemini
curl -s -o .gemini/settings.json https://raw.githubusercontent.com/google/adk-python/main/.gemini/settings.json
curl -s -o llms-full.txt https://raw.githubusercontent.com/google/adk-python/main/llms-full.txt
curl -s -o AGENTS.md https://raw.githubusercontent.com/google/adk-python/main/AGENTS.md
echo "Downloads complete."

# --- Update the .idx/airules.md file in-place ---

AIRULES_PATH=".idx/airules.md"

if [ ! -f "$AIRULES_PATH" ]; then
    echo "ERROR: .idx/airules.md not found. Please ensure the file exists." >&2
    exit 1
fi

echo "--- Updating .idx/airules.md from AGENTS.md ---"

# Extract Project Overview and replace the content within the markers
OVERVIEW=$(sed -n '/^## Project Overview/,/^##/p' AGENTS.md | sed '$d')
sed -i.bak -e "/<!-- BEGIN_PROJECT_OVERVIEW -->/,/<!-- END_PROJECT_OVERVIEW -->/{ /<!-- BEGIN_PROJECT_OVERVIEW -->/{p; r /dev/stdin
}; /<!-- END_PROJECT_OVERVIEW -->/!d; }" "$AIRULES_PATH" <<< "$OVERVIEW"

# Extract Style Guide and replace the content within the markers
STYLE_GUIDE=$(awk '/^### Python Style Guide/,/^\*   **Error Handling**/' AGENTS.md | grep '^\*   ')
# Create a temporary file for the style guide content
STYLE_GUIDE_CONTENT=$(cat <<EOF
### Python Style Guide (from google/adk-python)
The project follows the Google Python Style Guide. Key conventions are:
$STYLE_GUIDE
EOF
)
sed -i.bak -e "/<!-- BEGIN_STYLE_GUIDE -->/,/<!-- END_STYLE_GUIDE -->/{ /<!-- BEGIN_STYLE_GUIDE -->/{p; r /dev/stdin
}; /<!-- END_STYLE_GUIDE -->/!d; }" "$AIRULES_PATH" <<< "$STYLE_GUIDE_CONTENT"

rm "${AIRULES_PATH}.bak"

echo ".idx/airules.md has been successfully updated."
echo "--- Context refresh complete. ---"
