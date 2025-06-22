
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, BarChart3, FileText, Shield, HelpCircle, TrendingUp } from 'lucide-react';

const InvestorTools = () => {
  const tools = [
    {
      icon: Calculator,
      title: 'Investment Calculator',
      description: 'Calculate returns on your investments with our comprehensive tools',
      features: ['SIP Calculator', 'EMI Calculator', 'Tax Calculator']
    },
    {
      icon: BarChart3,
      title: 'Option Chain Analysis',
      description: 'Real-time option chain data and analysis for informed trading',
      features: ['Live Options Data', 'Greeks Analysis', 'Put-Call Ratio']
    },
    {
      icon: FileText,
      title: 'Historical Reports',
      description: 'Access comprehensive historical market data and reports',
      features: ['Price History', 'Volume Analysis', 'Corporate Actions']
    },
    {
      icon: Shield,
      title: 'Compliance Center',
      description: 'Stay compliant with regulatory requirements and guidelines',
      features: ['Regulatory Updates', 'Compliance Status', 'FATCA/CRS']
    },
    {
      icon: HelpCircle,
      title: 'Dispute Resolution',
      description: 'Quick and efficient resolution of trading disputes',
      features: ['File Complaint', 'Track Status', 'Resolution Timeline']
    },
    {
      icon: TrendingUp,
      title: 'Market Research',
      description: 'In-depth market analysis and research reports',
      features: ['Research Reports', 'Technical Analysis', 'Market Outlook']
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Investor Tools & Resources</h2>
          <p className="text-gray-600">Comprehensive tools to help you make informed investment decisions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <p className="text-gray-600 mb-4 flex-grow">
                    {tool.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {tool.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="w-full mt-auto" variant="outline">
                    Access Tool
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Access Section */}
        <div className="mt-12 bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Access</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col space-y-1">
              <span className="font-semibold">Market Depth</span>
              <span className="text-xs text-gray-500">Live order book</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-1">
              <span className="font-semibold">Price Alerts</span>
              <span className="text-xs text-gray-500">Set custom alerts</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-1">
              <span className="font-semibold">Portfolio</span>
              <span className="text-xs text-gray-500">Track holdings</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col space-y-1">
              <span className="font-semibold">Watchlist</span>
              <span className="text-xs text-gray-500">Monitor stocks</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorTools;
