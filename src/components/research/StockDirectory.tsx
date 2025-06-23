
import React from 'react';
import { Search, Filter, Star, StarOff, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface StockDirectoryProps {
  stocks: Stock[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  selectedRating: string;
  setSelectedRating: (rating: string) => void;
  sectors: string[];
  ratings: string[];
  onStockSelect: (stock: Stock) => void;
  watchlist: number[];
  onToggleWatchlist: (stockId: number) => void;
}

const StockDirectory: React.FC<StockDirectoryProps> = ({
  stocks,
  searchTerm,
  setSearchTerm,
  selectedSector,
  setSelectedSector,
  selectedRating,
  setSelectedRating,
  sectors,
  ratings,
  onStockSelect,
  watchlist,
  onToggleWatchlist
}) => {
  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search by symbol or company name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sector" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>
                      {sector === 'all' ? 'All Sectors' : sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  {ratings.map(rating => (
                    <SelectItem key={rating} value={rating}>
                      {rating === 'all' ? 'All Ratings' : rating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stock Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocks.map((stock) => (
          <Card key={stock.id} className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1" onClick={() => onStockSelect(stock)}>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{stock.symbol}</h3>
                    <Badge variant="outline" className="text-xs">
                      {stock.sector}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-1">{stock.name}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWatchlist(stock.id);
                  }}
                  className="p-1 h-auto"
                >
                  {watchlist.includes(stock.id) ? (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <StarOff className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>

              <div className="space-y-3" onClick={() => onStockSelect(stock)}>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">₹{stock.price.toLocaleString('en-IN')}</span>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {stock.change >= 0 ? '+' : ''}₹{stock.change} ({stock.changePercent}%)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Market Cap:</span>
                    <p className="font-medium">{stock.marketCap}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Target Price:</span>
                    <p className="font-medium">₹{stock.targetPrice.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <Badge variant={
                    stock.rating === 'Buy' ? 'default' : 
                    stock.rating === 'Hold' ? 'secondary' : 'destructive'
                  }>
                    {stock.rating}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {stock.analystCount} analysts
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {stocks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No stocks found matching your criteria.</p>
          <p className="text-sm">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default StockDirectory;
