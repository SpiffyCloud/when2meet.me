#!/bin/bash

docker exec when2meet_django_1 coverage run --source='/app/api' manage.py test
docker exec when2meet_django_1 coverage report

exit 0
