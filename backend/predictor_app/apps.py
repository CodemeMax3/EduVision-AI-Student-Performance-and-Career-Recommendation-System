from django.apps import AppConfig


class PredictorAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'predictor_app'

    def ready(self):
        try:
            from predictor.services.model_loader import load_models
            load_models()
        except Exception as e:
            print(f"Model Loading Error: {e}")