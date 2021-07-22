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
    def post(self, request):
        data = request.data
        serializer = MeetingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            # TODO: Add meeting id to serializer data
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetMeeting(APIView):
    def get(self, request, *args, **kwargs):
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
        new_data = {
            "name": request.data["name"],
            "slots": [int(slot) for slot in request.data.getlist("slots", [])],
            "meeting": kwargs["id"],
        }
        """
        data = {
            "name": "John Doe",
            "slots": [1, 2, 3, 4, 5]
            "meeting": 00000001
            }
        """
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
