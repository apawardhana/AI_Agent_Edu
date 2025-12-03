import { Moon, Sun } from "lucide-react";
import {
  Brain,
  FileText,
  MessageSquare,
  Users,
  Wrench,
  BookOpen,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { AgentView } from "../App";

interface DashboardProps {
  setActiveView: (view: AgentView) => void;
  theme: "light" | "dark";
  setTheme: (val: "light" | "dark") => void;
}

export function Dashboard({ setActiveView, theme, setTheme }: DashboardProps) {
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const agents = [
    {
      id: "strategy" as AgentView,
      title: "Expert Education Cloner",
      description:
        "menyerap praktik terbaik sales dan marketing",
      icon: Brain,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      id: "content" as AgentView,
      title: "Modul Generator",
      description: "Bikin konten sales (copywriting, iklan, email, proposal)",
      icon: FileText,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
    },
    {
      id: "valuation" as AgentView,
      title: "Student Valuation",
      description: "Profiling, scoring & rekomendasi customer",
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
    },
    {
      id: "solver" as AgentView,
      title: "Student Assesor",
      description: "Menggali permasalahan & solusi customer",
      icon: Wrench,
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-950/20",
    },
    {
      id: "knowledge" as AgentView,
      title: "Training Knowledge",
      description: "Knowledge base interaktif sales/marketing",
      icon: BookOpen,
      color: "text-cyan-500",
      bgColor: "bg-cyan-50 dark:bg-cyan-950/20",
    },
    {
      id: "analyst" as AgentView,
      title: "Training Analyst",
      description: "Analisis kinerja sales dan grafik",
      icon: BarChart3,
      color: "text-pink-500",
      bgColor: "bg-pink-50 dark:bg-pink-950/20",
    },
    {
      id: "service" as AgentView,
      title: "Customer Service",
      description: "Interaksi dengan customer sebagai service representatif",
      icon: MessageSquare,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
    },
  ];
  
  return (
    <div className="p-8 transition-colors">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1>Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Platform Digital Education Menggunakan AI
          </p>
        </div>

        {/* Toggle button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border hover:bg-accent transition"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* GRID AGENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const Icon = agent.icon;

          return (
            <Card
              key={agent.id}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => setActiveView(agent.id)}
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 rounded-lg ${agent.bgColor} flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${agent.color}`} />
                </div>

                <CardTitle>{agent.title}</CardTitle>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg">
                  Launch Agent
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
