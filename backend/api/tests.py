from django.test import TestCase
from .serializers import AvailabilitySerializer
from .models import Meeting

# Create your tests here.
class TestApi(TestCase):
    def test_create_availability(self):
        meeting = Meeting.objects.create(title="TestMeeting", meeting_id="11111111", by_end_date="1970-01-01")
        serializer = AvailabilitySerializer()
        validated_data = {
            "meeting" : meeting,
            "name": "John",
            "slots": [1, 2, 3, 4, 5]
        }

        instance = serializer.create(validated_data)
        self.assertEqual(instance.name, "John")
        self.assertEqual(instance.slots, [1, 2, 3, 4, 5])
        self.assertEqual(instance.meeting, meeting)

