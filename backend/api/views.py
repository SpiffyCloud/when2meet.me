from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import (
    MeetingSerializer,
    AvailabilitySerializer,
    AvailabilitySerializer,
)
from .models import Meeting


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
            serializer = MeetingSerializer(
                meeting,
                data={
                    "title": meeting.title,
                    "availabilities": list(meeting.availability.all()),
                },
            )
            if serializer.is_valid():
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except meeting.DoesNotExist:
            return Response(
                {"error": "Meeting does not exist"}, status=status.HTTP_404_NOT_FOUND
            )


class SubmitAvailability(APIView):
    def post(self, request, *args, **kwargs):
        meeting_id = kwargs["id"]
        try:
            meeting = Meeting.objects.get(meeting_id=meeting_id)
        except Meeting.DoesNotExist:
            return Response(
                {"error": "Meeting does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

        data = request.data
        """
        data = {
            "name": "John Doe",
            "slots": [1, 2, 3, 4, 5]
            }
        """
        write_serializer = AvailabilitySerializer(data=data)
        if write_serializer.is_valid():
            instance = write_serializer.save(meeting=meeting)
            read_serializer = AvailabilitySerializer(instance)
            return Response(read_serializer.data, status=status.HTTP_201_CREATED)
        return Response(write_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
