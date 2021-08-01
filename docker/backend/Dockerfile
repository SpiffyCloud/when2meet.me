FROM python:3.6-alpine

# TODO  Add nginx into this image, or a seperate one, to allow for serving
#       static files in production.

# Environment defaults
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install OS dependencies
RUN apk update \
    && apk add --no-cache --virtual=build-deps gcc python3-dev musl-dev \
    && apk add --no-cache postgresql-client postgresql-dev

WORKDIR /app

# Install Python dependencies
RUN pip install --upgrade pip
COPY ./backend/requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# Remove extraneous OS dependencies after Python dependencies are installed
RUN apk del build-deps

# Copy files for production builds
COPY ./backend .

# Build static files
RUN python manage.py collectstatic --noinput --settings=config.settings.prod

# Install container scripts
COPY ./docker/backend/*.sh /
RUN chmod +x /*.sh

EXPOSE 8000

# Use Tini for proper init
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

# Default entrypoint
CMD ["/entrypoint.sh"]
