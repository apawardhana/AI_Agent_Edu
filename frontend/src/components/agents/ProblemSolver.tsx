import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { AlertCircle, CheckCircle2, Clock, Lightbulb } from "lucide-react";

// Struktur JSON wajib sesuai respons AI
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
  const [issueCategory, setIssueCategory] = useState("absensi");
  const [studentContext, setStudentContext] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [analyzing, setAnalyzing] = useState(false);
  const [solution, setSolution] = useState<SolutionType | null>(null);

  // =============================
  // 🔥 AI FUNCTION (MODIFIED EDU)
  // =============================

  const analyzeIssue = async () => {
    if (!issueDescription || !studentContext) {
      setErrorMessage("Isi dulu data siswa dan deskripsi masalah.");
      return;
    }

    setAnalyzing(true);
    setSolution(null);
    setErrorMessage(null);

    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!API_KEY) {
      setErrorMessage("API Key tidak ditemukan. Set di file .env.");
      setAnalyzing(false);
      return;
    }

    const systemPrompt = `
Anda adalah "AI Education Assistant" untuk sekolah.
Tugas Anda membantu analisis masalah akademik siswa berdasarkan data yang diberikan.

Jenis masalah yang bisa dianalisis:
- Penurunan nilai
- Masalah absensi
- Kesulitan memahami pelajaran tertentu
- Perilaku / disiplin
- Motivasi rendah
- Permasalahan tugas sekolah
- Interaksi guru/kelas
- Adaptasi lingkungan sekolah

Format respons HARUS berupa JSON valid tanpa text tambahan.

FORMAT:
{
  "rootCause": "penjelasan selain faktor umum",
  "severity": "high" | "medium" | "low",
  "impact": "apa konsekuensi terhadap akademik/motivasi",
  "solutions": [
      {
        "title": "nama solusi",
        "description": "langkah konkrit & actionable",
        "timeline": "berapa lama hingga perubahan terlihat",
        "priority": "high" | "medium" | "low"
      }
  ],
  "preventive": [
    "langkah pencegahan agar tidak terulang"
  ]
}
`;

    const userMessage = `
Kategori Masalah: ${issueCategory}
Data/Profil Siswa: ${studentContext}
Detail Masalah: ${issueDescription}

Tolong analisis dan berikan solusi.
`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          response_format: { type: "json_object" }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error ${response.status}: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const parsed = JSON.parse(data.choices[0]?.message?.content);
      setSolution(parsed);

    } catch (err) {
      console.error(err);
      setErrorMessage("Gagal mendapatkan respons. Lihat console untuk detail.");
    } finally {
      setAnalyzing(false);
    }
  };

  // Dummy riwayat
  const issues = [
    {
      id: 1,
      student: "Aulia Ramadhan",
      issue: "Sering absen dan tugas terlambat",
      status: "resolved",
      priority: "high",
      resolvedIn: "3 hari"
    },
    {
      id: 2,
      student: "Bima Pratama",
      issue: "Nilai Matematika turun 40%",
      status: "in-progress",
      priority: "high",
      resolvedIn: "-"
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Education Problem Solver 🎓</h1>
        <p className="text-muted-foreground">Analisis masalah siswa otomatis menggunakan AI</p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex gap-2">
          <AlertCircle className="w-5 h-5" />
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Input Masalah Siswa</CardTitle>
            <CardDescription>Isi data untuk dianalisis AI</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <label>Kategori Masalah</label>
              <Select defaultValue={issueCategory} onValueChange={setIssueCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="absensi">Absensi</SelectItem>
                  <SelectItem value="nilai">Penurunan Nilai</SelectItem>
                  <SelectItem value="prilaku">Perilaku / Disiplin</SelectItem>
                  <SelectItem value="motivasi">Motivasi Belajar</SelectItem>
                  <SelectItem value="tugas">Tugas & Deadline</SelectItem>
                  <SelectItem value="interaksi">Interaksi Sosial/Kelas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label>Profil Siswa</label>
              <Input
                placeholder="Contoh: Kelas 10 | Jurusan TKJ | Riwayat rajin tapi akhir2 ini berubah"
                value={studentContext}
                onChange={(e) => setStudentContext(e.target.value)}
              />
            </div>

            <div>
              <label>Deskripsi Masalah</label>
              <Textarea
                placeholder="Contoh: 2 minggu terakhir tidak mengumpulkan tugas matematika..."
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
              />
            </div>

            <Button disabled={analyzing} onClick={analyzeIssue} className="w-full">
              {analyzing ? "Menganalisis..." : "Generate Solusi"}
            </Button>
          </CardContent>
        </Card>

        {solution && (
          <Card>
            <CardHeader>
              <CardTitle>Hasil Analisis AI</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="border p-3 rounded bg-red-50">{solution.rootCause}</div>
              <div className="border p-3 rounded bg-orange-50">{solution.impact}</div>

              <div className="p-4 rounded bg-blue-50">
                <div className="flex gap-2 items-center mb-2">
                  <Lightbulb className="text-blue-500" /> Pencegahan
                </div>
                <ul className="list-disc ml-5">
                  {solution.preventive.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recommended */}
      {solution && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Solusi Rekomendasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {solution.solutions.map((s, i) => (
              <div key={i} className="border p-4 rounded-lg">
                <h3>{s.title}</h3>
                <p className="text-muted-foreground">{s.description}</p>
                <Badge>{s.priority}</Badge>
                <div className="text-sm flex items-center gap-2">
                  <Clock className="w-4" /> {s.timeline}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Riwayat Kasus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {issues.map((i) => (
              <div key={i.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <strong>{i.student}</strong>
                    <p className="text-sm text-muted-foreground">{i.issue}</p>
                  </div>
                  <Badge
                    variant={i.status === "resolved" ? "default" : "secondary"}
                  >
                    {i.status}
                  </Badge>
                </div>

                {i.status === "resolved" && (
                  <div className="text-green-600 flex gap-2 items-center mt-2">
                    <CheckCircle2 className="w-4" /> selesai dalam {i.resolvedIn}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
