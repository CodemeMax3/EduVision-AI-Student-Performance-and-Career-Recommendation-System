from rest_framework import serializers


class StudentScoreSerializer(serializers.Serializer):

    school = serializers.CharField()
    sex = serializers.CharField()
    age = serializers.IntegerField()
    address = serializers.CharField()
    famsize = serializers.CharField()
    Pstatus = serializers.CharField()

    Medu = serializers.IntegerField()
    Fedu = serializers.IntegerField()

    Mjob = serializers.CharField()
    Fjob = serializers.CharField()

    reason = serializers.CharField()
    guardian = serializers.CharField()

    traveltime = serializers.IntegerField()
    studytime = serializers.IntegerField()
    failures = serializers.IntegerField()

    schoolsup = serializers.CharField()
    famsup = serializers.CharField()
    paid = serializers.CharField()

    activities = serializers.CharField()
    nursery = serializers.CharField()
    higher = serializers.CharField()

    internet = serializers.CharField()
    romantic = serializers.CharField()

    famrel = serializers.IntegerField()
    freetime = serializers.IntegerField()
    goout = serializers.IntegerField()

    Dalc = serializers.IntegerField()
    Walc = serializers.IntegerField()
    health = serializers.IntegerField()

    absences = serializers.IntegerField()


class AcademicProgressSerializer(StudentScoreSerializer):

    G1 = serializers.FloatField()
    G2 = serializers.FloatField()

class PerformanceCategorySerializer(StudentScoreSerializer):

    G1 = serializers.FloatField()
    G2 = serializers.FloatField()

class CareerRecommendationSerializer(
    serializers.Serializer
):

    Education = serializers.CharField()

    Specialization = serializers.CharField()

    combined_text = serializers.CharField()

    CGPA = serializers.FloatField()

    Projects_Count = serializers.IntegerField()

    Internship_Experience = serializers.CharField()