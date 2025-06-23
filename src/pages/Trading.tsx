import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Download, Filter, Search, RefreshCw, MoreHorizontal, TrendingUp, TrendingDown, Eye, Bell, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useNavigate } from 'react-router-dom';

// Mock trading data
const mockTrades = [
  {
    id: 'TXN001',
    date: '2024-01-15',
    symbol: 'RELIANCE',
    type: 'Buy',
    quantity: 100,
    price: 2450.50,
    totalValue: 245050,
    status: 'Executed',
    notes: 'Quarterly results expected'
  },
  {
    id: 'TXN002',
    date: '2024-01-15',
    symbol: 'TCS',
    type: 'Sell',
    quantity: 50,
    price: 3875.75,
    totalValue: 193787.50,
    status: 'Executed',
    notes: 'Profit booking'
  },
  {
    id: 'TXN003',
    date: '2024-01-14',
    symbol: 'INFY',
    type: 'Buy',
    quantity: 75,
    price: 1580.25,
    totalValue: 118518.75,
    status: 'Executed',
    notes: 'Technical breakout'
  },
  {
    id: 'TXN004',
    date: '2024-01-14',
    symbol: 'HDFC',
    type: 'Buy',
    quantity: 25,
    price: 1654.30,
    totalValue: 41357.50,
    status: 'Executed',
    notes: 'Banking sector outlook positive'
  },
  {
    id: 'TXN005',
    date: '2024-01-13',
    symbol: 'ITC',
    type: 'Sell',
    quantity: 200,
    price: 485.60,
    totalValue: 97120,
    status: 'Executed',
    notes: 'Sector rotation'
  }
];

// Chart data
const volumeData = [
  { date: '2024-01-10', volume: 125000 },
  { date: '2024-01-11', volume: 180000 },
  { date: '2024-01-12', volume: 95000 },
  { date: '2024-01-13', volume: 97120 },
  { date: '2024-01-14', volume: 159876 },
  { date: '2024-01-15', volume: 438837 }
];

const tradeTypeData = [
  { name: 'Buy', value: 65, color: '#22c55e' },
  { name: 'Sell', value: 35, color: '#ef4444' }
];

const chartConfig = {
  volume: {
    label: "Volume",
    color: "#2563eb",
  },
};

const Trading = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrade, setSelectedTrade] = useState<any>(null);
  const itemsPerPage = 10;

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalTrades = mockTrades.length;
    const totalVolume = mockTrades.reduce((sum, trade) => sum + trade.totalValue, 0);
    const buyTrades = mockTrades.filter(trade => trade.type === 'Buy');
    const sellTrades = mockTrades.filter(trade => trade.type === 'Sell');
    const netProfitLoss = sellTrades.reduce((sum, trade) => sum + trade.totalValue, 0) - 
                         buyTrades.reduce((sum, trade) => sum + trade.totalValue, 0);
    const winRate = (sellTrades.length / totalTrades) * 100;
    const largestTrade = Math.max(...mockTrades.map(trade => trade.totalValue));

    return {
      totalTrades,
      totalVolume,
      netProfitLoss,
      winRate,
      largestTrade
    };
  }, []);

  // Filter and sort trades
  const filteredTrades = useMemo(() => {
    let filtered = mockTrades.filter(trade => {
      const matchesSearch = trade.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           trade.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || trade.type.toLowerCase() === filterType;
      return matchesSearch && matchesType;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'symbol':
          aValue = a.symbol;
          bValue = b.symbol;
          break;
        case 'value':
          aValue = a.totalValue;
          bValue = b.totalValue;
          break;
        default:
          aValue = a.date;
          bValue = b.date;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, filterType, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredTrades.length / itemsPerPage);
  const paginatedTrades = filteredTrades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const exportToCSV = () => {
    const headers = ['Trade ID', 'Date', 'Symbol', 'Type', 'Quantity', 'Price', 'Total Value', 'Status', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...filteredTrades.map(trade => [
        trade.id,
        trade.date,
        trade.symbol,
        trade.type,
        trade.quantity,
        trade.price,
        trade.totalValue,
        trade.status,
        `"${trade.notes}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'trades_export.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Updated to match Dashboard navigation */}
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
                <a href="/trading" className="text-blue-600 font-medium">Trading</a>
                <button 
                  onClick={() => navigate('/portfolio')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Portfolio
                </button>
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
      
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Trades</h1>
              <p className="text-gray-600 mt-2">Track and analyze your trading activity</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={() => window.location.reload()} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button onClick={exportToCSV} variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Trades</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.totalTrades}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Volume</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.totalVolume)}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Net P&L</p>
                  <p className={`text-2xl font-bold ${metrics.netProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(metrics.netProfitLoss)}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${metrics.netProfitLoss >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  {metrics.netProfitLoss >= 0 ? 
                    <TrendingUp className="h-6 w-6 text-green-600" /> : 
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Win Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.winRate.toFixed(1)}%</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Largest Trade</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.largestTrade)}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Trading Volume Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={volumeData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="volume" 
                      stroke="var(--color-volume)" 
                      strokeWidth={2}
                      dot={{ fill: "var(--color-volume)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trade Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={tradeTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {tradeTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                {tradeTypeData.map((entry) => (
                  <div key={entry.name} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{entry.name}: {entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by symbol or trade ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="symbol">Symbol</SelectItem>
                    <SelectItem value="value">Value</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trading History Table */}
        <Card>
          <CardHeader>
            <CardTitle>Trading History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trade ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTrades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell className="font-medium">{trade.id}</TableCell>
                    <TableCell>{trade.date}</TableCell>
                    <TableCell className="font-semibold">{trade.symbol}</TableCell>
                    <TableCell>
                      <Badge variant={trade.type === 'Buy' ? 'default' : 'destructive'}>
                        {trade.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{trade.quantity.toLocaleString()}</TableCell>
                    <TableCell>{formatCurrency(trade.price)}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(trade.totalValue)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {trade.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedTrade(trade)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Trade Details - {trade.id}</DrawerTitle>
                          </DrawerHeader>
                          <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-600">Symbol</p>
                                <p className="text-lg font-semibold">{trade.symbol}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-600">Trade Type</p>
                                <Badge variant={trade.type === 'Buy' ? 'default' : 'destructive'}>
                                  {trade.type}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-600">Quantity</p>
                                <p className="text-lg">{trade.quantity.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-600">Price</p>
                                <p className="text-lg">{formatCurrency(trade.price)}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-600">Total Value</p>
                                <p className="text-lg font-semibold">{formatCurrency(trade.totalValue)}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-600">Status</p>
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                  {trade.status}
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">Notes</p>
                              <p className="text-sm text-gray-800 mt-1">{trade.notes}</p>
                            </div>
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Trading;
