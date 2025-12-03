import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Progress } from "../ui/progress";
import { TrendingUp, TrendingDown, Star, DollarSign, Users } from "lucide-react";

export function CustomerValuation() {
  const customers = [
    {
      id: 1,
      name: "PT Maju Jaya",
      loyaltyScore: 92,
      ticketSize: "High",
      referralPotential: 85,
      lifetime: "Rp 450M",
      trend: "up",
      segment: "VIP",
    },
    {
      id: 2,
      name: "CV Berkah Sejahtera",
      loyaltyScore: 78,
      ticketSize: "Medium",
      referralPotential: 65,
      lifetime: "Rp 180M",
      trend: "up",
      segment: "Premium",
    },
    {
      id: 3,
      name: "UD Sumber Rezeki",
      loyaltyScore: 65,
      ticketSize: "Medium",
      referralPotential: 55,
      lifetime: "Rp 120M",
      trend: "stable",
      segment: "Standard",
    },
    {
      id: 4,
      name: "PT Digital Inovasi",
      loyaltyScore: 88,
      ticketSize: "High",
      referralPotential: 90,
      lifetime: "Rp 520M",
      trend: "up",
      segment: "VIP",
    },
    {
      id: 5,
      name: "CV Karya Mandiri",
      loyaltyScore: 45,
      ticketSize: "Low",
      referralPotential: 30,
      lifetime: "Rp 45M",
      trend: "down",
      segment: "Basic",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Customer Valuation</h1>
        <p className="text-muted-foreground mt-2">
          Profiling, scoring & rekomendasi customer (loyalty, ticket size, referral)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Customers</p>
                <div className="text-2xl">1,247</div>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">VIP Customers</p>
                <div className="text-2xl">156</div>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Avg Loyalty Score</p>
                <div className="text-2xl">74.5</div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total LTV</p>
                <div className="text-2xl">Rp 8.4B</div>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Profiles & Scores</CardTitle>
          <CardDescription>AI-powered customer valuation and segmentation</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Loyalty Score</TableHead>
                <TableHead>Ticket Size</TableHead>
                <TableHead>Referral Potential</TableHead>
                <TableHead>Lifetime Value</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        customer.segment === "VIP"
                          ? "default"
                          : customer.segment === "Premium"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {customer.segment}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Progress value={customer.loyaltyScore} className="w-24" />
                        <span>{customer.loyaltyScore}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={customer.ticketSize === "High" ? "default" : "outline"}
                    >
                      {customer.ticketSize}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={customer.referralPotential} className="w-24" />
                      <span>{customer.referralPotential}</span>
                    </div>
                  </TableCell>
                  <TableCell>{customer.lifetime}</TableCell>
                  <TableCell>
                    {customer.trend === "up" ? (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    ) : customer.trend === "down" ? (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Recommendations</CardTitle>
            <CardDescription>AI-powered customer insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p>PT Maju Jaya: Ready for upsell opportunity</p>
                  <p className="text-muted-foreground mt-1">
                    High engagement + growing business = perfect timing for premium package
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p>CV Karya Mandiri: At-risk customer</p>
                  <p className="text-muted-foreground mt-1">
                    Declining engagement - recommend proactive outreach within 7 days
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p>PT Digital Inovasi: High referral potential</p>
                  <p className="text-muted-foreground mt-1">
                    Satisfied customer with extensive network - initiate referral program
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Segment Distribution</CardTitle>
            <CardDescription>Customer segmentation overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span>VIP</span>
                <span>156 customers (12.5%)</span>
              </div>
              <Progress value={12.5} className="h-3" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span>Premium</span>
                <span>342 customers (27.4%)</span>
              </div>
              <Progress value={27.4} className="h-3" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span>Standard</span>
                <span>498 customers (39.9%)</span>
              </div>
              <Progress value={39.9} className="h-3" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span>Basic</span>
                <span>251 customers (20.1%)</span>
              </div>
              <Progress value={20.1} className="h-3" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
