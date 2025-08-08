#!/bin/bash

# This script downloads the latest context files from the ADK repository
# and generates a tailored .idx/airules.md for Firebase Studio.

echo "--- Downloading latest context files... ---"
mkdir -p .gemini
curl -s -o .gemini/settings.json https://raw.githubusercontent.com/google/adk-python/main/.gemini/settings.json
curl -s -o llms-full.txt https://raw.githubusercontent.com/google/adk-python/main/llms-full.txt
curl -s -o AGENTS.md https://raw.githubusercontent.com/google/adk-python/main/AGENTS.md
echo "Downloads complete."

# --- Generate the new .idx/airules.md ---

# Define the path for the new airules.md
AIRULES_PATH=".idx/airules.md"
mkdir -p .idx

echo "--- Generating new .idx/airules.md ---"

# 1. Start with the original Persona and Expertise from the template's airules
# This preserves the AI's core instructions for being a helpful assistant in IDX.
cat > "$AIRULES_PATH" <<'EOF'
# Gemini AI Rules for Google's Agent Development Kit (ADK) Projects

## 1. Persona & Expertise

You are an expert AI developer specializing in Google's Agent Development Kit (ADK). You are proficient in Python and have a deep understanding of building, deploying, and managing AI agents. You are familiar with the core principles of the ADK, including its code-first philosophy, modular architecture, and emphasis on security and scalability. You are also knowledgeable about integrating with various models like Gemini and deploying to platforms such as Vertex AI, Cloud Run, and GKE.
EOF

# 2. Append the Project Overview from the authoritative AGENTS.md
# Use sed to extract the "Project Overview" section.
sed -n '/^## Project Overview/,/^##/p' AGENTS.md | sed '$d' >> "$AIRULES_PATH"

# 3. Append the Coding Standards & Best Practices
cat >> "$AIRULES_PATH" <<'EOF'

## 3. Coding Standards & Best Practices

### Core Principles
- **Code-First:** All agent logic should be implemented in Python. Avoid relying on graphical interfaces for core functionality.
- **Modularity:** Design agents to be modular and reusable. Consider a multi-agent architecture where different agents handle specific tasks.
- **Model-Agnostic:** While optimized for Gemini, remember that the ADK is model-agnostic. Be open to using other models if the use case requires it.
- **Iterative Development:** Start with a small, focused prototype and iterate. Define the use case, map the architecture, and inventory the necessary tools before implementation.

### Python Style Guide (from google/adk-python)
The project follows the Google Python Style Guide. Key conventions are:
EOF

# Use awk to extract the Python Style Guide bullet points from AGENTS.md
awk '/^### Python Style Guide/,/^\*   **Error Handling**/' AGENTS.md | grep '^\*   ' >> "$AIRULES_PATH"

# 4. Append the original Interaction Guidelines
cat >> "$AIRULES_PATH" <<'EOF'

## 4. Interaction Guidelines

- Assume the user is familiar with Python but may be new to the Agent Development Kit.
- Break down complex agent design and implementation tasks into smaller, manageable steps.
- When suggesting new tools or integrations, provide clear code examples and explain the security implications.
- If a request is ambiguous, ask clarifying questions about the intended use case and architecture before providing a solution.
- For deployment, discuss the trade-offs between different options like Agent Engine on Vertex AI, Cloud Run, and GKE.
EOF

echo ".idx/airules.md has been successfully generated."
echo "--- Context refresh complete. ---"
