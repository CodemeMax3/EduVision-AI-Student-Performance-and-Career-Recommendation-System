from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CareerPredictionHistory
from .serializers import (
    StudentScoreSerializer,
    AcademicProgressSerializer,
    PerformanceCategorySerializer,
    CareerRecommendationSerializer
)

from predictor.services.score_service import (
    predict_student_score
)

from predictor.services.progress_service import (
    predict_academic_progress
)

from predictor.services.category_service import (
    predict_performance_category
)

from predictor.services.career_service import (
    predict_career
)

from predictor.services.prompt_builder import (
    build_career_prompt
)

from predictor.services.gemini_service import (
    generate_career_guidance
)

from predictor.services.exceptions import (
    GeminiServiceError
)

from predictor.services.response_validator import (
    validate_career_response
)

from predictor.services.logger import logger
from predictor.services.gemini_service import model
from django.core.mail import EmailMessage

from predictor.services.pdf_service import generate_career_report
class StudentScoreAPIView(APIView):

    def post(self, request):

        serializer = StudentScoreSerializer(
            data=request.data
        )

        if serializer.is_valid():

            prediction = predict_student_score(
                serializer.validated_data
            )

            return Response(
                {
                    "predicted_score": prediction
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class AcademicProgressAPIView(APIView):

    def post(self, request):

        serializer = AcademicProgressSerializer(
            data=request.data
        )

        if serializer.is_valid():

            prediction = predict_academic_progress(
                serializer.validated_data
            )

            return Response(
                {
                    "predicted_final_score": prediction
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class PerformanceCategoryAPIView(APIView):

    def post(self, request):

        serializer = PerformanceCategorySerializer(
            data=request.data
        )

        if serializer.is_valid():

            prediction = predict_performance_category(
                serializer.validated_data
            )

            return Response(
                {
                    "performance_category": prediction
                },
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class CareerRecommendationAPIView(APIView):

    def post(self, request):

        serializer = CareerRecommendationSerializer(
            data=request.data
        )

        if not serializer.is_valid():

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        

        try:

            student_data = serializer.validated_data

            predicted_career = predict_career(
                   student_data
            )

            CareerPredictionHistory.objects.create(
                predicted_career=predicted_career,
                cgpa=student_data["CGPA"],
                specialization=student_data["Specialization"],
                internship_experience=student_data["Internship_Experience"]
            )

            logger.info(
               f"Career Predicted: {predicted_career}"
            )
            
            prompt = build_career_prompt(
                student_data,
                predicted_career
            )

            logger.info(
                "Sending request to Gemini"
            )

            guidance = generate_career_guidance(
                prompt
            )

            logger.info(
                "Gemini response received successfully"
            )

            guidance = validate_career_response(
                guidance
            )

            return Response(
                guidance,
                status=status.HTTP_200_OK
            )

        except GeminiServiceError:

            logger.error(
                "Gemini API failed. Using fallback response."
            )

            fallback_response = {
                "predicted_career": predicted_career,

                "confidence_note":
                "AI guidance is temporarily unavailable. This recommendation is based on the Machine Learning model only.",

                "career_explanation":
                f"The model predicts {predicted_career} as a suitable career path.",

                "required_skills": [],
                "skill_gaps": [],
                "certifications": [],
                "higher_studies": [],
                "job_roles": [],
                "future_scope": "",
                "related_careers": [],
                "roadmap": []
            }

            return Response(
                fallback_response,
                status=status.HTTP_200_OK
            )

        except Exception as e:

            logger.exception(
                f"Unexpected Error: {str(e)}"
            )

            return Response(
                {
                    "error": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
class ChatAPIView(APIView):

    def post(self, request):

        message = request.data.get("message", "").strip()
        career = request.data.get("career", "").strip()

        if not message:
            return Response(
                {
                    "error": "Message is required."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        prompt = f"""
You are EduVision AI Career Assistant.

Predicted Career:
{career}

Student Question:
{message}

Instructions:
- Answer professionally.
- Keep the answer between 100 and 250 words.
- Give practical guidance.
- If the question is about skills, roadmap, certifications or higher studies, answer accordingly.
- Reply in plain text only.
"""

        try:

            response = model.generate_content(prompt)

            return Response(
                {
                    "reply": response.text.strip()
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:

            logger.error(str(e))

            return Response(
                {
                    "error": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
class SendCareerReportAPIView(APIView):

    def post(self, request):

        try:

            email = request.data.get("email")
            report_data = request.data.get("reportData")

            if not email:

                return Response(
                    {
                        "error": "Email is required."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            if not report_data:

                return Response(
                    {
                        "error": "Report data is required."
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            pdf = generate_career_report(
                report_data
            )

            message = EmailMessage(

                subject="EduVision Career Guidance Report",

                body="""
Hello,

Thank you for using EduVision.

Your personalized AI Career Guidance Report has been attached.

The report contains:

• Career Recommendation

• Required Skills

• Skill Gap Analysis

• Future Scope

• Higher Studies

• Certifications

• Colleges

• Universities

• Roadmap

Regards,

EduVision Team
""",

                to=[email]

            )

            message.attach(

                "EduVision_Career_Report.pdf",

                pdf.read(),

                "application/pdf"

            )

            message.send()

            return Response(

                {
                    "message":
                    "Career report emailed successfully."
                },

                status=status.HTTP_200_OK

            )

        except Exception as e:

            logger.exception(str(e))

            return Response(

                {
                    "error": str(e)
                },

                status=status.HTTP_500_INTERNAL_SERVER_ERROR

            )