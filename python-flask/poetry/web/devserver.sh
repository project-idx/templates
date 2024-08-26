#!/bin/sh
export PATH="$HOME/.local/bin:$PATH"

poetry install
source .venv/bin/activate

if ! grep -q "$PATH" /home/user/.bashrc; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> /home/user/.bashrc
fi

python -m flask --app src/main run -p $PORT --debug