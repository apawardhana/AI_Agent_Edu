import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Users, Target, Award, BookOpen, GraduationCap } from "lucide-react";
import { Badge } from "../ui/badge";

export function SalesAnalyst() {
  // === DATA (EDUCATION VERSION) ===
  const monthlyData = [
    { month: "Jan", score: 72, completed: 105, active: 210 },
    { month: "Feb", score: 75, completed: 112, active: 225 },
    { month: "Mar", score: 79, completed: 118, active: 240 },
    { month: "Apr", score: 81, completed: 126, active: 250 },
    { month: "May", score: 85, completed: 135, active: 270 },
    { month: "Jun", score: 88, completed: 149, active: 300 },
  ];

  const sourceData = [
    { name: "Self Learning", value: 40, color: "#3b82f6" },
    { name: "Tutor Session", value: 28, color: "#8b5cf6" },
    { name: "Video Course", value: 19, color: "#ec4899" },
    { name: "Group Discussion", value: 13, color: "#10b981" },
  ];

  const topPerformers = [
    { name: "Aulia Rahman", score: 94, activities: 52, improvement: 18, trend: "up" },
    { name: "Fikri Ramadhan", score: 91, activities: 48, improvement: 15, trend: "up" },
    { name: "Dewi Salsabila", score: 88, activities: 45, improvement: 11, trend: "stable" },
    { name: "Nanda Putri", score: 85, activities: 41, improvement: 9, trend: "up" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Student Learning Analyst</h1>
        <p className="text-muted-foreground mt-2">
          Pantau perkembangan belajar siswa berbasis AI.
        </p>
      </div>

      {/* ========= DASHBOARD KPI ========= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground">Avg Score</p>
              <Award className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl mb-1">85.3%</div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+12.4%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground">Completed Modules</p>
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl mb-1">765</div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+9.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground">Completion Rate</p>
              <Target className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl mb-1">72%</div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+6.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground">Active Students</p>
              <Users className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-2xl mb-1">300</div>
            <div className="flex items-center gap-1 text-red-600">
              <TrendingDown className="w-4 h-4" />
              <span>-4.8%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ========= TAB SECTION ========= */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Top Students</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        {/* ======= OVERVIEW ======= */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Score Trend</CardTitle>
                <CardDescription>Rata-rata peningkatan nilai siswa per bulan</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completed Learning</CardTitle>
                <CardDescription>Jumlah modul selesai setiap bulan</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Method Distribution</CardTitle>
                <CardDescription>Metode belajar yang paling banyak digunakan</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Students Trend</CardTitle>
                <CardDescription>Jumlah siswa aktif setiap bulan</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="active" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ==== PERFORMANCE (TOP STUDENTS) ==== */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Students</CardTitle>
              <CardDescription>Performa siswa terbaik berdasarkan nilai dan progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, idx) => (
                  <div key={idx} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                          {idx + 1}
                        </div>
                        <div>
                          <h4>{performer.name}</h4>
                          <p className="text-muted-foreground">{performer.activities} tasks completed</p>
                        </div>
                      </div>
                      {performer.trend === "up" ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 ml-13">
                      <div>
                        <p className="text-muted-foreground">Final Score</p>
                        <p>{performer.score}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Progress Improvement</p>
                        <div className="flex items-center gap-2">
                          <p>{performer.improvement}%</p>
                          <Badge variant={performer.improvement >= 10 ? "default" : "secondary"}>
                            {performer.improvement >= 10 ? "Excellent" : "Good"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ==== AI INSIGHTS ==== */}
        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>Rekomendasi otomatis berdasarkan data pembelajaran siswa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="text-green-900 mb-1">Progress Meningkat</h4>
                    <p>
                      Rata-rata nilai meningkat 12% dalam 3 bulan terakhir. Metode self-learning + tutor session dinilai paling efektif.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-yellow-600 mt-1" />
                  <div>
                    <h4 className="text-yellow-900 mb-1">Area Perhatian</h4>
                    <p>
                      27% siswa belum menyelesaikan 50% modul. Disarankan reminder otomatis & personalized learning plan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="text-blue-900 mb-1">Best Practice</h4>
                    <p>
                      Pola belajar 2 jam/hari + evaluasi mingguan terbukti menaikkan skor hingga 20%.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-red-600 mt-1" />
                  <div>
                    <h4 className="text-red-900 mb-1">Penurunan Aktivitas</h4>
                    <p>
                      Aktivitas siswa turun 4.8% bulan ini. Disarankan gamifikasi & leaderboard untuk meningkatkan engagement.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
