
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HeroSection = () => {
  const indices = [
    {
      name: 'NIFTY 50',
      value: '21,456.75',
      change: '+234.80',
      percentage: '+1.11%',
      isPositive: true
    },
    {
      name: 'NIFTY BANK',
      value: '46,892.30',
      change: '-145.25',
      percentage: '-0.31%',
      isPositive: false
    },
    {
      name: 'NIFTY IT',
      value: '32,876.90',
      change: '+456.70',
      percentage: '+1.41%',
      isPositive: true
    },
    {
      name: 'SENSEX',
      value: '71,234.56',
      change: '+567.89',
      percentage: '+0.80%',
      isPositive: true
    }
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            India's Leading Stock Exchange
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time market data, comprehensive analysis, and investor resources 
            for informed financial decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {indices.map((index) => (
            <Card key={index.name} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{index.name}</h3>
                  {index.isPositive ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {index.value}
                </div>
                <div className={`flex items-center space-x-2 ${
                  index.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="font-medium">{index.change}</span>
                  <span className="font-medium">({index.percentage})</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-4 bg-white px-6 py-3 rounded-lg shadow-md">
            <span className="text-sm text-gray-600">Last Updated:</span>
            <span className="font-semibold text-gray-900">15:30:45 IST</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
