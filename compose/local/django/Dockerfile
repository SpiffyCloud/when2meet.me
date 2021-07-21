FROM python:3.6-alpine

# set work directory
WORKDIR /app

# set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql-dev \
    && pip install psycopg2 \
    && apk del build-deps

# install psql client
RUN apk --update add postgresql-client

# install dependencies
RUN pip install --upgrade pip
COPY ./backend/requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# copy entrypoint.sh
COPY ./compose/local/django/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# copy start.sh
COPY ./compose/local/django/start.sh /start.sh
RUN chmod +x /start.sh

# copy project
COPY . .

# run docker-entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# 2021.07.16-DEA
