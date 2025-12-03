import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { StrategyCloner } from "./components/agents/StrategyCloner";
import { ContentGenerator } from "./components/agents/ContentGenerator";
import { CustomerService } from "./components/agents/CustomerService";
import { CustomerValuation } from "./components/agents/CustomerValuation";
import { ProblemSolver } from "./components/agents/ProblemSolver";
import { KnowledgeHub } from "./components/agents/KnowledgeHub";
import { SalesAnalyst } from "./components/agents/SalesAnalyst";
import { Dashboard } from "./components/Dashboard";
// 💡 PASTIKAN PATH INI BENAR SESUAI LOKASI FOLDER context
import { ChatProvider } from './context/ChatContext'; 

export type AgentView =
  | "dashboard"
  | "strategy"
  | "content"
  | "service"
  | "valuation"
  | "solver"
  | "knowledge"
  | "analyst";

export default function App() {
  const [activeView, setActiveView] = useState<AgentView>("dashboard");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Apply dark / light mode ke <html>
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  return (
    // 💡 WRAPPER CHATPROVIDER DIMULAI DI SINI
    <ChatProvider> 
      <div className="flex h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <Sidebar activeView={activeView} setActiveView={setActiveView} />

        <main className="flex-1 overflow-auto">
          {activeView === "dashboard" && (
            // 💡 Pastikan Anda menggunakan komponen Dashboard yang benar dari import
            <Dashboard setActiveView={setActiveView} theme={theme} setTheme={setTheme} />
          )}
          {activeView === "strategy" && <StrategyCloner />}
          {activeView === "content" && <ContentGenerator />}
          {activeView === "service" && <CustomerService />}
          {activeView === "valuation" && <CustomerValuation />}
          {activeView === "solver" && <ProblemSolver />}
          {activeView === "knowledge" && <KnowledgeHub />}
          {activeView === "analyst" && <SalesAnalyst />}
        </main>
      </div>
    </ChatProvider>
  );
}