#!/bin/sh

set -o errexit
set -o pipefail
set -o nounset

echo "Waiting for postgres..."

while ! nc -z postgres 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

echo "Checking Secrets..."

if [ ! -f local-secrets.json ]; then
  cp sample-secrets.json local-secrets.json
  sed -i "s/sample-secrets.json/local-secrets.json/g" local-secrets.json
fi

echo "Importing data..."

python manage.py makemigrations #  FIXME: is this a good idea?
python manage.py migrate
python manage.py loaddata config/fixtures/*.json

exec "$@"

# 2021.07.16-DEA
