"""
Django Production Settings
"""

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("SQL_DATABASE"),
        "USER": config("SQL_USER"),
        "PASSWORD": config("SQL_PASSWORD"),
        "HOST": config("SQL_HOST"),
        "PORT": config("SQL_PORT", default="5432"),
    }
}

# Middleware (extended)

MIDDLEWARE = [
    "whitenoise.middleware.WhiteNoiseMiddleware",
    *MIDDLEWARE,
]

# Static Files (extended)

STATIC_ROOT = BASE_DIR / "static"

# Media Uploads

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# Email Backend

EMAIL_HOST = config("EMAIL_HOST", default="host.docker.internal")
EMAIL_PORT = config("EMAIL_PORT", default="25")
#EMAIL_USE_TLS = True

# Security

SECURE_SSL_REDIRECT = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
