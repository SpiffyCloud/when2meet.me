#!/bin/sh

set -o errexit
set -o pipefail
set -o nounset

echo 'Installing NPM dependencies'

# Install dependencies
cd /app
npm install --prefer-offline --no-audit --progress=false

# Run whatever was passed as arguments
exec $@
