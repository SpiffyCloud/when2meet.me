from rest_framework import serializers
from .models import Meeting
import random
import string
import datetime

class MeetingSerializer(serializers.Serializer):
    title = serializers.CharField(required=True, max_length=100)
    by_end_date = serializers.DateField(required=False)

    def create(self, validated_data):
        by_end_date = validated_data.pop('by_end_date', None)
        if not by_end_date:
            # If no end date, set it to 7 days from now as a date object
            by_end_date = datetime.date.today() + datetime.timedelta(days=7)
            
        # generate a random 8 char string
        meeting_id = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(8))

        return Meeting.objects.create(meeting_id=meeting_id, by_end_date=by_end_date, **validated_data)
            

