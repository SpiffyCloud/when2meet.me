from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Meeting, Availability
from .serializers import (
    MeetingSerializer,
    AvailabilitySerializer,
    AvailabilitySerializer,
)
from .utils import send_feedback_email

import json


class CreateMeeting(APIView):
    """/api/v1/meetings/"""

    def post(self, request):
        """
        post data:
        {
            "title": "Meeting Title",
            "by_end_date": "YYYY-MM-DD",
        }
        *by_end_date is optional*

        return data:
        {
            "title": "Meeting Title",
            "by_end_date": "YYYY-MM-DD",
            "meeting_id": "integer"
            "availability": [
                {
                    "name": "Name",
                    "slots": []
                }
            ],
        }
        """
        data = request.data
        serializer = MeetingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            # TODO: Add meeting id to serializer data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetMeeting(APIView):
    """/api/v1/meetings/<str:id>/"""

    def get(self, request, *args, **kwargs):
        """
        return data:
        {
            "title": "Meeting Title",
            "by_end_date": "YYYY-MM-DD",
            "meeting_id": "integer"
            "availability": [
                {
                    "name": "Name",
                    "slots": []
                }
            ]
        }
        """
        # get key from url
        meeting_id = kwargs["id"]
        # get meeting from db if it exists
        try:
            meeting = Meeting.objects.get(meeting_id=meeting_id)
            serializer = MeetingSerializer(meeting)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Meeting.DoesNotExist:
            return Response(
                {"error": "Meeting does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )


class SubmitAvailability(APIView):
    """api/v1/meetings/<str:id>/availabilities/"""

    def post(self, request, *args, **kwargs):
        """
        post data:
        {
            "name": "Name",
            "slots": [],
        }
        *slots is optional*
        *meeting id comes from url*

        return data:
        {
            "name": "Name",
            "slots": [],
            "meeting_id": "integer"
        }
        """
        new_data = {
            "name": request.data["name"],
            "slots": [
                int(slot) for slot in json.loads(request.data.get("slots", "[]"))
            ],
            "meeting": kwargs["id"],
        }
        availability = Availability.objects.filter(
            meeting=new_data["meeting"], name__iexact=new_data["name"]
        )
        if availability.exists():
            serializer = AvailabilitySerializer(availability.first(), data=new_data)
        else:
            serializer = AvailabilitySerializer(data=new_data)

        if serializer.is_valid():
            serializer.save()
            meeting = Meeting.objects.get(meeting_id=kwargs["id"])
            meeting_serializer = MeetingSerializer(meeting)
            return Response(meeting_serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubmitFeedback(APIView):
    """api/v1/feedback/"""

    def post(self, request, *args, **kwargs):
        """
        post data:
        {
            "feedback_message": "Feedback Message",
            "feedback_quick": ["Quick message 1", "Quick message 2", "Quick message 3"],
        }
        *feedback_quick is optional*

        return data: None
        """
        feedback_message = request.data.get("feedback_message", "")
        feedback_quick = request.data.get("feedback_quick", "[]")

        if feedback_message == "" and len(feedback_quick) == 0:
            return Response(
                {"error": "Must provide feedback in request."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        feedback_data = {
            "feedback_message": feedback_message,
            "feedback_quick": feedback_quick,
        }

        send_feedback_email(feedback_data)
        return Response(status=status.HTTP_202_ACCEPTED)


class SubmitHireInquiry(APIView):
    """api/v1/hire-us/"""

    def post(self, request, *args, **kwargs):
        """
        post data:
        {
            "hire_inquiry": "Hire Inquiry",
        }

        return data: None
        """
        hire_inquiry = request.data.get("hire_inquiry", "")

        if hire_inquiry == "":
            return Response(
                {"error": "Must provide hire inquiry in request."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        feedback_data = {
            "feedback_message": hire_inquiry,
            "feedback_quick": ["hire-inquiry"],
        }

        send_feedback_email(feedback_data)
        return Response(status=status.HTTP_202_ACCEPTED)
