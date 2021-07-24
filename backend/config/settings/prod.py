from .base import *

import os
import json

from django.core.exceptions import ImproperlyConfigured

# Secure Secret Key Logic

# JSON-based secrets module
with open(os.path.join(BASE_DIR, "secrets.json")) as f:
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

DEBUG = False

ALLOWED_HOSTS = ["*"]

# Installed Apps

INSTALLED_APPS += [
    "core",
    "website",
]

# Databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("SQL_DATABASE") or "djangotemplate",
        "USER": os.environ.get("SQL_USER") or get_secret("SQL_USER"),
        "PASSWORD": os.environ.get("SQL_USER") or get_secret("SQL_PASSWORD"),
        "HOST": os.environ.get("SQL_HOST") or "localhost",
        "PORT": os.environ.get("SQL_PORT") or "5432",
    }
}

# Static Files

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

# Media Uploads

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# Email Backend

EMAIL_HOST = "localhost"
EMAIL_PORT = 587
EMAIL_USE_TLS = True

# Login Settings

LOGIN_URL = "core:login"
LOGOUT_REDIRECT_URL = "website:home_page"

# Security

SECURE_SSL_REDIRECT = True

CSRF_COOKIE_SECURE = True

SESSION_COOKIE_SECURE = True

# Google ReCaptcha

RECAPTCHA_SECRET_KEY = get_secret("RECAPTCHA_SECRET_KEY")
RECAPTCHA_SITE_KEY = get_secret("RECAPTCHA_SITE_KEY")

# 2021.07.16-DEA
