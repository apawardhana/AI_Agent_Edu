import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Badge } from "../ui/badge";
import { Search, Package, Tag, HelpCircle } from "lucide-react";

export function KnowledgeHub() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "Apa itu AI Sales Agent Platform?",
      answer: "AI Sales Agent Platform adalah solusi komprehensif yang menggunakan 7 AI Agent untuk mengotomasi dan meningkatkan efektivitas proses penjualan, dari strategi hingga analisis performa.",
      category: "General",
    },
    {
      question: "Berapa lama waktu implementasi?",
      answer: "Implementasi standar memakan waktu 4-6 minggu, termasuk setup, integrasi, dan training tim. Untuk enterprise dengan custom requirements, bisa memakan waktu 8-12 minggu.",
      category: "Implementation",
    },
    {
      question: "Apakah bisa diintegrasikan dengan CRM existing?",
      answer: "Ya, platform kami mendukung integrasi dengan CRM populer seperti Salesforce, HubSpot, Zoho, dan lainnya melalui API atau native connector.",
      category: "Integration",
    },
    {
      question: "Bagaimana model pricing-nya?",
      answer: "Kami menawarkan 3 paket: Starter (Rp 10jt/tahun), Professional (Rp 50jt/tahun), dan Enterprise (custom pricing). Semua paket include support dan updates.",
      category: "Pricing",
    },
  ];

  const products = [
    {
      name: "AI Sales Agent - Complete Suite",
      description: "Full platform dengan 7 AI Agent untuk digital sales",
      features: ["Strategy Analysis", "Content Generation", "Customer Service", "Analytics"],
      price: "Rp 50jt/tahun",
      status: "available",
    },
    {
      name: "AI Content Generator Module",
      description: "Standalone module untuk content generation",
      features: ["Email templates", "Ad copywriting", "Proposal generator"],
      price: "Rp 15jt/tahun",
      status: "available",
    },
    {
      name: "AI Sales Analytics Dashboard",
      description: "Advanced analytics dan reporting untuk sales performance",
      features: ["Real-time dashboards", "Predictive insights", "Custom reports"],
      price: "Rp 20jt/tahun",
      status: "available",
    },
  ];

  const promos = [
    {
      title: "Early Bird Special - Q1 2025",
      description: "Diskon 30% untuk 100 customer pertama",
      validUntil: "31 Maret 2025",
      code: "EARLYBIRD30",
      status: "active",
    },
    {
      title: "Bundle Package",
      description: "Beli 2 module, gratis 1 module pilihan",
      validUntil: "30 Juni 2025",
      code: "BUNDLE2GET1",
      status: "active",
    },
    {
      title: "Referral Bonus",
      description: "Refer 3 customer, dapatkan 3 bulan gratis",
      validUntil: "Ongoing",
      code: "REFER3",
      status: "active",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Product Knowledge & Sales Information Hub</h1>
        <p className="text-muted-foreground mt-2">
          Knowledge base interaktif sales/marketing (FAQ, produk, promo)
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for products, FAQs, promotions..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="products">
            <Package className="w-4 h-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="promos">
            <Tag className="w-4 h-4 mr-2" />
            Promotions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <span>{faq.question}</span>
                        <Badge variant="outline">{faq.category}</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  → Product Documentation
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  → API Integration Guide
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  → Training Materials
                </button>
                <button className="w-full text-left p-3 hover:bg-accent rounded-lg transition-colors">
                  → Video Tutorials
                </button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p>support@aisalesagent.com</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p>+62 21 1234 5678</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Live Chat</p>
                  <p>Available 24/7</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle>{product.name}</CardTitle>
                    <Badge variant="default">Available</Badge>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-2">Key Features:</p>
                    <ul className="space-y-1">
                      {product.features.map((feature, fIdx) => (
                        <li key={fIdx} className="text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="text-2xl mb-4">{product.price}</div>
                    <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                      View Details
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="promos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promos.map((promo, idx) => (
              <Card key={idx} className="border-2 border-primary">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{promo.title}</CardTitle>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <CardDescription>{promo.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-accent rounded-lg">
                    <p className="text-muted-foreground mb-1">Promo Code</p>
                    <div className="flex items-center justify-between">
                      <code className="text-lg">{promo.code}</code>
                      <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
                        Copy
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Valid Until</p>
                    <p>{promo.validUntil}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Promotion Guidelines</CardTitle>
              <CardDescription>Important information about promotions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground">• Promo codes cannot be combined with other offers</p>
              <p className="text-muted-foreground">• All prices exclude VAT (PPN 11%)</p>
              <p className="text-muted-foreground">• Terms and conditions apply</p>
              <p className="text-muted-foreground">• Contact sales for custom enterprise pricing</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
