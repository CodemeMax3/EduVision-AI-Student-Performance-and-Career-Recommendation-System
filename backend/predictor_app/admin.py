from django.contrib import admin
from .models import CareerPredictionHistory


@admin.register(CareerPredictionHistory)
class CareerPredictionHistoryAdmin(admin.ModelAdmin):

    list_display = (
        "predicted_career",
        "cgpa",
        "specialization",
        "internship_experience",
        "created_at"
    )

    search_fields = (
        "predicted_career",
        "specialization"
    )

    list_filter = (
        "predicted_career",
        "specialization",
        "internship_experience"
    )

    ordering = (
        "-created_at",
    )