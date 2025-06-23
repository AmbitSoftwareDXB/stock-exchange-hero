
import React from 'react';
import { X, TrendingUp, TrendingDown, Calendar, DollarSign, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Holding {
  id: number;
  symbol: string;
  name: string;
  quantity: number;
  avgBuyPrice: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPL: number;
  allocation: number;
  assetType: string;
}

interface HoldingDetailsDrawerProps {
  holding: Holding | null;
  isOpen: boolean;
  onClose: () => void;
}

export const HoldingDetailsDrawer: React.FC<HoldingDetailsDrawerProps> = ({ 
  holding, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen || !holding) return null;

  const isPositive = holding.unrealizedPL >= 0;
  const priceChange = holding.currentPrice - holding.avgBuyPrice;
  const priceChangePercent = ((priceChange / holding.avgBuyPrice) * 100).toFixed(2);

  // Mock trade history data
  const tradeHistory = [
    { date: '2024-01-15', type: 'Buy', quantity: 200, price: 2400, amount: 480000 },
    { date: '2024-02-20', type: 'Buy', quantity: 300, price: 2500, amount: 750000 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative ml-auto w-full max-w-lg bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{holding.symbol}</h2>
              <p className="text-sm text-gray-600">{holding.name}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Current Position */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Quantity</p>
                    <p className="text-lg font-semibold">{holding.quantity.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Market Value</p>
                    <p className="text-lg font-semibold">₹{holding.marketValue.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Avg Buy Price</p>
                    <p className="text-lg font-semibold">₹{holding.avgBuyPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Price</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-semibold">₹{holding.currentPrice.toLocaleString()}</p>
                      <Badge variant={isPositive ? "default" : "destructive"} className="text-xs">
                        {isPositive ? '+' : ''}{priceChangePercent}%
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Unrealized P/L</p>
                    <div className={`flex items-center space-x-1 ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="font-semibold">
                        {isPositive ? '+' : ''}₹{Math.abs(holding.unrealizedPL).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trade History */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Trade History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tradeHistory.map((trade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Badge variant={trade.type === 'Buy' ? "default" : "secondary"}>
                          {trade.type}
                        </Badge>
                        <div>
                          <p className="text-sm font-medium">{trade.quantity} shares</p>
                          <p className="text-xs text-gray-600">{trade.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">₹{trade.price}</p>
                        <p className="text-xs text-gray-600">₹{trade.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Portfolio Allocation</span>
                    <span className="font-medium">{holding.allocation}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Asset Type</span>
                    <Badge variant="outline" className="capitalize">{holding.assetType}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Holding Period</span>
                    <span className="font-medium">156 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">No notes added for this holding.</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Add Note
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
