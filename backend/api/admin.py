from django.contrib import admin

from .models import Meeting, Availability, TimeSlot
# Register your models here.
admin.site.register(Meeting)
admin.site.register(Availability)
admin.site.register(TimeSlot)