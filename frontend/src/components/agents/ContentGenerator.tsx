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
  Mail,
  FileCheck,
  Megaphone,
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
    category: "AI Sales",
    contentType: "",
    length: "",
  });

  const contentOptions: Record<string, string[]> = {
    "AI Sales": [
      "Iklan Produk",
      "Brosur / Pamflet Promosi",
      "Proposal Penawaran",
      "Email Marketing",
      "Surat Kontrak",
      "Surat Resmi",
      "Deskripsi Produk",
      "Copywriting Sosial Media",
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
      Jenis konten: ${formData.contentType}.
      Topik: ${formData.topic}.
      Kata kunci: ${formData.keywords}.
      Tone: ${formData.tone}.
      Panjang: ${formData.length}.

      Tolong buatkan konten berdasarkan detail di atas.
    `;

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userPrompt }),
      });

      const data: ChatResponse = await response.json();

      // ✅ Aman: cek dulu sebelum bersihin
      setGeneratedContent(data.response ? cleanText(data.response) : "⚠️ AI tidak mengembalikan teks apapun.");
    } catch (err: any) {
      console.error(err);
      setGeneratedContent("⚠️ Terjadi kesalahan koneksi ke server backend.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      alert("✅ Konten berhasil disalin ke clipboard!");
    } else {
      alert("⚠️ Belum ada konten untuk disalin.");
    }
  };

  const handleDownload = () => {
    if (!generatedContent) {
      alert("⚠️ Belum ada konten untuk diunduh.");
      return;
    }

    const blob = new Blob([generatedContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.topic || "hasil_konten"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Content Generator & Sales Tool Kits</h1>
        <p className="text-muted-foreground mt-2">
          Bikin konten sales (copywriting, iklan, brosur, email, proposal, surat menyurat, kontrak)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Content Settings</CardTitle>
            <CardDescription>Configure your content generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Topik</Label>
              <Input placeholder="Masukkan topik konten..." value={formData.topic} onChange={(e) => handleInputChange("topic", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Kata Kunci</Label>
              <Input placeholder="Kata kunci" value={formData.keywords} onChange={(e) => handleInputChange("keywords", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={formData.tone} onValueChange={(v) => handleInputChange("tone", v)}>
                <SelectTrigger><SelectValue placeholder="Pilih tone konten" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Jenis Konten</Label>
              <Select value={formData.contentType} onValueChange={(v) => handleInputChange("contentType", v)}>
                <SelectTrigger><SelectValue placeholder="Pilih jenis konten" /></SelectTrigger>
                <SelectContent>
                  {contentOptions[formData.category].map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Panjang Konten</Label>
              <Select value={formData.length} onValueChange={(v) => handleInputChange("length", v)}>
                <SelectTrigger><SelectValue placeholder="Pilih panjang konten" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Pendek (100–300 kata)</SelectItem>
                  <SelectItem value="medium">Sedang (300–600 kata)</SelectItem>
                  <SelectItem value="long">Panjang (600–1000 kata)</SelectItem>
                  <SelectItem value="extended">Sangat Panjang (1000+ kata)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleGenerate} className="w-full" disabled={isGenerating || !formData.topic}>
              {isGenerating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Membuat...</> : "Generate Content"}
            </Button>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>AI-powered sales content ready to use</CardDescription>
            </div>
            {generatedContent && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}><Copy className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" onClick={handleDownload}><Download className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                  <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {generatedContent ? (
              <Textarea value={generatedContent} onChange={(e) => setGeneratedContent(e.target.value)} className="min-h-[500px] h-full font-mono" />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center h-full min-h-[500px]">
                <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Konten yang dibuat AI akan muncul di sini</p>
                <p className="text-sm">Isi form di sebelah kiri dan klik "Generate Content"</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
