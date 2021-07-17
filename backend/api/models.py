from django.db import models

# Create your models here.
class Meeting(models.Model):
    title = models.CharField(max_length=255)
    by_end_date = models.DateField()
    meeting_id = models.CharField(max_length=255, unique=True, primary_key=True)


class TimeSlot(models.Model):
    """
    time (int): Number of 15 minute periods passed since epoch 
    """
    time_slot = models.IntegerField()

class Availability(models.Model):
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE, related_name="availability")
    name = models.CharField(max_length=255)
    slots = models.ManyToManyField(TimeSlot)

