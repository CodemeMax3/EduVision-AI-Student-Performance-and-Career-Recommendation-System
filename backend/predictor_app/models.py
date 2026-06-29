from django.db import models


class CareerPredictionHistory(models.Model):
    predicted_career = models.CharField(max_length=100)
    cgpa = models.FloatField()
    specialization = models.CharField(max_length=100)
    internship_experience = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.predicted_career} | {self.specialization} | CGPA {self.cgpa}"
