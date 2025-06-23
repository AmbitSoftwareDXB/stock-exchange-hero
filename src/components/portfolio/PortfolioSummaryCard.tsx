
import React from 'react';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  profitLoss: number;
  returnPercent: number;
  lastUpdated: Date;
}

interface PortfolioSummaryCardProps {
  summary: PortfolioSummary;
}

export const PortfolioSummaryCard: React.FC<PortfolioSummaryCardProps> = ({ summary }) => {
  const isPositive = summary.profitLoss >= 0;
  
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-sm font-medium text-blue-100 mb-2">Total Portfolio Value</h3>
            <div className="text-3xl font-bold">₹{summary.totalValue.toLocaleString()}</div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-blue-100 mb-2">Total Invested</h3>
            <div className="text-2xl font-semibold">₹{summary.totalInvested.toLocaleString()}</div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-blue-100 mb-2">Unrealized P/L</h3>
            <div className={`text-2xl font-semibold flex items-center ${
              isPositive ? 'text-green-300' : 'text-red-300'
            }`}>
              {isPositive ? <TrendingUp className="h-5 w-5 mr-2" /> : <TrendingDown className="h-5 w-5 mr-2" />}
              {isPositive ? '+' : ''}₹{summary.profitLoss.toLocaleString()}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-blue-100 mb-2">Overall Return</h3>
            <div className={`text-2xl font-semibold flex items-center ${
              isPositive ? 'text-green-300' : 'text-red-300'
            }`}>
              {isPositive ? <TrendingUp className="h-5 w-5 mr-2" /> : <TrendingDown className="h-5 w-5 mr-2" />}
              {isPositive ? '+' : ''}{summary.returnPercent}%
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-blue-500">
          <div className="flex items-center text-sm text-blue-100">
            <Clock className="h-4 w-4 mr-2" />
            Last updated: {summary.lastUpdated.toLocaleString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
