from rest_framework import serializers
from .models import Meeting, Availability
import random
import string
import datetime

class MeetingSerializer(serializers.Serializer):
    title = serializers.CharField(required=True, max_length=100)
    by_end_date = serializers.DateField(required=False)
    meeting_id = serializers.CharField(required=False, max_length=8)

    def create(self, validated_data):
        by_end_date = validated_data.pop('by_end_date', None)
        if not by_end_date:
            # If no end date, set it to 7 days from now as a date object
            by_end_date = datetime.date.today() + datetime.timedelta(days=7)
            
        # generate a random 8 char string
        meeting_id = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(8))


        return Meeting.objects.create(meeting_id=meeting_id, by_end_date=by_end_date, **validated_data)


class TimeSlotSerializer(serializers.Serializer):
    slot = serializers.IntegerField()
            
class AvailabilitySerializer(serializers.Serializer):
    meeting_id = serializers.CharField(required=True, max_length=8)
    name = serializers.CharField(required=True, max_length=100)
    slots = TimeSlotSerializer(many=True)

    def validate_meeting_id(self, meeting_id):
        try:
            meeting = Meeting.objects.get(meeting_id=meeting_id)
        except Meeting.DoesNotExist:
            raise serializers.ValidationError(f"Meeting {meeting_id} does not exist")

        return meeting_id

    def create(self, validated_data):
        meeting = Meeting.objects.get(meeting_id=validated_data['meeting_id'])
        slots = validated_data.pops('slots')

        availability, created = Availability.objects.get_or_create(meeting=meeting, name=validated_data['name'])
        if not created:  # it exists
            availability.slots.clear()

        for time in slots:
            time_slot, _ = TimeSlot.objects.get_or_create(time=time)
            avalability.slots.add(time_slot)

        availability.save()
        return availability