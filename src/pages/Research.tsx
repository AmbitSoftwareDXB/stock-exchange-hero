import React, { useState, useMemo } from 'react';
import { Search, Bell, User, Filter, TrendingUp, TrendingDown, Star, Download, RefreshCw, Eye, Shield, FileCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import StockDirectory from '@/components/research/StockDirectory';
import ResearchDetailsPanel from '@/components/research/ResearchDetailsPanel';
import StockScreener from '@/components/research/StockScreener';

// Mock Indian research data
const mockStocks = [
  {
    id: 1,
    symbol: 'RELIANCE',
    name: 'Reliance Industries Limited',
    sector: 'Oil & Gas',
    price: 2485.30,
    change: 45.20,
    changePercent: 1.85,
    marketCap: '16.8L Cr',
    rating: 'Buy',
    targetPrice: 2750.00,
    analystCount: 28,
    lastReport: '2024-01-15'
  },
  {
    id: 2,
    symbol: 'TCS',
    name: 'Tata Consultancy Services Limited',
    sector: 'Information Technology',
    price: 3542.75,
    change: -62.40,
    changePercent: -1.73,
    marketCap: '12.9L Cr',
    rating: 'Buy',
    targetPrice: 3800.00,
    analystCount: 32,
    lastReport: '2024-01-12'
  },
  {
    id: 3,
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Limited',
    sector: 'Banking',
    price: 1543.85,
    change: 28.65,
    changePercent: 1.89,
    marketCap: '11.8L Cr',
    rating: 'Hold',
    targetPrice: 1650.00,
    analystCount: 30,
    lastReport: '2024-01-10'
  },
  {
    id: 4,
    symbol: 'INFY',
    name: 'Infosys Limited',
    sector: 'Information Technology',
    price: 1387.40,
    change: 75.30,
    changePercent: 5.74,
    marketCap: '5.8L Cr',
    rating: 'Hold',
    targetPrice: 1500.00,
    analystCount: 25,
    lastReport: '2024-01-08'
  },
  {
    id: 5,
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Limited',
    sector: 'Banking',
    price: 1098.25,
    change: -18.75,
    changePercent: -1.68,
    marketCap: '7.7L Cr',
    rating: 'Buy',
    targetPrice: 1200.00,
    analystCount: 27,
    lastReport: '2024-01-14'
  },
  {
    id: 6,
    symbol: 'HINDUNILVR',
    name: 'Hindustan Unilever Limited',
    sector: 'FMCG',
    price: 2678.90,
    change: 34.50,
    changePercent: 1.30,
    marketCap: '6.3L Cr',
    rating: 'Buy',
    targetPrice: 2850.00,
    analystCount: 22,
    lastReport: '2024-01-13'
  },
  {
    id: 7,
    symbol: 'ITC',
    name: 'ITC Limited',
    sector: 'FMCG',
    price: 456.20,
    change: 12.80,
    changePercent: 2.89,
    marketCap: '5.7L Cr',
    rating: 'Hold',
    targetPrice: 480.00,
    analystCount: 20,
    lastReport: '2024-01-11'
  },
  {
    id: 8,
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Limited',
    sector: 'Telecommunications',
    price: 1198.35,
    change: -15.25,
    changePercent: -1.26,
    marketCap: '6.8L Cr',
    rating: 'Buy',
    targetPrice: 1300.00,
    analystCount: 24,
    lastReport: '2024-01-09'
  }
];

const Research = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedStock, setSelectedStock] = useState<typeof mockStocks[0] | null>(null);
  const [watchlist, setWatchlist] = useState<number[]>([]);

  // Check user role
  const isAuditor = localStorage.getItem('auditorId') !== null;
  const isMember = localStorage.getItem('memberId') !== null && !isAuditor;
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  console.log('Research page loaded');

  const sectors = ['all', 'Oil & Gas', 'Information Technology', 'Banking', 'FMCG', 'Telecommunications', 'Pharmaceuticals', 'Automobiles'];
  const ratings = ['all', 'Buy', 'Hold', 'Sell'];

  const filteredStocks = useMemo(() => {
    return mockStocks.filter(stock => {
      const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = selectedSector === 'all' || stock.sector === selectedSector;
      const matchesRating = selectedRating === 'all' || stock.rating === selectedRating;
      
      return matchesSearch && matchesSector && matchesRating;
    });
  }, [searchTerm, selectedSector, selectedRating]);

  const handleStockSelect = (stock: typeof mockStocks[0]) => {
    setSelectedStock(stock);
  };

  const toggleWatchlist = (stockId: number) => {
    setWatchlist(prev => 
      prev.includes(stockId) 
        ? prev.filter(id => id !== stockId)
        : [...prev, stockId]
    );
  };

  const handleNavigation = (path: string) => {
    console.log(`Research navigation clicked: ${path}`);
    navigate(path);
  };

  // Auditor-specific tabs
  const getTabsList = () => {
    if (isAuditor) {
      return (
        <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
          <TabsTrigger value="directory">Stock Directory</TabsTrigger>
          <TabsTrigger value="screener">Stock Screener</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Check</TabsTrigger>
          <TabsTrigger value="reports">Audit Reports</TabsTrigger>
        </TabsList>
      );
    }
    
    return (
      <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
        <TabsTrigger value="directory">Stock Directory</TabsTrigger>
        <TabsTrigger value="screener">Stock Screener</TabsTrigger>
        <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
      </TabsList>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Same as Dashboard */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => handleNavigation('/')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl hover:bg-blue-700 transition-colors"
              >
                FinanceHub
              </button>
              <nav className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={() => handleNavigation('/dashboard')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Dashboard
                </button>
                {isMember && (
                  <>
                    <button 
                      onClick={() => handleNavigation('/trading')} 
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Trading
                    </button>
                    <button 
                      onClick={() => handleNavigation('/portfolio')} 
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Portfolio
                    </button>
                  </>
                )}
                <button 
                  onClick={() => handleNavigation('/research')} 
                  className="text-blue-600 font-medium"
                >
                  Research
                </button>
                {isAuditor && (
                  <button 
                    onClick={() => console.log('Audit Reports clicked')}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Audit Reports
                  </button>
                )}
              </nav>
            </div>

            {/* Search and User Menu */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder={isAuditor ? "Search members, reports..." : "Search..."}
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
          <h1 className="text-3xl font-bold text-gray-900">
            {isAuditor ? 'Audit Research Center' : 'Stock Research'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isAuditor 
              ? 'Access member portfolios, compliance reports, and risk assessments.' 
              : 'Discover, analyze, and compare research insights on Indian stocks.'
            }
          </p>
        </div>

        <Tabs defaultValue="directory" className="space-y-6">
          {getTabsList()}

          <TabsContent value="directory" className="space-y-6">
            <StockDirectory 
              stocks={filteredStocks}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedSector={selectedSector}
              setSelectedSector={setSelectedSector}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              sectors={sectors}
              ratings={ratings}
              onStockSelect={handleStockSelect}
              watchlist={watchlist}
              onToggleWatchlist={toggleWatchlist}
            />
          </TabsContent>

          <TabsContent value="screener" className="space-y-6">
            <StockScreener stocks={mockStocks} />
          </TabsContent>

          {/* Member-only Watchlist Tab */}
          {!isAuditor && (
            <TabsContent value="watchlist" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {mockStocks.filter(stock => watchlist.includes(stock.id)).map((stock) => (
                  <Card key={stock.id} className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleStockSelect(stock)}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{stock.symbol}</h3>
                          <p className="text-sm text-gray-600">{stock.name}</p>
                        </div>
                        <Badge variant={stock.rating === 'Buy' ? 'default' : stock.rating === 'Hold' ? 'secondary' : 'destructive'}>
                          {stock.rating}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Price:</span>
                          <span className="font-medium">₹{stock.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Change:</span>
                          <span className={`font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stock.change >= 0 ? '+' : ''}₹{stock.change} ({stock.changePercent}%)
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Target:</span>
                          <span className="font-medium">₹{stock.targetPrice}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {watchlist.length === 0 && (
                  <div className="col-span-3 text-center py-12 text-gray-500">
                    <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No stocks in your watchlist yet.</p>
                    <p className="text-sm">Add stocks from the directory to track them here.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          )}

          {/* Auditor-only Compliance Check Tab */}
          {isAuditor && (
            <TabsContent value="compliance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      Member Compliance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Current Member ID:</span>
                        <Badge variant="outline">MEM54321</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance Score:</span>
                        <Badge variant="default">95%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Level:</span>
                        <Badge variant="secondary">Medium</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Audit:</span>
                        <span className="text-sm text-gray-600">Jan 15, 2024</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5 text-green-600" />
                      Portfolio Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>High-Risk Holdings:</span>
                        <Badge variant="destructive">3</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Concentration Risk:</span>
                        <Badge variant="secondary">Low</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Leverage Ratio:</span>
                        <span className="font-medium">2.5x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Margin Utilization:</span>
                        <span className="font-medium">34%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Auditor-only Reports Tab */}
          {isAuditor && (
            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Audit Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: 1, member: 'MEM54321', date: '2024-01-15', status: 'Completed', risk: 'Medium' },
                        { id: 2, member: 'MEM12345', date: '2024-01-12', status: 'In Progress', risk: 'Low' },
                        { id: 3, member: 'MEM67890', date: '2024-01-10', status: 'Pending Review', risk: 'High' }
                      ].map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Member: {report.member}</h4>
                            <p className="text-sm text-gray-600">Date: {report.date}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant={report.status === 'Completed' ? 'default' : 'secondary'}>
                              {report.status}
                            </Badge>
                            <Badge variant={report.risk === 'High' ? 'destructive' : report.risk === 'Medium' ? 'secondary' : 'default'}>
                              {report.risk} Risk
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>

        {/* Research Details Panel */}
        {selectedStock && (
          <ResearchDetailsPanel 
            stock={selectedStock} 
            onClose={() => setSelectedStock(null)}
          />
        )}
      </main>
    </div>
  );
};

export default Research;
