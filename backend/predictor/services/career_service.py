import pandas as pd
import scipy.sparse as sp

from predictor.services.model_loader import (
    career_model,
    career_vectorizer,
    career_encoder,
    career_scaler
)

def predict_career(data):

    df = pd.DataFrame([data])

    text_features = career_vectorizer.transform(
        df["combined_text"]
    )

    cat_features = career_encoder.transform(
        df[
            [
                "Education",
                "Specialization",
                "Internship_Experience"
            ]
        ]
    )

    num_features = career_scaler.transform(
        df[
            [
                "CGPA",
                "Projects_Count"
            ]
        ]
    )

    final_input = sp.hstack(
        [
            text_features,
            cat_features,
            num_features
        ]
    )

    prediction = career_model.predict(
        final_input
    )

    return prediction[0]