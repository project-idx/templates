#!/bin/sh
source .venv/bin/activate
adk web --port=$PORT --host=0.0.0.0 .
