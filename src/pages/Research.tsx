
import React, { useState, useMemo } from 'react';
import { Search, Bell, User, Filter, TrendingUp, TrendingDown, Star, Download, RefreshCw, Eye } from 'lucide-react';
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

// Mock research data
const mockStocks = [
  {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    sector: 'Technology',
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    marketCap: '2.8T',
    rating: 'Buy',
    targetPrice: 190.00,
    analystCount: 25,
    lastReport: '2024-01-15'
  },
  {
    id: 2,
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    sector: 'Technology',
    price: 378.85,
    change: -5.20,
    changePercent: -1.35,
    marketCap: '2.9T',
    rating: 'Buy',
    targetPrice: 425.00,
    analystCount: 30,
    lastReport: '2024-01-12'
  },
  {
    id: 3,
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    sector: 'Technology',
    price: 142.56,
    change: 1.87,
    changePercent: 1.33,
    marketCap: '1.8T',
    rating: 'Hold',
    targetPrice: 155.00,
    analystCount: 28,
    lastReport: '2024-01-10'
  },
  {
    id: 4,
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    sector: 'Automotive',
    price: 248.42,
    change: 12.35,
    changePercent: 5.23,
    marketCap: '790B',
    rating: 'Hold',
    targetPrice: 275.00,
    analystCount: 22,
    lastReport: '2024-01-08'
  },
  {
    id: 5,
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    sector: 'Technology',
    price: 722.48,
    change: -15.67,
    changePercent: -2.12,
    marketCap: '1.8T',
    rating: 'Buy',
    targetPrice: 800.00,
    analystCount: 35,
    lastReport: '2024-01-14'
  }
];

const Research = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedStock, setSelectedStock] = useState<typeof mockStocks[0] | null>(null);
  const [watchlist, setWatchlist] = useState<number[]>([]);

  const sectors = ['all', 'Technology', 'Healthcare', 'Financial', 'Automotive', 'Energy'];
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
                <button 
                  onClick={() => navigate('/portfolio')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Portfolio
                </button>
                <a href="/research" className="text-blue-600 font-medium">Research</a>
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
          <h1 className="text-3xl font-bold text-gray-900">Stock Research</h1>
          <p className="text-gray-600 mt-2">Discover, analyze, and compare research insights on stocks.</p>
        </div>

        <Tabs defaultValue="directory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="directory">Stock Directory</TabsTrigger>
            <TabsTrigger value="screener">Stock Screener</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          </TabsList>

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
                        <span className="font-medium">${stock.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Change:</span>
                        <span className={`font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change} ({stock.changePercent}%)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Target:</span>
                        <span className="font-medium">${stock.targetPrice}</span>
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
