import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Award } from "lucide-react";
import { Badge } from "../ui/badge";

export function SalesAnalyst() {
  const monthlyData = [
    { month: "Jan", revenue: 45, deals: 12, leads: 89 },
    { month: "Feb", revenue: 52, deals: 15, leads: 102 },
    { month: "Mar", revenue: 61, deals: 18, leads: 121 },
    { month: "Apr", revenue: 58, deals: 16, leads: 115 },
    { month: "May", revenue: 72, deals: 21, leads: 145 },
    { month: "Jun", revenue: 85, deals: 25, leads: 178 },
  ];

  const sourceData = [
    { name: "Organic Search", value: 35, color: "#3b82f6" },
    { name: "Referrals", value: 28, color: "#8b5cf6" },
    { name: "Social Media", value: 22, color: "#ec4899" },
    { name: "Email Campaign", value: 15, color: "#10b981" },
  ];

  const topPerformers = [
    { name: "Budi Santoso", deals: 45, revenue: "Rp 320M", conversion: 68, trend: "up" },
    { name: "Siti Rahayu", deals: 38, revenue: "Rp 275M", conversion: 62, trend: "up" },
    { name: "Ahmad Fauzi", deals: 32, revenue: "Rp 240M", conversion: 58, trend: "stable" },
    { name: "Dewi Lestari", deals: 29, revenue: "Rp 210M", conversion: 55, trend: "up" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Sales Analyst</h1>
        <p className="text-muted-foreground mt-2">
          Analisis kinerja sales (grafik, insight, rekomendasi)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground">Total Revenue</p>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl mb-1">Rp 2.4B</div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+18.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground">Total Deals</p>
              <Target className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl mb-1">127</div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground">Conversion Rate</p>
              <Award className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl mb-1">62.4%</div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+5.8%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-muted-foreground">Active Leads</p>
              <Users className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-2xl mb-1">342</div>
            <div className="flex items-center gap-1 text-red-600">
              <TrendingDown className="w-4 h-4" />
              <span>-3.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Team Performance</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue performance (in millions)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deals Closed</CardTitle>
                <CardDescription>Monthly deals performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="deals" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
                <CardDescription>Distribution by acquisition channel</CardDescription>
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
                      fill="#8884d8"
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
                <CardTitle>Lead Generation Trend</CardTitle>
                <CardDescription>Monthly lead acquisition</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leads" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Best performing sales representatives this quarter</CardDescription>
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
                          <p className="text-muted-foreground">{performer.deals} deals closed</p>
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
                        <p className="text-muted-foreground">Total Revenue</p>
                        <p>{performer.revenue}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Conversion Rate</p>
                        <div className="flex items-center gap-2">
                          <p>{performer.conversion}%</p>
                          <Badge variant={performer.conversion >= 60 ? "default" : "secondary"}>
                            {performer.conversion >= 60 ? "Excellent" : "Good"}
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

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>Data-driven recommendations for improvement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="text-green-900 dark:text-green-200 mb-1">Strong Performance</h4>
                    <p className="text-green-800 dark:text-green-300">
                      Conversion rate up 5.8% this month. The consultative selling approach is working well for enterprise clients. Recommend scaling this strategy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-lg">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="text-orange-900 dark:text-orange-200 mb-1">Opportunity Alert</h4>
                    <p className="text-orange-800 dark:text-orange-300">
                      Lead generation from Social Media channel shows 42% growth potential. Recommend increasing ad spend by 25% for Q2.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="text-blue-900 dark:text-blue-200 mb-1">Best Practice</h4>
                    <p className="text-blue-800 dark:text-blue-300">
                      Budi Santoso's follow-up pattern shows 85% success rate when contacting leads within 2 hours. Implement this as team standard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg">
                <div className="flex items-start gap-3">
                  <TrendingDown className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="text-red-900 dark:text-red-200 mb-1">Area for Improvement</h4>
                    <p className="text-red-800 dark:text-red-300">
                      Email campaign response rate down 8%. Consider A/B testing new subject lines and personalizing content based on customer segments.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription>Next steps for optimization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p>Increase social media ad budget by 25%</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p>Implement 2-hour lead response SLA</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p>Create email campaign A/B test plan</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p>Schedule team training on consultative selling</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forecast</CardTitle>
                <CardDescription>Q2 2025 projections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted-foreground">Expected Revenue</p>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-2xl">Rp 3.2B</div>
                  <p className="text-muted-foreground mt-1">+33% vs Q1</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-muted-foreground">Expected Deals</p>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="text-2xl">165</div>
                  <p className="text-muted-foreground mt-1">+30% vs Q1</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
