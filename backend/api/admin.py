from django.contrib import admin

from .models import Meeting, Availability

# Register your models here.
admin.site.register(Meeting)
admin.site.register(Availability)
