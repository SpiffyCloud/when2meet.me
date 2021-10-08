"""
Django Local Settings
Quick-start development settings - unsuitable for production
See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/
"""

from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = REST_FRAMEWORK.get(
    "DEFAULT_RENDERER_CLASSES", []
) + ["rest_framework.renderers.BrowsableAPIRenderer"]
