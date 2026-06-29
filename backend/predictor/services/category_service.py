import pandas as pd

from predictor.services.model_loader import (
    performance_classifier
)


def predict_performance_category(data):

    input_df = pd.DataFrame([data])

    prediction = performance_classifier.predict(input_df)

    return str(prediction[0])