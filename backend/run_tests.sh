#!/bin/bash
# docker exec django-app python manage.py test
docker exec django-app coverage run --source='./api' manage.py test
docker exec django-app coverage report
docker exec django-app coverage html
