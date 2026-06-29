from django.urls import path

from .views import (
    StudentScoreAPIView,
    AcademicProgressAPIView,
    PerformanceCategoryAPIView,
    CareerRecommendationAPIView,
    ChatAPIView,
    SendCareerReportAPIView,
)

urlpatterns = [

    path(
        "student-score/",
        StudentScoreAPIView.as_view(),
        name="student-score"
    ),

    path(
    "academic-progress/",
    AcademicProgressAPIView.as_view(),
    name="academic-progress"
),

    path(
    "performance-category/",
    PerformanceCategoryAPIView.as_view(),
    name="performance-category"
),

path(
    "career-recommendation/",
    CareerRecommendationAPIView.as_view(),
    name="career-recommendation"
),
path(
    "chat/",
    ChatAPIView.as_view(),
    name="chat"
),
path(
    "send-career-report/",
    SendCareerReportAPIView.as_view(),
    name="send-career-report"
),
]

