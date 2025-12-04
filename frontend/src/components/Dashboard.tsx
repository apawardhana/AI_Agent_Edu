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

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { AgentView } from "../App";

interface DashboardProps {
  setActiveView: (view: AgentView) => void;
  theme: "light" | "dark";
  setTheme: (val: "light" | "dark") => void;
}

export function Dashboard({ setActiveView, theme, setTheme }: DashboardProps) {
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  /** Dummy Data */
  const performanceData = [
    { subject: "Math", score: 87 },
    { subject: "Science", score: 92 },
    { subject: "English", score: 78 },
    { subject: "History", score: 85 },
  ];

  const pieData = [
    { name: "High Performer", value: 45 },
    { name: "Moderate", value: 35 },
    { name: "Needs Support", value: 20 },
  ];

  const PIE_COLORS = ["#22c55e", "#fbbf24", "#ef4444"];

  /** Agents */
  const agents = [
    { id: "strategy" as AgentView, title: "Expert Education Cloner", description:"AI Strategi Pembelajaran", icon: Brain, color:"text-blue-500", bgColor:"bg-blue-50 dark:bg-blue-950/20"},
    { id: "content" as AgentView, title: "Modul Generator", description:"Buat modul otomatis", icon: FileText, color:"text-purple-500", bgColor:"bg-purple-50 dark:bg-purple-950/20"},
    { id: "valuation" as AgentView, title: "Student Valuation", description:"Profiling & Scoring siswa", icon: Users, color:"text-orange-500", bgColor:"bg-orange-50 dark:bg-orange-950/20"},
    { id: "solver" as AgentView, title: "Student Assesor", description:"Evaluasi & rekomendasi", icon: Wrench, color:"text-red-500", bgColor:"bg-red-50 dark:bg-red-950/20"},
    { id: "knowledge" as AgentView, title: "Training Knowledge", description:"Knowledge Base materi", icon: BookOpen, color:"text-cyan-500", bgColor:"bg-cyan-50 dark:bg-cyan-950/20"},
    { id: "analyst" as AgentView, title: "Training Analyst", description:"Analisis grafik & performa", icon: BarChart3, color:"text-pink-500", bgColor:"bg-pink-50 dark:bg-pink-950/20"},
    { id: "service" as AgentView, title: "Customer Service", description:"AI untuk support siswa", icon: MessageSquare, color:"text-green-500", bgColor:"bg-green-50 dark:bg-green-950/20"},
  ];

  return (
    <div className="p-8 space-y-10 transition-all">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">
            Platform Digital Education Dengan AI
          </p>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border hover:bg-accent transition"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { value: "125", label: "Total Siswa" },
          { value: "86%", label: "Rata-rata Nilai" },
          { value: "77%", label: "Engagement Rate" },
        ].map((item, i) => (
          <Card key={i} className="border border-transparent shadow-sm rounded-xl">
            <CardContent className="py-6">
              <h2 className="text-2xl font-bold">{item.value}</h2>
              <p className="text-muted-foreground text-sm">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar Chart */}
        <Card className="col-span-2 border border-transparent rounded-xl shadow-sm">
          <CardHeader><CardTitle>Average Subject Score</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="border border-transparent rounded-xl shadow-sm">
          <CardHeader><CardTitle>Student Category Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} dataKey="value" label outerRadius={80}>
                  {pieData.map((item, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <Card
              key={agent.id}
              className="cursor-pointer border border-transparent rounded-xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition"
              onClick={() => setActiveView(agent.id)}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${agent.bgColor} flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${agent.color}`} />
                </div>
                <CardTitle>{agent.title}</CardTitle>
                <CardDescription>{agent.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <button className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition">
                  Open Tool
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>

    </div>
  );
}
