import { useState, useCallback, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

// ========================================
// 🔥 AI Request with Context for Education
// ========================================
const sendAiMessage = async (input: string): Promise<string> => {
  try {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        agent: "education",
        context: {
          system: "school_management_ai",
          role: "education assistant",
          tone: "friendly, efficient, accurate",
          features: [
            "cek jadwal",
            "absensi",
            "nilai",
            "guru",
            "mata pelajaran",
            "info siswa",
          ],
          rule: "jawaban harus relevan dengan data sekolah.",
        },
      }),
    });

    const data = await response.json();
    return data.answer || data.reply || data.response || "⚠️ Tidak ada respons dari AI.";
  } catch (err) {
    console.error(err);
    return "⚠️ Error koneksi ke server.";
  }
};

export function CustomerService() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      text: "Halo 👋 Saya Education Assistant. Saya siap bantu ngecek jadwal pelajaran, tugas, absensi, atau data siswa. Mau mulai dari apa dulu?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput("");

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const aiReply = await sendAiMessage(userText);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: "ai",
      text: aiReply,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  }, [input, isLoading]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Education Assistant</h1>
        <p className="text-muted-foreground mt-1">
          Sistem bantuan AI realtime untuk sekolah.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 shadow-lg border-0">
          <CardHeader>
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>Chat dengan AI Assistant</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col h-[500px]">
              
              {/* Chat Area */}
              <div className="flex-1 overflow-auto mb-4 p-4 space-y-6 bg-gray-50 rounded-xl border border-gray-200">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className="w-9 h-9">
                      <AvatarFallback>
                        {msg.sender === "ai" ? (
                          <Bot className="w-5 h-5" />
                        ) : (
                          <User className="w-5 h-5" />
                        )}
                      </AvatarFallback>
                    </Avatar>

                    <div
                      className={`flex flex-col ${
                        msg.sender === "user" ? "items-end" : ""
                      }`}
                    >
                      <p
                        className={`p-3 rounded-2xl shadow-sm max-w-md text-sm ${
                          msg.sender === "ai"
                            ? "bg-indigo-100 text-indigo-900 rounded-tl-none"
                            : "bg-gray-300 text-gray-900 rounded-tr-none"
                        }`}
                      >
                        {msg.text}
                      </p>
                      <span className="text-[10px] text-gray-500">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        <Bot />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-200 text-gray-700 p-3 rounded-xl rounded-tl-none text-sm">
                      <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                      Assistant sedang mengetik...
                    </div>
                  </div>
                )}

                <div ref={chatEndRef}></div>
              </div>

              {/* Input Section */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ketik pesan..."
                  value={input}
                  disabled={isLoading}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <Button disabled={!input.trim() || isLoading} onClick={sendMessage}>
                  {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="w-full justify-center bg-green-500 text-white py-2 rounded-md text-sm tracking-wide">
                Online
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
