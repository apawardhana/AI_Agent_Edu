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

model_llm = "arcee-ai/trinity-mini:free"


# ======================== DUMMY STUDENT DATABASE ============================

students_db = [
    {
        "id": 1,
        "name": "Rizal",
        "class": "XII IPA",
        "subjects": ["Matematika", "Fisika", "Kimia"],
        "attendance": {"present": 20, "absent": 2},
        "grades": {"Matematika": 88, "Fisika": 90, "Kimia": 85},
        "ai_evaluation": "Siswa cukup kuat di Fisika, perlu latihan integral untuk Matematika."
    },
    {
        "id": 2,
        "name": "Putri",
        "class": "XII IPS",
        "subjects": ["Ekonomi", "Akuntansi", "Bahasa Inggris"],
        "attendance": {"present": 18, "absent": 4},
        "grades": {"Ekonomi": 92, "Akuntansi": 89, "Bahasa Inggris": 91},
        "ai_evaluation": "Belajar sangat konsisten, hampir tidak ada gap skill."
    },
    {
        "id": 3,
        "name": "Dani",
        "class": "XI RPL",
        "subjects": ["Pemrograman", "Basis Data", "Desain UI/UX"],
        "attendance": {"present": 15, "absent": 6},
        "grades": {"Pemrograman": 75, "Basis Data": 70, "Desain UI/UX": 82},
        "ai_evaluation": "Perlu latihan tambahan di basis data dan algoritma."
    }
]


# ======================== GET ALL STUDENTS ============================

@app.get("/students")
async def get_students():
    return students_db


# ======================== GET STUDENT DETAIL ============================

@app.get("/students/{student_id}")
async def get_student_detail(student_id: int):
    student = next((s for s in students_db if s["id"] == student_id), None)
    if student:
        return student
    return {"error": "Student not found"}


# ======================== CHAT ENDPOINT ============================

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost",
        "X-Title": "Education AI Assistant",
    }

    body = {
        "model": model_llm,
        "messages": [
            {
                "role": "system",
                "content": (
                    "Kamu adalah AI Tutor Education: "
                    "jawab dengan ramah, jelas, edukatif, "
                    "sesuai mindset pembelajaran, bahasa Indonesia."
                )
            },
            {"role": "user", "content": request.message}
        ],
        "temperature": 0.6,
    }

    response = requests.post(url, json=body, headers=headers)

    try:
        result = response.json()

        ai_reply = (
            result.get("choices", [{}])[0].get("message", {}).get("content") or
            result.get("choices", [{}])[0].get("text") or
            result.get("choices", [{}])[0].get("response")
        )

        if not ai_reply:
            return {"response": "⚠️ AI tidak mengembalikan teks apapun."}

        return {"response": ai_reply.strip()}

    except:
        return {"response": "⚠️ Error Parsing Respons AI."}



# ======================== STUDENT LEARNING ANALYSIS =============================

class LearningAnalysisRequest(BaseModel):
    text: str

@app.post("/valuation")
async def valuation(request: LearningAnalysisRequest):
    system_prompt = """
Anda adalah AI Akademik Evaluator.
Analisis input data siswa dan kembalikan dalam format JSON valid.

Gunakan struktur berikut:

{
    "students": [
        {
            "name": "Nama Siswa",
            "category": "High Performer" | "Moderate" | "Needs Support",
            "engagement": 0-100,
            "progress_score": 0-100,
            "study_recommendation": "saran singkat"
        }
    ],
    "summary": {
        "class_avg_progress": 0-100,
        "class_engagement_health": "Good | Normal | Low",
        "priority_actions": [
            "Aksi 1",
            "Aksi 2"
        ]
    }
}
"""

    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    body = {
        "model": model_llm,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": request.text}
        ],
        "response_format": { "type": "json_object" }
    }

    response = requests.post(url, json=body, headers=headers)
    result = response.json()

    try:
        content = result["choices"][0]["message"]["content"]
        return {"valuation": content}
    except:
        return {"error": "Format respons AI tidak dikenali."}


@app.get("/")
async def home():
    return {"status": "OK", "message": "AI Backend - Education System 🚀"}
