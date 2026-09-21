from typing import Any

from backend.service.questionService import QuestionService
from fastapi import APIRouter, Depends

router = APIRouter(prefix="/questions", tags=["Questions"])


# Factory function for Dependency Injection
def get_question_service() -> QuestionService:
    return QuestionService()


@router.get("", response_model=dict[str, Any])
def get_questions(
    service: QuestionService = Depends(get_question_service),
):
    return service.get_all_questions()
