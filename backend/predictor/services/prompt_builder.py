import json

def build_career_prompt(student_data, predicted_career):

    prompt = f"""
You are an expert Career Counselor and Industry Mentor.

Predicted Career:
{predicted_career}

Student Profile:
{json.dumps(student_data, indent=2)}

IMPORTANT INSTRUCTIONS:

1. Personalize the report using:
   - CGPA
   - Projects_Count
   - Internship_Experience
   - Education
   - Specialization
   - combined_text (skills)

2. Mention:
   - Student strengths
   - Student weaknesses
   - Skill gaps
   - Career opportunities

3. Include this disclaimer:
   "This recommendation is generated using Machine Learning and Generative AI. It may not always be accurate and should be used as guidance only."

4. Return ONLY valid JSON.

Return in this exact format:

{{
    "predicted_career": "",
    "confidence_note": "",
    "career_explanation": "",
    "required_skills": [],
    "skill_gaps": [],
    "certifications": [],
    "higher_studies": [],
    "job_roles": [],
    "future_scope": "",
    "related_careers": [],
    "roadmap": []
}}

Do not return markdown.
Do not return explanations outside JSON.
"""

    return prompt