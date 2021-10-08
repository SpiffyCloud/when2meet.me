"""
Django Production Settings
"""

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

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

# Security

SECURE_SSL_REDIRECT = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

USE_X_FORWARDED_HOST = True
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
