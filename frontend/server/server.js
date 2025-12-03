// server/server.js
import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "../.env.local" }); // membaca API key dari file .env.local

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/generate", async (req, res) => {
  const { contentType, targetAudience, product, keyPoints } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Kamu adalah asisten pembuat konten marketing profesional.",
        },
        {
          role: "user",
          content: `
          Jenis konten: ${contentType}
          Target audiens: ${targetAudience}
          Produk: ${product}
          Poin penting: ${keyPoints}
          `,
        },
      ],
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
