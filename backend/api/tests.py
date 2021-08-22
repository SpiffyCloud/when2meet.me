from datetime import datetime, timedelta
from django.test import TestCase
from .serializers import AvailabilitySerializer, MeetingSerializer
from .models import Availability, Meeting

""" Tests to add 
    - validate slots
    - validate existing meeting id
    - meeting creation
"""


class TestApiSerializers(TestCase):
    def test_create_availability(self):
        meeting = Meeting.objects.create(
            title="Test Meeting",
            meeting_id="11111111",
            by_end_date="1970-01-01",
        )
        serializer = AvailabilitySerializer()
        validated_data = {
            "meeting": meeting,
            "name": "John",
        }

        instance = serializer.create(validated_data)
        self.assertEqual(instance.name, "John")
        self.assertEqual(instance.meeting, meeting)

    def test_update_availability(self):
        meeting = Meeting.objects.create(
            title="Test Meeting",
            meeting_id="11111111",
            by_end_date="1970-01-01",
        )
        availability = meeting.availability.create(name="John")
        serializer = AvailabilitySerializer(
            availability,
            data={
                "name": "John",
                "meeting": meeting.meeting_id,
                "slots": [1, 2, 3],
            },
        )
        self.assertTrue(serializer.is_valid())
        serializer.save()
        self.assertEqual(availability.slots, [1, 2, 3])

    def test_create_meeting(self):
        # try to create a meeting that already exists
        meeting_data = {"title": "Meeting One"}
        serializer = MeetingSerializer(data=meeting_data)
        self.assertTrue(serializer.is_valid())
        meeting = serializer.save()
        self.assertEqual(meeting.title, "Meeting One")

    def test_invalid_meeting_id(self):
        # try to serailize a meeting that doesn't exist
        invalid_data = {"meeting_id": "00000000", "title": "Meeting Two"}
        serializer = MeetingSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(
            serializer.errors,
            {"meeting_id": ["Meeting 00000000 does not exist"]},
        )

    def test_valid_meeting_id(self):
        meeting = Meeting.objects.create(
            meeting_id=11111111, title="Meeting Two", by_end_date="1970-01-01"
        )
        data = {"meeting_id": meeting.meeting_id, "title": "Meeting Two"}
        serializer = MeetingSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_valid_end_date(self):
        by_end_date = datetime.today()
        data = {
            "title": "valid date meeting",
            "by_end_date": by_end_date.strftime("%Y-%m-%d"),
        }
        serializer = MeetingSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    # END POINT TESTS

    def test_create_basic_meeting(self):
        data = {"title": "Test Meeting"}
        response = self.client.post("/api/v1/meetings/", data=data)
        self.assertEqual(response.status_code, 201)

    def test_invalid_meeting(self):
        data = {"missing_title": "Test Meeting"}
        response = self.client.post("/api/v1/meetings/", data=data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.json(), {"title": ["This field is required."]}
        )

    def test_invalid_meeting_date(self):
        date = "1970-01-01"
        data = {"title": "Past Meeting", "by_end_date": date}
        response = self.client.post("/api/v1/meetings/", data=data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.json(),
            {"by_end_date": ["End date cannot be in the past."]},
        )

    def test_get_meeting(self):
        meeting = Meeting.objects.create(
            meeting_id="00000010",
            title="Existing Meeting",
            by_end_date="1970-01-01",
        )
        response = self.client.get(f"/api/v1/meetings/{meeting.meeting_id}/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "title": "Existing Meeting",
                "by_end_date": "1970-01-01",
                "meeting_id": str(meeting.meeting_id),
                "availability": [],
            },
        )

    def test_get_invalid_meeting(self):
        response = self.client.get("/api/v1/meetings/12345678/")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {"error": "Meeting does not exist."})

    def test_submit_new_availability(self):
        by_end_date = datetime.today() + timedelta(days=7)
        meeting = Meeting.objects.create(
            meeting_id="00000010",
            title="Existing Meeting",
            by_end_date=by_end_date,
        )
        data = {
            "meeting": meeting.meeting_id,
            "name": "John",
        }
        response = self.client.post(
            f"/api/v1/meetings/{meeting.meeting_id}/availabilities/", data=data
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(
            response.json(),
            {"name": "John", "meeting": meeting.meeting_id, "slots": []},
        )

    def test_add_slots(self):
        by_end_date = datetime.today() + timedelta(days=7)
        meeting = Meeting.objects.create(
            meeting_id="00000100",
            title="Existing Meeting",
            by_end_date=by_end_date,
        )
        Availability.objects.create(meeting=meeting, name="John")
        data = {
            "meeting": meeting.meeting_id,
            "name": "John",
            "slots": "[1, 2, 3]",
        }
        response = self.client.post(
            f"/api/v1/meetings/{meeting.meeting_id}/availabilities/", data=data
        )
        self.assertEqual(
            response.json(),
            {"name": "John", "meeting": meeting.meeting_id, "slots": [1, 2, 3]},
        )
        self.assertEqual(response.status_code, 201)

    def test_invalid_submit_availability(self):
        data = {
            "meeting": "33333333",
            "name": "John",
            "slots": "[1, 2, 3]",
        }
        response = self.client.post(
            f"/api/v1/meetings/{data['meeting']}/availabilities/", data=data
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.json(),
            {"meeting": ['Invalid pk "33333333" - object does not exist.']},
        )
