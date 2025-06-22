
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProductOfferings = () => {
  const products = [
    {
      title: 'Equities',
      description: 'Trade in shares of listed companies with real-time market data',
      features: ['Cash Segment', 'Delivery Trading', 'Intraday Trading', 'BTST/STBT'],
      badge: 'Most Popular',
      badgeColor: 'bg-green-100 text-green-800'
    },
    {
      title: 'Derivatives',
      description: 'Futures and Options trading for hedging and speculation',
      features: ['Index Futures', 'Stock Futures', 'Index Options', 'Stock Options'],
      badge: 'High Volume',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Currency',
      description: 'Trade in currency futures and options',
      features: ['USD-INR', 'EUR-INR', 'GBP-INR', 'JPY-INR'],
      badge: 'Global',
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      title: 'Commodities',
      description: 'Trade in commodity futures and options',
      features: ['Precious Metals', 'Energy', 'Base Metals', 'Agri Commodities'],
      badge: 'Diversified',
      badgeColor: 'bg-orange-100 text-orange-800'
    },
    {
      title: 'Bonds & Debt',
      description: 'Government and corporate bonds for stable returns',
      features: ['Government Bonds', 'Corporate Bonds', 'Treasury Bills', 'SDLs'],
      badge: 'Stable',
      badgeColor: 'bg-gray-100 text-gray-800'
    },
    {
      title: 'ETFs & Mutual Funds',
      description: 'Exchange-traded funds and mutual fund investments',
      features: ['Equity ETFs', 'Debt ETFs', 'Gold ETFs', 'International ETFs'],
      badge: 'Diversified',
      badgeColor: 'bg-indigo-100 text-indigo-800'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trading Products</h2>
          <p className="text-gray-600">Comprehensive range of financial instruments for every investor</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow relative">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <Badge className={`${product.badgeColor} border-0`}>
                    {product.badge}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Available Instruments:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full">
                    Start Trading
                  </Button>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trading Stats */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Market Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">₹45,67,890 Cr</div>
              <div className="text-blue-100">Daily Turnover</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2,150+</div>
              <div className="text-blue-100">Listed Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5.6M+</div>
              <div className="text-blue-100">Active Investors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">99.99%</div>
              <div className="text-blue-100">System Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOfferings;
