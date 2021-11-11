from django.db import models
from django.contrib.postgres.fields import ArrayField


class Meeting(models.Model):
    meeting_id = models.CharField(max_length=255, unique=True, primary_key=True)
    title = models.CharField(max_length=255)
    by_end_date = models.DateField()
    
    def __str__(self):
        return f"Meeting ({self.meeting_id}) | {self.title}"


class Availability(models.Model):
    meeting = models.ForeignKey(
        Meeting, on_delete=models.CASCADE, related_name="availability"
    )
    name = models.CharField(max_length=100)
    slots = ArrayField(models.IntegerField(), default=list)
