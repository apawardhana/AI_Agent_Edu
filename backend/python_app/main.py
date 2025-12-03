from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")

app = FastAPI()

# === CORS ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",
        "X-Title": "Content Generator AI",
    }

    body = {
        "model": "arcee-ai/trinity-mini:free",
        "messages": [
            {
                "role": "system",
                "content": (
                    "Kamu adalah AI Content Generator khusus sales: "
                    "buat konten profesional, singkat, persuasif, "
                    "ramah, mudah dipahami, bahasa Indonesia."
                )
            },
            {"role": "user", "content": request.message}
        ],
        "temperature": 0.6,
    }

    response = requests.post(url, json=body, headers=headers)

    try:
        result = response.json()
        print("\n===================== RAW RESPONSE =====================")
        print(result)
        print("========================================================\n")

        # ==== Parsing fleksibel untuk semua kemungkinan respons ====
        ai_reply = (
            result.get("choices", [{}])[0].get("message", {}).get("content") or
            result.get("choices", [{}])[0].get("text") or
            result.get("choices", [{}])[0].get("response") or
            (result.get("choices", [{}])[0].get("response")[0] 
             if isinstance(result.get("choices", [{}])[0].get("response"), list) else None)
        )

        if not ai_reply:
            return {"response": "⚠️ AI tidak mengembalikan teks apapun."}

        return {"response": ai_reply.strip()}

    except Exception as e:
        print("Parsing Error:", e)
        return {"response": "⚠️ Error Parsing Respons AI."}

@app.get("/")
async def home():
    return {"status": "OK", "message": "AI Backend Content Generator 🚀"}
