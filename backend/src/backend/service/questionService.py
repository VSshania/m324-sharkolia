import json
from functools import lru_cache
from pathlib import Path

DATA_PATH = Path(__file__).parent.parent / "data" / "quiz_questions.json"


class QuestionService:

    def __init__(self, file_path: Path = DATA_PATH):
        self.file_path = file_path

    @lru_cache(maxsize=1)
    def get_all_questions(self) -> list[dict]:
      #Reads file once and caches it
        with self.file_path.open("r", encoding="utf-8") as file:
            return json.load(file)
