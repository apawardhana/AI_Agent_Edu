import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Brain, TrendingUp, Target, Zap, AlertCircle } from "lucide-react";

interface StrategyResult {
  main_topics: string[];
  difficulty_level: "beginner" | "intermediate" | "advanced";
  learning_goals: string[];
  next_steps: string[];
}

export function StrategyCloner() {
  const [input, setInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<StrategyResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const analyzeStrategy = async () => {
    if (!input) {
      setErrorMessage("Input materi tidak boleh kosong.");
      return;
    }

    setAnalyzing(true);
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:8000/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) throw new Error("Request gagal ke backend server");

      const data = await response.json();

      if (!data.result) throw new Error("AI tidak mengembalikan hasil");

      const jsonData = JSON.parse(data.result);

      setResults(jsonData);

    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Education Content Analyzer 🎓</h1>
        <p className="text-muted-foreground mt-2">
          Analisis isi materi pendidikan untuk menemukan struktur, tujuan, dan langkah lanjutan pembelajaran.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5"/>
          <p className="font-medium">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Materi Pembelajaran</CardTitle>
            <CardDescription>Masukkan teks materi yang ingin dianalisis dengan AI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Contoh: Ekosistem adalah hubungan timbal balik antara makhluk hidup...."
              className="min-h-[200px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button onClick={analyzeStrategy} disabled={analyzing} className="w-full">
              {analyzing ? "Menganalisis..." : "Analisis Materi"}
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Hasil Analisis AI</CardTitle>
              <CardDescription>Struktur materi, topik utama, dan level kesulitan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-3 font-semibold text-lg flex items-center gap-2"><Brain className="w-5 h-5"/> Topik Utama</h3>
                <div className="space-y-2">
                  {results.main_topics.map((topic, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                      <span>{topic}</span>
                      <Badge variant="secondary">Topic</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-lg flex items-center gap-2"><Target className="w-5 h-5"/> Level Kesulitan</h3>
                <Badge className="text-base py-2 px-4">{results.difficulty_level}</Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {results && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Next Step Learning Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.next_steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
