from django.db import models

# Create your models here.
class Meeting(models.Model):
    title = models.CharField(max_length=255)
    by_end_date = models.DateField()
    meeting_id = models.CharField(max_length=255, unique=True, primary_key=True)
