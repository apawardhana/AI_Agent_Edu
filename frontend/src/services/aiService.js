import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function sendToOpenRouter(messages) {
  try {
    const res = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages,
        temperature: 0.7,
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    return res.data.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    return "⚠️ Terjadi masalah komunikasi ke AI server.";
  }
}
