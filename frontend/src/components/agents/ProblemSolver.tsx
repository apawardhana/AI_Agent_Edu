import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AlertCircle, CheckCircle2, Clock, Lightbulb } from "lucide-react";

// Definisikan tipe untuk struktur solusi yang diharapkan dari AI
interface SolutionType {
  rootCause: string;
  severity: "high" | "medium" | "low";
  impact: string;
  solutions: {
    title: string;
    description: string;
    timeline: string;
    priority: "high" | "medium" | "low";
  }[];
  preventive: string[];
}

export function ProblemSolver() {
  // State untuk input form
  const [issueCategory, setIssueCategory] = useState("sales");
  const [customerContext, setCustomerContext] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Untuk error handling

  // State yang sudah ada
  const [analyzing, setAnalyzing] = useState(false);
  const [solution, setSolution] = useState<SolutionType | null>(null);

  // --- Fungsi yang Dimodifikasi untuk Panggilan API ---
  const analyzeIssue = async () => {
    if (!issueDescription || !customerContext) {
      setErrorMessage("Mohon lengkapi Deskripsi Isu dan Customer/Context.");
      return;
    }

    setAnalyzing(true);
    setSolution(null);
    setErrorMessage(null);

    // Kunci API diakses dari environment variable
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!API_KEY) {
        setErrorMessage("OpenRouter API Key tidak ditemukan. Pastikan variabel VITE_OPENROUTER_API_KEY telah diatur di file .env.");
        setAnalyzing(false);
        return;
    }

    // Prompt yang akan dikirim ke AI
    const systemPrompt = `Anda adalah seorang konsultan bisnis dan problem solver. Tugas Anda adalah menganalisis masalah yang diberikan dan memberikan solusi terstruktur dalam format JSON.
    Anda harus selalu merespons HANYA dengan objek JSON yang valid dan tidak ada teks tambahan.
    Struktur JSON yang diharapkan:
    {
        "rootCause": "String penyebab utama masalah",
        "severity": "high" | "medium" | "low",
        "impact": "String dampak bisnis utama",
        "solutions": [
            {
                "title": "String Judul Solusi",
                "description": "String Deskripsi langkah-langkah solusi",
                "timeline": "String perkiraan waktu (e.g., '1-2 hari', '1 minggu', '2-4 minggu')",
                "priority": "high" | "medium" | "low"
            }
        ],
        "preventive": ["String Langkah Pencegahan 1", "String Langkah Pencegahan 2"]
    }`;

    const userMessage = `Kategori Isu: ${issueCategory}.
    Customer/Context: ${customerContext}.
    Deskripsi Isu: ${issueDescription}.
    Tolong analisis isu ini, temukan akar masalahnya, dampak, dan berikan rencana solusi yang terstruktur.`;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // Pilih model yang kuat untuk problem solving dan JSON
                model: "mistralai/mistral-7b-instruct:free", // Model gratis dan cepat untuk contoh
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userMessage },
                ],
                // Pastikan output berupa JSON
                response_format: { type: "json_object" }
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${response.status} - ${errorData.error.message || response.statusText}`);
        }

        const data = await response.json();
        // Respons dari AI ada di data.choices[0].message.content
        const jsonString = data.choices[0].message.content.trim();
        const aiSolution = JSON.parse(jsonString) as SolutionType;

        setSolution(aiSolution);
    } catch (error) {
        console.error("Failed to fetch solution from AI:", error);
        // Tampilkan pesan error ke pengguna
        setErrorMessage(`Gagal mengambil solusi dari AI. Cek console untuk detail. Pesan: ${error instanceof Error ? error.message : "Terjadi kesalahan tak terduga."}`);
    } finally {
        setAnalyzing(false);
    }
  };
  // --- Akhir Fungsi yang Dimodifikasi ---

  const issues = [
    // Data issues tetap sama...
    { id: 1, customer: "PT Maju Jaya", issue: "Komplain response time terlalu lama", status: "resolved", priority: "high", resolvedIn: "2 hours" },
    { id: 2, customer: "CV Berkah Sejahtera", issue: "Permintaan custom feature", status: "in-progress", priority: "medium", resolvedIn: "-" },
    { id: 3, customer: "UD Sumber Rezeki", issue: "Kesulitan integrasi dengan sistem existing", status: "pending", priority: "high", resolvedIn: "-" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Problem Solver & Solution Maker 💡</h1>
        <p className="text-muted-foreground mt-2">
          Menggali permasalahan & solusi keluhan/saran customer menggunakan AI Sales
        </p>
      </div>

      {/* Tampilkan Error Message jika ada */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5"/>
          <p className="font-medium">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Issue Analysis</CardTitle>
            <CardDescription>Describe the customer issue or sales challenge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-2 block">Issue Category</label>
              <Select defaultValue={issueCategory} onValueChange={setIssueCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Process</SelectItem>
                  <SelectItem value="product">Product Issue</SelectItem>
                  <SelectItem value="service">Customer Service</SelectItem>
                  <SelectItem value="technical">Technical Problem</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block">Customer/Context</label>
              <Input 
                placeholder="e.g., Enterprise B2B customers" 
                value={customerContext}
                onChange={(e) => setCustomerContext(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block">Issue Description</label>
              <Textarea
                placeholder="Contoh: Conversion rate dari lead ke opportunity turun 35% dalam 2 bulan terakhir. Customer komplain bahwa value proposition tidak jelas..."
                className="min-h-[120px]"
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
              />
            </div>

            <Button onClick={analyzeIssue} disabled={analyzing} className="w-full">
              {analyzing ? "Analyzing..." : "Analyze & Generate Solutions"}
            </Button>
          </CardContent>
        </Card>

        {solution && (
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Results</CardTitle>
              <CardDescription>Root cause & impact assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <p>Root Cause</p>
                    <p className="text-red-900 dark:text-red-200 mt-1">{solution.rootCause}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg">
                <p className="mb-2">Business Impact</p>
                <p className="text-orange-900 dark:text-orange-200">{solution.impact}</p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-blue-500" />
                  <p>Preventive Measures</p>
                </div>
                <ul className="space-y-2">
                  {solution.preventive.map((item: string, idx: number) => (
                    <li key={idx} className="text-blue-900 dark:text-blue-200 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bagian Recommended Solutions dan Recent Issues tetap sama */}
      {/* ... (kode untuk solusi dan isu terkini) ... */}
      
      {solution && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Recommended Solutions</CardTitle>
            <CardDescription>Prioritized action plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {solution.solutions.map((sol: any, idx: number) => (
              <div key={idx} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      {idx + 1}
                    </div>
                    <div>
                      <h3>{sol.title}</h3>
                      <p className="text-muted-foreground mt-1">{sol.description}</p>
                    </div>
                  </div>
                  <Badge variant={sol.priority === "high" ? "destructive" : "secondary"}>
                    {sol.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground ml-11">
                  <Clock className="w-4 h-4" />
                  <span>Timeline: {sol.timeline}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Issues & Resolutions</CardTitle>
          <CardDescription>Customer issues tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {issues.map((issue) => (
              <div key={issue.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4>{issue.customer}</h4>
                      <Badge
                        variant={
                          issue.status === "resolved"
                            ? "default"
                            : issue.status === "in-progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {issue.status}
                      </Badge>
                      <Badge variant={issue.priority === "high" ? "destructive" : "outline"}>
                        {issue.priority}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{issue.issue}</p>
                  </div>
                  {issue.status === "resolved" && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{issue.resolvedIn}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}