from django.urls import include, path
from rest_framework import routers
from .views import CreateMeeting, GetMeeting, SubmitAvailability


urlpatterns = [
    path('meetings/', CreateMeeting.as_view()),
    path('meetings/<str:id>/', GetMeeting.as_view()),
    path('meetings/<str:id>/availabilities/', SubmitAvailability.as_view()),
]