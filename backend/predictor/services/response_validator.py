def validate_career_response(data):

    required_schema = {
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
    }

    for key, default_value in required_schema.items():

        if key not in data:
            data[key] = default_value

    return data