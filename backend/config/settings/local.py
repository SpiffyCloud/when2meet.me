"""
Django Local Settings
Quick-start development settings - unsuitable for production
See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/
"""

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": config("SQL_DATABASE", default="djangotemplate"),
        "USER": config("SQL_USER"),
        "PASSWORD": config("SQL_USER"),
        "HOST": config("SQL_HOST", default="postgres") or "postgres",
        "PORT": config("SQL_PORT", default="5432"),
    }
}

# Email Backend

EMAIL_HOST = "mailhog"
EMAIL_PORT = 1025
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
