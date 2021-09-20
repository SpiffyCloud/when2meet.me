#!/bin/sh

set -o errexit
set -o pipefail
set -o nounset

python manage.py migrate --settings=config.settings.prod
gunicorn --bind :8000 --workers 3 config.wsgi

exit 0
