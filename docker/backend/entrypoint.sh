#!/bin/sh

set -o errexit
set -o pipefail
set -o nounset

echo "Waiting for database to come online..."

while ! nc -z "$SQL_HOST" 5432; do
  sleep 0.1
done

# Run whatever was passed to us as arguments (e.g. dev.sh, prod.sh, or test.sh)
exec "$@"
