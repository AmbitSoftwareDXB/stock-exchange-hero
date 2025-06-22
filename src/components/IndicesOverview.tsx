
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const IndicesOverview = () => {
  const chartData = [
    { time: '09:15', value: 21200 },
    { time: '10:00', value: 21250 },
    { time: '11:00', value: 21180 },
    { time: '12:00', value: 21300 },
    { time: '13:00', value: 21420 },
    { time: '14:00', value: 21380 },
    { time: '15:00', value: 21456 }
  ];

  const indices = [
    {
      name: 'NIFTY 50',
      value: '21,456.75',
      change: '+234.80 (+1.11%)',
      isPositive: true,
      description: 'India\'s premier stock market index'
    },
    {
      name: 'NIFTY BANK',
      value: '46,892.30',
      change: '-145.25 (-0.31%)',
      isPositive: false,
      description: 'Banking sector performance index'
    },
    {
      name: 'NIFTY IT',
      value: '32,876.90',
      change: '+456.70 (+1.41%)',
      isPositive: true,
      description: 'Information Technology sector index'
    },
    {
      name: 'NIFTY AUTO',
      value: '18,234.45',
      change: '+123.67 (+0.68%)',
      isPositive: true,
      description: 'Automobile sector index'
    },
    {
      name: 'NIFTY PHARMA',
      value: '14,567.20',
      change: '-89.45 (-0.61%)',
      isPositive: false,
      description: 'Pharmaceutical sector index'
    },
    {
      name: 'NIFTY FMCG',
      value: '56,789.80',
      change: '+234.56 (+0.41%)',
      isPositive: true,
      description: 'Fast Moving Consumer Goods index'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Market Indices</h2>
          <p className="text-gray-600">Comprehensive view of major market indices and sector performance</p>
        </div>

        {/* Featured Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>NIFTY 50 - Today's Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="time" />
                  <YAxis domain={['dataMin - 50', 'dataMax + 50']} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Indices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {indices.map((index) => (
            <Card key={index.name} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg text-gray-900">{index.name}</h3>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    index.isPositive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {index.isPositive ? 'UP' : 'DOWN'}
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-2xl font-bold text-gray-900">{index.value}</div>
                  <div className={`text-sm font-medium ${
                    index.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {index.change}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">{index.description}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details →
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndicesOverview;
