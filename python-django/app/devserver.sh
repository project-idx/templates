#!/bin/sh
source .venv/bin/activate
python mysite/manage.py runserver $PORT
