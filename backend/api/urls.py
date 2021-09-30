from django.urls import path

from .views import (
    CreateMeeting,
    GetMeeting,
    SubmitAvailability,
    SubmitFeedback,
    SubmitHireInquiry,
)


urlpatterns = [
    path("meetings/", CreateMeeting.as_view()),
    path("meetings/<str:id>/", GetMeeting.as_view()),
    path("meetings/<str:id>/availabilities/", SubmitAvailability.as_view()),
    path("feedback/", SubmitFeedback.as_view()),
    path("hire-us/", SubmitHireInquiry.as_view()),
]
