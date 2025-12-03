import { Brain, FileText, MessageSquare, Users, Wrench, BookOpen, BarChart3, LayoutDashboard } from "lucide-react";
import { AgentView } from "../App";

interface SidebarProps {
  activeView: AgentView;
  setActiveView: (view: AgentView) => void;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const menuItems = [
    { id: "dashboard" as AgentView, label: "Dashboard", icon: LayoutDashboard },
    { id: "strategy" as AgentView, label: "Expert Education Cloner", icon: Brain },
    { id: "content" as AgentView, label: "Modul Generator", icon: FileText },
    { id: "valuation" as AgentView, label: "Student Valuation", icon: Users },
    { id: "solver" as AgentView, label: "Student Assesor", icon: Wrench },
    { id: "knowledge" as AgentView, label: "Training Knowledge", icon: BookOpen },
    { id: "analyst" as AgentView, label: "Training Analyst", icon: BarChart3 },
    { id: "service" as AgentView, label: "Customer Service", icon: MessageSquare },
  ];

  return (
    <aside
      className="w-64 flex flex-col"
      style={{
        background: "var(--sidebar)",
        borderRight: "1px solid var(--sidebar-border)"
      }}
    >
      <div className="p-6" style={{ borderBottom: "1px solid var(--sidebar-border)" }}>
        <h1 style={{ color: "var(--sidebar-foreground)", fontWeight: 600 }}>Smart Education</h1>
        <p style={{ color: "var(--muted-foreground)" }}>Smart Education Platform</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "8px",
                    background: isActive ? "var(--sidebar-primary)" : "transparent",
                    color: isActive ? "var(--sidebar-primary-foreground)" : "var(--sidebar-foreground)",
                    border: isActive ? "1px solid var(--sidebar-border)" : "none",
                    cursor: "pointer"
                  }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
