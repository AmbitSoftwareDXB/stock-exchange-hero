
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const MarketSnapshot = () => {
  const topGainers = [
    { name: 'TCS', price: '3,845.20', change: '+4.25%' },
    { name: 'Infosys', price: '1,567.80', change: '+3.89%' },
    { name: 'HDFC Bank', price: '1,623.45', change: '+2.67%' },
    { name: 'Reliance', price: '2,456.30', change: '+2.34%' },
    { name: 'ITC', price: '456.75', change: '+1.98%' }
  ];

  const topLosers = [
    { name: 'Coal India', price: '234.50', change: '-3.45%' },
    { name: 'ONGC', price: '189.75', change: '-2.89%' },
    { name: 'NTPC', price: '267.40', change: '-2.23%' },
    { name: 'Power Grid', price: '198.65', change: '-1.87%' },
    { name: 'IOC', price: '134.25', change: '-1.56%' }
  ];

  const mostActive = [
    { name: 'Reliance', volume: '2.5M', price: '2,456.30' },
    { name: 'TCS', volume: '1.8M', price: '3,845.20' },
    { name: 'HDFC Bank', volume: '1.6M', price: '1,623.45' },
    { name: 'Infosys', volume: '1.4M', price: '1,567.80' },
    { name: 'ITC', volume: '1.2M', price: '456.75' }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Snapshot</h2>
          <p className="text-gray-600">Real-time market movements and trading activity</p>
        </div>

        <Tabs defaultValue="gainers" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="gainers" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Top Gainers</span>
            </TabsTrigger>
            <TabsTrigger value="losers" className="flex items-center space-x-2">
              <TrendingDown className="h-4 w-4" />
              <span>Top Losers</span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Most Active</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gainers">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Top Gainers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topGainers.map((stock, index) => (
                    <div key={stock.name} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-gray-700">{index + 1}</span>
                        <span className="font-medium text-gray-900">{stock.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">₹{stock.price}</div>
                        <div className="text-green-600 font-medium">{stock.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="losers">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Top Losers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topLosers.map((stock, index) => (
                    <div key={stock.name} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-gray-700">{index + 1}</span>
                        <span className="font-medium text-gray-900">{stock.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">₹{stock.price}</div>
                        <div className="text-red-600 font-medium">{stock.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Most Active Stocks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mostActive.map((stock, index) => (
                    <div key={stock.name} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-gray-700">{index + 1}</span>
                        <span className="font-medium text-gray-900">{stock.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">₹{stock.price}</div>
                        <div className="text-blue-600 font-medium">Vol: {stock.volume}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default MarketSnapshot;
