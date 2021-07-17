from rest_framework import serializers
from .models import Meeting, Availability, TimeSlot
import random
import string
import datetime

class TimeSlotSerializer(serializers.Serializer):
    time_slot = serializers.IntegerField()
            
class CreateAvailabilitySerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=100)
    slots = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    
    def create(self, validated_data):
        meeting = validated_data.get('meeting')
        time_slots = validated_data.pop('slots')

        availability, created = Availability.objects.get_or_create(meeting=meeting, name=validated_data['name'])
        if not created:  # it exists
            availability.slots.clear()

        for time_slot in time_slots:
            slot, _ = TimeSlot.objects.get_or_create(time_slot=time_slot)
            availability.slots.add(slot)

        availability.save()
        return availability

class GetAvailabilitySerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=100)
    slots = TimeSlotSerializer(many=True, required=False)


class MeetingSerializer(serializers.Serializer):
    title = serializers.CharField(required=True, max_length=100)
    by_end_date = serializers.DateField(required=False)
    meeting_id = serializers.CharField(required=False, max_length=8)
    availability = GetAvailabilitySerializer(many=True, required=False)

    def validate_meeting_id(self, meeting_id):
        try:
            meeting = Meeting.objects.get(meeting_id=meeting_id)
        except Meeting.DoesNotExist:
            raise serializers.ValidationError(f"Meeting {meeting_id} does not exist")

        return meeting_id
        
    def create(self, validated_data):
        by_end_date = validated_data.pop('by_end_date', None)
        if not by_end_date:
            # If no end date, set it to 7 days from now as a date object
            by_end_date = datetime.date.today() + datetime.timedelta(days=7)
            
        # generate a random 8 char string
        meeting_id = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(8))


        return Meeting.objects.create(meeting_id=meeting_id, by_end_date=by_end_date, **validated_data)


