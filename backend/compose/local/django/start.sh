#!/bin/sh

set -o errexit
set -o pipefail
set -o nounset

python manage.py makemigrations #  FIXME: is this a good idea?
python manage.py migrate
python manage.py runserver 0.0.0.0:8000

# 2021.07.16-DEA
