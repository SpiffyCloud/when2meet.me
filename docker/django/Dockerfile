FROM python:3.6-alpine

# Environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

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

# Add Docker scripts
COPY ./docker/django/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY ./docker/django/start.sh /start.sh
RUN chmod +x /start.sh

# Disabled 2021.07.24 by Jack (Why do we need this?)
# Copy project
# COPY . .

# Use Tini for proper init
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

# Set working directory
WORKDIR /app

# Default entrypoint
CMD ["/entrypoint.sh"]
