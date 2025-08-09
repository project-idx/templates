#!/bin/bash

# This script downloads the latest context files from the ADK repository
# and uses the Gemini CLI to update the .idx/airules.md file.
# This is an EXPERIMENTAL alternative to the sed/awk-based script.

echo "--- Downloading latest context files... ---"
mkdir -p .gemini
curl -s -o .gemini/settings.json https://raw.githubusercontent.com/google/adk-python/main/.gemini/settings.json
curl -s -o llms-full.txt https://raw.githubusercontent.com/google/adk-python/main/llms-full.txt
curl -s -o AGENTS.md https://raw.githubusercontent.com/google/adk-python/main/AGENTS.md
echo "Downloads complete."

# --- Define file paths ---
AIRULES_PATH=".idx/airules.md"
AIRULES_NEW_PATH=".idx/airules.md.new"

if [ ! -f "$AIRULES_PATH" ]; then
    echo "ERROR: $AIRULES_PATH not found. Cannot proceed." >&2
    exit 1
fi

echo "--- Updating .idx/airules.md using Gemini CLI... ---"

# --- The Gemini CLI Prompt ---
# This prompt instructs the model to act like a precise file-updating tool.
# It's told to only replace specific sections and preserve everything else.
PROMPT="You are a script that updates one file based on another. Your task is to update the file '$AIRULES_PATH' using content from 'AGENTS.md'.

The target audience for '$AIRULES_PATH' is an AI assistant. The goal is to give it a clear persona and the most relevant, high-level context for helping a developer who is *using* the ADK, not contributing to it.

Follow these instructions precisely:
1.  In the file '$AIRULES_PATH', locate the section that starts with '## Project Overview'.
2.  Replace the entire content of that section with the content of the '## Project Overview' section from the file 'AGENTS.md'.
3.  In the file '$AIRULES_PATH', locate the section that starts with '### Python Style Guide'.
4.  Replace the entire content of that section with the content of the '### Python Style Guide' section from 'AGENTS.md'.
5.  Preserve ALL other content and formatting in '$AIRULES_PATH' exactly as it is. Do not add, remove, or rephrase any other text.
6.  If there are new sections in AGENTS.md that would be highly relevant to a developer *using* the ADK (not contributing to it), you may cautiously add them. Otherwise, do not add new sections.
7.  Your goal is to make the minimum number of changes necessary. Only add, edit, or remove content in the target sections if the corresponding source content in 'AGENTS.md' has changed. Do not rephrase or 'improve' content that is unchanged.
8.  Output only the full, updated content of the '$AIRULES_PATH' file."

# --- Execute the Gemini CLI command ---
# The --context flag provides both files to the model.
# Output is redirected to a new file.
gemini "$PROMPT" --context "$AIRULES_PATH,.template_admin/AGENTS.md" > "$AIRULES_NEW_PATH"

# Check if the new file was created and has content
if [ -s "$AIRULES_NEW_PATH" ]; then
    # Replace the old file with the new one
    mv "$AIRULES_NEW_PATH" "$AIRULES_PATH"
    echo ".idx/airules.md has been successfully updated by Gemini CLI."
else
    echo "ERROR: Gemini CLI failed to generate a new airules.md file." >&2
    # Clean up the empty new file if it exists
    rm -f "$AIRULES_NEW_PATH"
    exit 1
fi

echo "--- Context refresh with Gemini CLI complete. ---"
