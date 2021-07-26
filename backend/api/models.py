from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Meeting(models.Model):
    title = models.CharField(max_length=255)
    by_end_date = models.DateField()
    meeting_id = models.CharField(max_length=255, unique=True, primary_key=True)


class Availability(models.Model):
    meeting = models.ForeignKey(
        Meeting, on_delete=models.CASCADE, related_name="availability"
    )
    name = models.CharField(max_length=100)
    slots = ArrayField(models.IntegerField(), default=list)
