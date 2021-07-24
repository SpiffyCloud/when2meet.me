from .base import *

import os
import json

from django.core.exceptions import ImproperlyConfigured

# Secure Secret Key Logic

# JSON-based secrets module
with open(os.path.join(BASE_DIR, "local-secrets.json")) as f:
    secrets = json.loads(f.read())


def get_secret(setting, secrets=secrets):
    """Get the secret variable or return explicit exception."""
    try:
        return secrets[setting]
    except KeyError:
        error_msg = "Set the {0} environment variable".format(setting)
        raise ImproperlyConfigured(error_msg)


# Basic Settings

SECRET_KEY = get_secret("SECRET_KEY")

DEBUG = True

ALLOWED_HOSTS = ["*"]

# Installed Apps

INSTALLED_APPS += [
    "core",
    "api",
]

# Databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("SQL_DATABASE") or "djangotemplate",
        "USER": os.environ.get("SQL_USER") or get_secret("SQL_USER"),
        "PASSWORD": os.environ.get("SQL_USER") or get_secret("SQL_PASSWORD"),
        "HOST": os.environ.get("SQL_HOST") or "postgres",
        "PORT": os.environ.get("SQL_PORT") or "5432",
    }
}

# Static Files

STATIC_URL = "/static/"

# Email Backend

EMAIL_HOST = "mailhog"
EMAIL_PORT = 1025
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Login Settings

LOGIN_URL = "core:login"
LOGOUT_REDIRECT_URL = "website:home_page"

# Google ReCaptcha

RECAPTCHA_SECRET_KEY = get_secret("RECAPTCHA_SECRET_KEY")
RECAPTCHA_SITE_KEY = get_secret("RECAPTCHA_SITE_KEY")

# Rest Framework
REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ]
}
# 2021.07.16-DEA
