import aiohttp
import os

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/chat")
MODEL_NAME = os.getenv("MODEL_NAME", "llama3.2")

async def generate_response(message: str):
    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "user", "content": message}
        ]
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(OLLAMA_URL, json=payload) as resp:
            data = await resp.json()
            return data.get("message", {}).get("content", "")
