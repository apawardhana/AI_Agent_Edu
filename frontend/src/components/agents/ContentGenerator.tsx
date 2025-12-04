import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import {
  FileText,
  Loader2,
  Copy,
  Download,
  RefreshCw,
} from "lucide-react";

interface ChatResponse {
  response: string;
}

export function ContentGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [formData, setFormData] = useState({
    topic: "",
    keywords: "",
    tone: "",
    category: "Education",
    contentType: "",
    length: "",
  });

  const contentOptions: Record<string, string[]> = {
    Education: [
      "Ringkasan Materi",
      "Modul Pembelajaran",
      "Soal & Evaluasi",
      "Rangkuman Bab",
      "Slide Pembelajaran",
      "Latihan Essay",
      "Mindmap Konsep",
      "Deskripsi Materi",
    ],
  };

  const cleanText = (text?: string) => {
    if (!text) return "";
    return text
      .replace(/\\/g, "")
      .replace(/[#*_`~>|]/g, "")
      .replace(/<\|.*?\|>/g, "")
      .trim();
  };

  const handleGenerate = async () => {
    if (!formData.topic) return;
    setIsGenerating(true);
    setGeneratedContent("");

    const userPrompt = `
      Kategori: ${formData.category}.
      Bentuk Konten: ${formData.contentType}.
      Topik Pembelajaran: ${formData.topic}.
      Kata Kunci: ${formData.keywords}.
      Tone Penulisan: ${formData.tone}.
      Panjang Konten: ${formData.length}.

      Buat konten edukasi yang jelas, terstruktur, dan mudah dipahami berdasarkan detail di atas.
    `;

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userPrompt }),
      });

      const data: ChatResponse = await response.json();
      setGeneratedContent(data.response ? cleanText(data.response) : "⚠️ AI tidak mengembalikan teks.");
    } catch {
      setGeneratedContent("⚠️ Tidak bisa terhubung ke server backend.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = () => {
    if (!generatedContent) return alert("⚠️ Tidak ada konten untuk disalin.");
    navigator.clipboard.writeText(generatedContent);
    alert("✅ Konten berhasil disalin!");
  };

  const downloadContent = () => {
    if (!generatedContent) return alert("⚠️ Tidak ada konten untuk diunduh.");

    const blob = new Blob([generatedContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.topic || "konten_edu"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>AI Education Content Generator</h1>
        <p className="text-muted-foreground mt-2">
          Buat konten pembelajaran otomatis: materi, ringkasan, soal, modul, atau evaluasi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* FORM */}
        <Card>
          <CardHeader>
            <CardTitle>Content Settings</CardTitle>
            <CardDescription>Atur format konten pembelajaran</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">

            <div>
              <Label>Topik</Label>
              <Input placeholder="Contoh: Ekosistem, Pythagoras..." 
                value={formData.topic}
                onChange={(e) => handleChange("topic", e.target.value)} />
            </div>

            <div>
              <Label>Kata Kunci (Opsional)</Label>
              <Input placeholder="Contoh: rantai makanan, simbiosis..." 
                value={formData.keywords}
                onChange={(e) => handleChange("keywords", e.target.value)} />
            </div>

            <div>
              <Label>Tone</Label>
              <Select value={formData.tone} onValueChange={(v: string) => handleChange("tone", v)}>
                <SelectTrigger><SelectValue placeholder="Pilih gaya bahasa"/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="sederhana">Sederhana</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="child-friendly">Untuk Anak</SelectItem>
                  <SelectItem value="motivational">Motivational</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Jenis Konten</Label>
              <Select value={formData.contentType} onValueChange={(v: string) => handleChange("contentType", v)}>
                <SelectTrigger><SelectValue placeholder="Pilih jenis konten"/></SelectTrigger>
                <SelectContent>
                  {contentOptions[formData.category].map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Panjang Konten</Label>
              <Select value={formData.length} onValueChange={(v: string) => handleChange("length", v)}>
                <SelectTrigger><SelectValue placeholder="Pilih panjang"/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Pendek (100–300 kata)</SelectItem>
                  <SelectItem value="medium">Sedang (300–600 kata)</SelectItem>
                  <SelectItem value="long">Panjang (600–1000 kata)</SelectItem>
                  <SelectItem value="extended">Sangat Panjang (1000+ kata)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerate} className="w-full" disabled={isGenerating || !formData.topic}>
              {isGenerating ? <><Loader2 className="animate-spin mr-2" /> Generating...</> : "Generate"}
            </Button>
          </CardContent>
        </Card>


        {/* OUTPUT */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>Generated Education Content</CardTitle>
              <CardDescription>Konten siap digunakan untuk pembelajaran</CardDescription>
            </div>

            {generatedContent && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" onClick={downloadContent}><Download className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}><RefreshCw className="h-4 w-4" /></Button>
              </div>
            )}
          </CardHeader>

          <CardContent>
            {generatedContent ? (
              <Textarea value={generatedContent} onChange={(e) => setGeneratedContent(e.target.value)} className="min-h-[500px]" />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Hasil akan muncul di sini setelah generate.</p>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
