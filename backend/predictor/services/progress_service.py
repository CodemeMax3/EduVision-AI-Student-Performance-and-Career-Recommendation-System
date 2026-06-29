import pandas as pd

from predictor.services.model_loader import (
    academic_progress_model
)


def predict_academic_progress(data):

    input_df = pd.DataFrame([data])

    prediction = academic_progress_model.predict(input_df)

    return round(float(prediction[0]), 2)