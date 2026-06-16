from fastapi import APIRouter

from models.chat_model import (
    ChatRequest,
    ChatResponse
)

from services.chat_service import (
    ask_repository
)

router = APIRouter(
    prefix="/api/chat",
    tags=["Chat"]
)

@router.post(
    "/ask",
    response_model=ChatResponse
)
async def chat_with_repository(
    request: ChatRequest
):

    result = await ask_repository(
        request.question,
        request.repo_name,
        request.history
    )

    return {
        "answer": result["answer"],
        "sources": result["sources"]
    }