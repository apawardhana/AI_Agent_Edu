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

// 🔹 AI Function (calls backend)
const sendAiMessage = async (userInput: string): Promise<string> => {
  try {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });
    const data = await response.json();
    // fallback kalau backend pakai key 'response'
    return data.reply || data.response || "⚠️ Tidak ada respons dari AI.";
  } catch (err) {
    console.error(err);
    return "⚠️ Error koneksi ke server backend.";
  }
};

export function CustomerService() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      text: "Halo! 👋 Saya AI Asisten Edukasi. Mau belajar apa hari ini?",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // auto-scroll ke pesan terakhir
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const messageToSend = input; // simpan dulu
    setInput("");

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: messageToSend,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const aiReply = await sendAiMessage(messageToSend);

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
        <h1>AI Chat - Education Assistant</h1>
        <p className="text-muted-foreground mt-2">Belajar lebih mudah dengan AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Live Chat</CardTitle>
            <CardDescription>AI Education Assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col h-[500px]">
              <div className="flex-1 overflow-auto mb-4 p-4 space-y-4 bg-gray-50 rounded-lg">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        {msg.sender === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`flex flex-col ${msg.sender === "user" ? "items-end" : ""}`}>
                      <p
                        className={`p-3 rounded-xl max-w-md ${
                          msg.sender === "ai"
                            ? "bg-indigo-100 text-indigo-900 rounded-tl-none"
                            : "bg-gray-300 text-gray-900 rounded-tr-none"
                        }`}
                      >
                        {msg.text}
                      </p>
                      <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarFallback>
                        <Bot />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-200 text-gray-700 p-3 rounded-xl rounded-tl-none">
                      <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                      AI sedang mengetik...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef}></div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Tulis pesan..."
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

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="w-full justify-center bg-green-500 text-white">Online</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
