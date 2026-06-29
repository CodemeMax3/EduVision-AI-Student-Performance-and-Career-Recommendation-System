import pandas as pd

from predictor.services.model_loader import (
    early_score_model
)


def predict_student_score(data):

    input_df = pd.DataFrame([data])

    prediction = early_score_model.predict(input_df)

    return round(float(prediction[0]), 2)