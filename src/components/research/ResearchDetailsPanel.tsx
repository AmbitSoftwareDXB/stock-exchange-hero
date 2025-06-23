
import React, { useState } from 'react';
import { X, Download, ExternalLink, TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface Stock {
  id: number;
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  rating: string;
  targetPrice: number;
  analystCount: number;
  lastReport: string;
}

interface ResearchDetailsPanelProps {
  stock: Stock;
  onClose: () => void;
}

// Mock data for charts
const priceData = [
  { date: '2024-01-01', price: 165.00 },
  { date: '2024-01-08', price: 168.50 },
  { date: '2024-01-15', price: 172.25 },
  { date: '2024-01-22', price: 175.43 },
];

const analystRatings = [
  { rating: 'Buy', count: 15 },
  { rating: 'Hold', count: 8 },
  { rating: 'Sell', count: 2 },
];

const financialData = [
  { metric: 'Revenue', value: '394.3B', change: 8.2 },
  { metric: 'Net Income', value: '97.0B', change: 5.4 },
  { metric: 'EPS', value: '6.16', change: 7.8 },
  { metric: 'P/E Ratio', value: '28.5', change: -2.1 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

const ResearchDetailsPanel: React.FC<ResearchDetailsPanelProps> = ({ stock, onClose }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">{stock.symbol}</h2>
              <p className="text-gray-600">{stock.name}</p>
            </div>
            <Badge variant={
              stock.rating === 'Buy' ? 'default' : 
              stock.rating === 'Hold' ? 'secondary' : 'destructive'
            }>
              {stock.rating}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financials">Financials</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Price and Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Price Performance
                      <div className="flex gap-2">
                        {['1W', '1M', '3M', '1Y'].map((timeframe) => (
                          <Button
                            key={timeframe}
                            variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedTimeframe(timeframe)}
                          >
                            {timeframe}
                          </Button>
                        ))}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={priceData}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold">${stock.price}</div>
                        <div className={`flex items-center justify-center gap-1 mt-2 ${
                          stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Cap</span>
                        <span className="font-medium">{stock.marketCap}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target Price</span>
                        <span className="font-medium">${stock.targetPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Upside</span>
                        <span className="font-medium text-green-600">
                          {((stock.targetPrice - stock.price) / stock.price * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Analysts</span>
                        <span className="font-medium">{stock.analystCount}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Analyst Ratings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Analyst Ratings Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analystRatings}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="count"
                            nameKey="rating"
                          >
                            {analystRatings.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Research Reports</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Goldman Sachs</p>
                        <p className="text-sm text-gray-600">Price Target: $190</p>
                      </div>
                      <Badge>Buy</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Morgan Stanley</p>
                        <p className="text-sm text-gray-600">Price Target: $185</p>
                      </div>
                      <Badge variant="secondary">Hold</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">JPMorgan</p>
                        <p className="text-sm text-gray-600">Price Target: $195</p>
                      </div>
                      <Badge>Buy</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="financials" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Financial Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {financialData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{item.metric}</span>
                        <div className="text-right">
                          <div className="font-bold">{item.value}</div>
                          <div className={`text-sm ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {item.change >= 0 ? '+' : ''}{item.change}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{}} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { quarter: 'Q1', revenue: 89.6 },
                          { quarter: 'Q2', revenue: 81.4 },
                          { quarter: 'Q3', revenue: 89.5 },
                          { quarter: 'Q4', revenue: 117.2 },
                        ]}>
                          <XAxis dataKey="quarter" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="revenue" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Thesis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">
                    {stock.name} continues to demonstrate strong fundamentals with consistent revenue growth 
                    and market leadership in the {stock.sector.toLowerCase()} sector. The company's strategic 
                    initiatives and innovation pipeline position it well for future growth.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">Strengths</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Strong market position</li>
                        <li>• Consistent profitability</li>
                        <li>• Innovation leadership</li>
                        <li>• Strong balance sheet</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">Risks</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Market competition</li>
                        <li>• Regulatory challenges</li>
                        <li>• Economic headwinds</li>
                        <li>• Supply chain risks</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news" className="space-y-6">
              <div className="space-y-4">
                {[
                  {
                    title: `${stock.name} Reports Strong Q4 Earnings`,
                    source: 'Financial Times',
                    time: '2 hours ago',
                    excerpt: 'Company beats analyst expectations with strong revenue growth...'
                  },
                  {
                    title: 'Analyst Upgrades Rating to Buy',
                    source: 'Reuters',
                    time: '1 day ago',
                    excerpt: 'Goldman Sachs raises price target citing strong fundamentals...'
                  },
                  {
                    title: 'New Product Launch Announcement',
                    source: 'Bloomberg',
                    time: '3 days ago',
                    excerpt: 'Company unveils innovative product line targeting new markets...'
                  }
                ].map((news, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{news.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{news.excerpt}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{news.source}</span>
                            <span>•</span>
                            <span>{news.time}</span>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400 ml-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ResearchDetailsPanel;
