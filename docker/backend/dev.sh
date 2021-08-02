#!/bin/sh

set -o errexit
set -o pipefail
set -o nounset

echo "Importing data..."

python manage.py makemigrations
python manage.py migrate
python manage.py loaddata config/fixtures/*.json
python manage.py runserver 0.0.0.0:8000

exit 0
