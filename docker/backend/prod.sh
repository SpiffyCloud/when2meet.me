#!/bin/sh

set -o errexit
set -o pipefail
set -o nounset

gunicorn --bind :8000 --workers 3 config.wsgi
