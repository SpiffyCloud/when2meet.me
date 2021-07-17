from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import MeetingSerializer
from .models import Meeting

class CreateMeeting(APIView):
    def post(self, request):
        data = request.data
        serializer = MeetingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetMeeting(APIView):
    def get(self, request, *args, **kwargs):
        # get key from url
        meeting_id = kwargs['id']
        # get meeting from db if it exists
        try:
            meeting = Meeting.objects.get(meeting_id=meeting_id)
            serializer = MeetingSerializer(meeting)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(str(e))
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
            
        