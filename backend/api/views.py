from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    MeetingSerializer,
    AvailabilitySerializer,
    AvailabilitySerializer,
)
from .models import Meeting, Availability


class CreateMeeting(APIView):
    """/api/v1/meetings"""

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
            ]
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
    """/api/v1/meetings/<meeting_id>"""

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
    def post(self, request, *args, **kwargs):
        """
        post data:
        {
            "name": "Name",
            "slots": [],
        }
        *slots are optional*
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
            "slots": [int(slot) for slot in request.data.getlist("slots", [])],
            "meeting": kwargs["id"],
        }
        availability = Availability.objects.filter(
            meeting=new_data["meeting"], name=new_data["name"]
        )
        if availability.exists():
            serializer = AvailabilitySerializer(
                availability.first(), data=new_data
            )
        else:
            serializer = AvailabilitySerializer(data=new_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
