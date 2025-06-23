
import React, { useState } from 'react';
import { Search, Bell, User, TrendingUp, TrendingDown, Download, Eye, RefreshCw, Filter, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { PortfolioSummaryCard } from '@/components/portfolio/PortfolioSummaryCard';
import { HoldingDetailsDrawer } from '@/components/portfolio/HoldingDetailsDrawer';

const Portfolio = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');

  // Mock portfolio data
  const portfolioSummary = {
    totalValue: 2847500,
    totalInvested: 2500000,
    profitLoss: 347500,
    returnPercent: 13.9,
    lastUpdated: new Date()
  };

  const holdings = [
    {
      id: 1,
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      quantity: 500,
      avgBuyPrice: 2450,
      currentPrice: 2650,
      marketValue: 1325000,
      unrealizedPL: 100000,
      allocation: 46.5,
      assetType: 'stock'
    },
    {
      id: 2,
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      quantity: 300,
      avgBuyPrice: 3200,
      currentPrice: 3580,
      marketValue: 1074000,
      unrealizedPL: 114000,
      allocation: 37.7,
      assetType: 'stock'
    },
    {
      id: 3,
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Ltd',
      quantity: 200,
      avgBuyPrice: 1500,
      currentPrice: 1620,
      marketValue: 324000,
      unrealizedPL: 24000,
      allocation: 11.4,
      assetType: 'stock'
    },
    {
      id: 4,
      symbol: 'NIFTY50ETF',
      name: 'NIFTY 50 ETF',
      quantity: 1000,
      avgBuyPrice: 120,
      currentPrice: 124.5,
      marketValue: 124500,
      unrealizedPL: 4500,
      allocation: 4.4,
      assetType: 'etf'
    }
  ];

  const allocationData = holdings.map(holding => ({
    name: holding.symbol,
    value: holding.allocation,
    marketValue: holding.marketValue
  }));

  const performanceData = [
    { date: '2024-01', value: 2500000 },
    { date: '2024-02', value: 2580000 },
    { date: '2024-03', value: 2650000 },
    { date: '2024-04', value: 2720000 },
    { date: '2024-05', value: 2800000 },
    { date: '2024-06', value: 2847500 }
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#06d6a0', '#f59e0b', '#ef4444'];

  const chartConfig = {
    allocation: {
      label: "Allocation",
    },
  };

  const filteredHoldings = holdings.filter(holding => {
    const matchesSearch = holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         holding.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || holding.assetType === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleHoldingClick = (holding) => {
    setSelectedHolding(holding);
    setIsDrawerOpen(true);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Symbol,Security Name,Quantity,Avg Buy Price,Current Price,Market Value,Unrealized P/L,Allocation %\n"
      + holdings.map(h => `${h.symbol},${h.name},${h.quantity},${h.avgBuyPrice},${h.currentPrice},${h.marketValue},${h.unrealizedPL},${h.allocation}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "portfolio_holdings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Same as Dashboard */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                FinanceHub
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={() => navigate('/dashboard')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => navigate('/trading')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Trading
                </button>
                <a href="#" className="text-blue-600 font-medium">Portfolio</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Research</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">News</a>
              </nav>
            </div>

            {/* Search and User Menu */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
              <p className="text-gray-600 mt-2">Track your investments and portfolio performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Portfolio Summary */}
          <PortfolioSummaryCard summary={portfolioSummary} />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Asset Allocation Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Portfolio Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Holdings Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Current Holdings</CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search holdings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <select 
                    value={filterType} 
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-md text-sm"
                  >
                    <option value="all">All Assets</option>
                    <option value="stock">Stocks</option>
                    <option value="etf">ETFs</option>
                    <option value="bond">Bonds</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer">
                      <div className="flex items-center">
                        Symbol
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Security Name</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Avg Buy Price</TableHead>
                    <TableHead className="text-right">Current Price</TableHead>
                    <TableHead className="text-right">Market Value</TableHead>
                    <TableHead className="text-right">Unrealized P/L</TableHead>
                    <TableHead className="text-right">Allocation %</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHoldings.map((holding) => (
                    <TableRow key={holding.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell className="font-medium">{holding.symbol}</TableCell>
                      <TableCell>{holding.name}</TableCell>
                      <TableCell className="text-right">{holding.quantity.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{holding.avgBuyPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{holding.currentPrice.toLocaleString()}</TableCell>
                      <TableCell className="text-right">₹{holding.marketValue.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className={`flex items-center justify-end ${
                          holding.unrealizedPL >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {holding.unrealizedPL >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                          ₹{Math.abs(holding.unrealizedPL).toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{holding.allocation}%</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleHoldingClick(holding)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Holding Details Drawer */}
      <HoldingDetailsDrawer 
        holding={selectedHolding}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default Portfolio;
