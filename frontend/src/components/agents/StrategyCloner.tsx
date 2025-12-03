import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Brain, TrendingUp, Target, Zap, AlertCircle } from "lucide-react";

// Definisikan tipe untuk struktur solusi yang diharapkan dari AI
interface StrategyResult {
  patterns: {
    name: string;
    confidence: number;
    trend: "up" | "stable" | "down";
  }[];
  tactics: string[];
  recommendations: string[];
}

export function StrategyCloner() {
  const [input, setInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<StrategyResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State baru untuk error

  const analyzeStrategy = async () => {
    if (!input) {
      setErrorMessage("Input data penjualan atau strategi tidak boleh kosong.");
      return;
    }

    setAnalyzing(true);
    setResults(null);
    setErrorMessage(null);

    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!API_KEY) {
      setErrorMessage("OpenRouter API Key tidak ditemukan. Pastikan variabel VITE_OPENROUTER_API_KEY telah diatur di file .env.");
      setAnalyzing(false);
      return;
    }

    // System Prompt untuk AI: Tugas dan format output
    const systemPrompt = `Anda adalah seorang ahli strategi penjualan dan analis data. Tugas Anda adalah menganalisis data atau deskripsi strategi penjualan yang diberikan dan mengidentifikasi pola, taktik yang berhasil, serta memberikan rekomendasi strategis untuk peningkatan.
    Anda harus selalu merespons HANYA dengan objek JSON yang valid dan tidak ada teks tambahan.
    Struktur JSON yang diharapkan:
    {
        "patterns": [
            {"name": "Nama Pola (e.g., Consultative Selling)", "confidence": "Angka 0-100", "trend": "up" | "stable" | "down"}
        ],
        "tactics": ["Taktik yang berhasil diidentifikasi 1", "Taktik yang berhasil diidentifikasi 2"],
        "recommendations": ["Rekomendasi strategis 1", "Rekomendasi strategis 2"]
    }`;

    // Pesan dari pengguna
    const userMessage = `Analisis data penjualan/strategi berikut ini:\n\n${input}`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free", // Model AI yang digunakan
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          response_format: { type: "json_object" } // Memastikan respons dalam format JSON
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} - ${errorData.error.message || response.statusText}`);
      }

      const data = await response.json();
      const jsonString = data.choices[0].message.content.trim();
      const aiResults = JSON.parse(jsonString) as StrategyResult;

      setResults(aiResults);

    } catch (error) {
      console.error("Failed to fetch strategy analysis from AI:", error);
      setErrorMessage(`Gagal menganalisis strategi: ${error instanceof Error ? error.message : "Terjadi kesalahan tak terduga."}`);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Sales Strategy & Tactics Cloner 🧠</h1>
        <p className="text-muted-foreground mt-2">
          Menyerap ilmu & pengetahuan, memahami pola & tren untuk menentukan strategi/taktik penjualan menggunakan AI Sales
        </p>
      </div>

      {/* Tampilkan Error Message jika ada */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5"/>
          <p className="font-medium">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Sales Data</CardTitle>
            <CardDescription>
              Masukkan data penjualan, interaksi customer, atau informasi strategi yang ingin dianalisis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Contoh: Customer engagement meningkat 40% setelah menggunakan pendekatan konsultatif. Tim sales fokus pada solusi customized..."
              className="min-h-[200px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={analyzeStrategy} disabled={analyzing || !input} className="w-full">
              {analyzing ? "Analyzing..." : "Analyze Strategy"}
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Results</CardTitle>
              <CardDescription>Pattern recognition & strategic insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-3 font-semibold text-lg flex items-center gap-2"><Brain className="w-5 h-5"/> Identified Patterns</h3>
                <div className="space-y-2">
                  {results.patterns.map((pattern: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <div className="flex items-center gap-2">
                        <span>{pattern.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{pattern.confidence}%</Badge>
                        {pattern.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                        {pattern.trend === "down" && <TrendingUp className="w-4 h-4 rotate-180 text-red-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-lg flex items-center gap-2"><Target className="w-5 h-5"/> Recommended Tactics</h3>
                <div className="space-y-2">
                  {results.tactics.map((tactic: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-accent rounded-lg">
                      <span className="text-purple-500 mt-0.5">•</span>
                      <span>{tactic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {results && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Strategic Recommendations</CardTitle>
            <CardDescription>AI-powered suggestions for improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.recommendations.map((rec: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p>{rec}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}