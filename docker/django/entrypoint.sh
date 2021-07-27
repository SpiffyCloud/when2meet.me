#!/bin/sh

# Common behavior run in all environments

set -o errexit
set -o pipefail
set -o nounset

echo "Waiting for database..."

while ! nc -z "$SQL_HOST" 5432; do
  sleep 0.1
done

echo "Checking for secrets..."

if [ ! -f /secrets.json ]; then
  echo 'Missing secrets.json! Aborting...'
  exit 1
fi

# Run whatever was passed to us as arguments
exec "$@"
