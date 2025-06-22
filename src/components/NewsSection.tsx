
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ExternalLink } from 'lucide-react';

const NewsSection = () => {
  const news = [
    {
      title: 'Market Outlook: Positive Sentiment Continues Amid Strong Q3 Results',
      summary: 'Strong quarterly earnings from major companies boost investor confidence as markets reach new highs.',
      category: 'Market News',
      time: '2 hours ago',
      source: 'FinanceHub Research'
    },
    {
      title: 'RBI Announces New Guidelines for Digital Currency Trading',
      summary: 'Central bank releases comprehensive framework for cryptocurrency regulations and digital asset management.',
      category: 'Regulatory',
      time: '4 hours ago',
      source: 'Regulatory Updates'
    },
    {
      title: 'Technology Sector Shows Robust Growth in Latest Quarter',
      summary: 'IT companies report strong revenue growth driven by digital transformation initiatives globally.',
      category: 'Sector News',
      time: '6 hours ago',
      source: 'Sector Analysis'
    },
    {
      title: 'IPO Calendar: 5 Major Companies to List This Month',
      summary: 'Several high-profile companies prepare for public listings with strong subscription expectations.',
      category: 'IPO News',
      time: '8 hours ago',
      source: 'IPO Desk'
    }
  ];

  const announcements = [
    {
      title: 'Trading Holiday Notice - Gandhi Jayanti',
      date: 'Oct 2, 2024',
      type: 'Holiday Notice'
    },
    {
      title: 'New Margin Requirements for F&O Segment',
      date: 'Sep 28, 2024',
      type: 'Regulatory'
    },
    {
      title: 'System Maintenance Schedule',
      date: 'Sep 25, 2024',
      type: 'Technical'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">News & Updates</h2>
          <p className="text-gray-600">Stay informed with latest market news and regulatory updates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main News */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Latest News</h3>
            <div className="space-y-6">
              {news.map((article, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="secondary" className="mb-2">
                        {article.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.time}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2 text-lg">
                      {article.title}
                    </h4>
                    
                    <p className="text-gray-600 mb-4">
                      {article.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{article.source}</span>
                      <button className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium">
                        Read More <ExternalLink className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Market Status */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Market Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Equity Market</span>
                    <span className="text-green-600 font-semibold">OPEN</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">F&O Market</span>
                    <span className="text-green-600 font-semibold">OPEN</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Currency Market</span>
                    <span className="text-green-600 font-semibold">OPEN</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-3">
                    Market closes at 15:30 IST
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card>
              <CardHeader>
                <CardTitle>Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-medium text-gray-900 text-sm">
                        {announcement.title}
                      </h5>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{announcement.date}</span>
                        <Badge variant="outline" className="text-xs">
                          {announcement.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-4">
                  View All Announcements →
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
