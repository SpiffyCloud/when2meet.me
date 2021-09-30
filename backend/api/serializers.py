from rest_framework import serializers
from .models import Meeting, Availability
import random
import string
import datetime


class AvailabilitySerializer(serializers.Serializer):
    name = serializers.CharField(required=True, max_length=100)
    meeting = serializers.PrimaryKeyRelatedField(queryset=Meeting.objects.all())
    slots = serializers.ListField(child=serializers.IntegerField(), required=False)

    def create(self, validated_data):
        meeting = validated_data.get("meeting")
        availability = Availability.objects.create(
            meeting=meeting, name=validated_data["name"]
        )
        availability.save()
        return availability

    def update(self, instance, validated_data):
        new_slots = validated_data.get("slots", instance.slots)
        instance.slots = new_slots
        instance.save()
        return instance


class MeetingSerializer(serializers.Serializer):
    title = serializers.CharField(required=True, max_length=100)
    by_end_date = serializers.DateField(required=False)
    meeting_id = serializers.CharField(required=False, max_length=8)
    availability = AvailabilitySerializer(many=True, required=False)

    def validate_meeting_id(self, meeting_id):
        try:
            meeting = Meeting.objects.get(meeting_id=meeting_id)
        except Meeting.DoesNotExist:
            raise serializers.ValidationError(f"Meeting {meeting_id} does not exist")

        return meeting_id

    def validate_by_end_date(self, by_end_date):
        if by_end_date < datetime.date.today():
            raise serializers.ValidationError(f"End date cannot be in the past.")
        return by_end_date

    def create(self, validated_data):
        by_end_date = validated_data.pop("by_end_date", None)
        if not by_end_date:
            # If no end date, set it to 7 days from now as a date object
            by_end_date = datetime.date.today() + datetime.timedelta(days=7)

        # generate a random 8 char string
        meeting_id = "".join(
            random.choice(string.ascii_lowercase + string.digits) for _ in range(8)
        )

        # loop until you find a free meeting id
        while Meeting.objects.filter(
            meeting_id=meeting_id
        ).exists():  # pragma: no cover
            meeting_id = "".join(
                random.choice(string.ascii_lowercase + string.digits) for _ in range(8)
            )

        return Meeting.objects.create(
            meeting_id=meeting_id, by_end_date=by_end_date, **validated_data
        )
