
import React, { useState } from 'react';
import { Filter, Save, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

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

interface StockScreenerProps {
  stocks: Stock[];
}

const StockScreener: React.FC<StockScreenerProps> = ({ stocks }) => {
  const [filters, setFilters] = useState({
    minPrice: [0],
    maxPrice: [5000],
    minMarketCap: '',
    maxMarketCap: '',
    sector: 'all',
    rating: 'all',
    minAnalysts: [0],
  });

  const [savedScreens] = useState([
    'Large Cap Growth',
    'Banking Stocks',
    'IT Sector Leaders',
    'Dividend Stocks',
    'High Beta Tech'
  ]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      minPrice: [0],
      maxPrice: [5000],
      minMarketCap: '',
      maxMarketCap: '',
      sector: 'all',
      rating: 'all',
      minAnalysts: [0],
    });
  };

  const filteredStocks = stocks.filter(stock => {
    const matchesPrice = stock.price >= filters.minPrice[0] && stock.price <= filters.maxPrice[0];
    const matchesSector = filters.sector === 'all' || stock.sector === filters.sector;
    const matchesRating = filters.rating === 'all' || stock.rating === filters.rating;
    const matchesAnalysts = stock.analystCount >= filters.minAnalysts[0];
    
    return matchesPrice && matchesSector && matchesRating && matchesAnalysts;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Panel */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Stock Screener
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Saved Screens */}
              <div>
                <Label className="text-sm font-medium">Saved Screens</Label>
                <div className="space-y-2 mt-2">
                  {savedScreens.map((screen, index) => (
                    <Button key={index} variant="outline" size="sm" className="w-full justify-start">
                      {screen}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <Label className="text-sm font-medium">Price Range (₹)</Label>
                <div className="space-y-3 mt-2">
                  <div>
                    <Label className="text-xs text-gray-600">Min Price: ₹{filters.minPrice[0]}</Label>
                    <Slider
                      value={filters.minPrice}
                      onValueChange={(value) => handleFilterChange('minPrice', value)}
                      max={2500}
                      step={50}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Max Price: ₹{filters.maxPrice[0]}</Label>
                    <Slider
                      value={filters.maxPrice}
                      onValueChange={(value) => handleFilterChange('maxPrice', value)}
                      max={5000}
                      step={100}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* Market Cap */}
              <div>
                <Label className="text-sm font-medium">Market Cap (₹ Cr)</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Input
                    placeholder="Min (Cr)"
                    value={filters.minMarketCap}
                    onChange={(e) => handleFilterChange('minMarketCap', e.target.value)}
                  />
                  <Input
                    placeholder="Max (Cr)"
                    value={filters.maxMarketCap}
                    onChange={(e) => handleFilterChange('maxMarketCap', e.target.value)}
                  />
                </div>
              </div>

              {/* Sector */}
              <div>
                <Label className="text-sm font-medium">Sector</Label>
                <Select value={filters.sector} onValueChange={(value) => handleFilterChange('sector', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sectors</SelectItem>
                    <SelectItem value="Oil & Gas">Oil & Gas</SelectItem>
                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                    <SelectItem value="Banking">Banking</SelectItem>
                    <SelectItem value="FMCG">FMCG</SelectItem>
                    <SelectItem value="Telecommunications">Telecommunications</SelectItem>
                    <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
                    <SelectItem value="Automobiles">Automobiles</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div>
                <Label className="text-sm font-medium">Analyst Rating</Label>
                <Select value={filters.rating} onValueChange={(value) => handleFilterChange('rating', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="Buy">Buy</SelectItem>
                    <SelectItem value="Hold">Hold</SelectItem>
                    <SelectItem value="Sell">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Analyst Coverage */}
              <div>
                <Label className="text-sm font-medium">Min Analysts: {filters.minAnalysts[0]}</Label>
                <Slider
                  value={filters.minAnalysts}
                  onValueChange={(value) => handleFilterChange('minAnalysts', value)}
                  max={50}
                  step={1}
                  className="mt-2"
                />
              </div>

              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Screen
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                Screening Results ({filteredStocks.length} stocks found)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStocks.map((stock) => (
                  <div key={stock.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="font-semibold">{stock.symbol}</h4>
                        <p className="text-sm text-gray-600">{stock.name}</p>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium">₹{stock.price.toLocaleString('en-IN')}</p>
                        <p className={stock.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {stock.change >= 0 ? '+' : ''}{stock.changePercent}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-right">
                        <p className="text-gray-600">Market Cap</p>
                        <p className="font-medium">{stock.marketCap}</p>
                      </div>
                      <div className="text-sm text-right">
                        <p className="text-gray-600">Rating</p>
                        <p className="font-medium">{stock.rating}</p>
                      </div>
                      <div className="text-sm text-right">
                        <p className="text-gray-600">Analysts</p>
                        <p className="font-medium">{stock.analystCount}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredStocks.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No stocks match your screening criteria.</p>
                    <p className="text-sm">Try adjusting your filters to see more results.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StockScreener;
