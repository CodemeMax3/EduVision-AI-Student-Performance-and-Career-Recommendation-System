import os
import json
from pydoc import text
from dotenv import load_dotenv
import google.generativeai as genai

from predictor.services.exceptions import (
    GeminiServiceError
)

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def generate_career_guidance(prompt):

    try:

        response = model.generate_content(
            prompt
        )

        text = response.text.strip()


        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        return json.loads(text)

        

    except json.JSONDecodeError as e:
     print("Gemini Raw Response:")
     print(text)
     raise GeminiServiceError(
        f"Invalid JSON returned by Gemini: {str(e)}"
    )

    except Exception as e:

        raise GeminiServiceError(
            str(e)
        )