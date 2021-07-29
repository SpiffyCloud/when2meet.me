FROM python:3.6-alpine

# Install OS dependencies
RUN apk update \
    && apk add --no-cache --virtual=build-deps gcc python3-dev musl-dev \
    && apk add --no-cache postgresql-client postgresql-dev

# Install Python dependencies
RUN pip install --upgrade pip
COPY ./backend/requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# Remove extraneous OS dependencies after Python dependencies are installed
RUN apk del build-deps

# Entrypoint is run on the start of every container
COPY ./docker/django/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Dev is run when specified as the command to run in development by compose
COPY ./docker/django/dev.sh /dev.sh
RUN chmod +x /dev.sh

# Prod is run when specified as the command to run in production by whatever
# container orchestrator is being used
COPY ./docker/django/prod.sh /prod.sh
RUN chmod +x /prod.sh

# Copy files for production builds
COPY ./backend /app

WORKDIR /app
EXPOSE 8000
VOLUME ["/app"]

# Use Tini for proper init
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

# Default entrypoint
CMD ["/entrypoint.sh"]
