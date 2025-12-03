from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ollama_client import generate_response

router = APIRouter()

class ChatRequest(BaseModel):
    role: str = "user"
    message: str

@router.post("/chat")
async def chat(request: ChatRequest):
    response = await generate_response(request.message)
    
    return {
        "role": "assistant",
        "response": response
    }
