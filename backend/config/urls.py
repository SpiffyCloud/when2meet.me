"""
URL Configuration

"""

from django.contrib import admin
from django.urls import include, path

urlpatterns = [path("admin/", admin.site.urls), path("core/", include("core.urls")), path("", include("website.urls"))]

# 2021.07.11-DEA
