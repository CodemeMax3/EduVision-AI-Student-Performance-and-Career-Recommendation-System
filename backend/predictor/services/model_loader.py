import os
import joblib
from django.conf import settings

MODEL_PATH = os.path.join(
    settings.BASE_DIR,
    "predictor",
    "models",
    "ml_models"
)

early_score_model = None
academic_progress_model = None
performance_classifier = None

career_model = None
career_vectorizer = None
career_encoder = None
career_scaler = None


def load_models():
    global early_score_model
    global academic_progress_model
    global performance_classifier

    global career_model
    global career_vectorizer
    global career_encoder
    global career_scaler

    early_score_model = joblib.load(
        os.path.join(MODEL_PATH, "early_score_model.pkl")
    )

    academic_progress_model = joblib.load(
        os.path.join(MODEL_PATH, "academic_progress_model.pkl")
    )

    performance_classifier = joblib.load(
        os.path.join(MODEL_PATH, "performance_classifier.pkl")
    )

    career_model = joblib.load(
        os.path.join(MODEL_PATH, "career_model.pkl")
    )

    career_vectorizer = joblib.load(
        os.path.join(MODEL_PATH, "career_vectorizer.pkl")
    )

    career_encoder = joblib.load(
        os.path.join(MODEL_PATH, "career_encoder.pkl")
    )

    career_scaler = joblib.load(
        os.path.join(MODEL_PATH, "career_scaler.pkl")
    )

    career_model = joblib.load(
    "predictor/models/ml_models/career_model.pkl"
)

career_vectorizer = joblib.load(
    "predictor/models/ml_models/career_vectorizer.pkl"
)

career_encoder = joblib.load(
    "predictor/models/ml_models/career_encoder.pkl"
)

career_scaler = joblib.load(
    "predictor/models/ml_models/career_scaler.pkl"
)

print("ALL MODELS LOADED SUCCESSFULLY")

    