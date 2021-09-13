from django.urls import include, path
from rest_framework import routers
from .views import CreateMeeting, GetMeeting, SubmitAvailability, SubmitFeedback


urlpatterns = [
    path("meetings/", CreateMeeting.as_view()),
    path("meetings/<str:id>/", GetMeeting.as_view()),
    path("meetings/<str:id>/availabilities/", SubmitAvailability.as_view()),
    path("feedback/", SubmitFeedback.as_view()),
]
