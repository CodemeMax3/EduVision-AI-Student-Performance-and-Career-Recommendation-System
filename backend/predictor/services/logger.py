import logging

logger = logging.getLogger("career_advisor")

logger.setLevel(logging.INFO)

file_handler = logging.FileHandler(
    "logs/career_advisor.log"
)

formatter = logging.Formatter(
    "%(asctime)s - %(levelname)s - %(message)s"
)

file_handler.setFormatter(
    formatter
)

logger.addHandler(
    file_handler
)