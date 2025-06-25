
import React from 'react';
import { X, FileText, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AuditReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  memberReport: {
    id: number;
    member: string;
    date: string;
    status: string;
    risk: string;
  };
}

const AuditReportDialog: React.FC<AuditReportDialogProps> = ({ isOpen, onClose, memberReport }) => {
  // Mock detailed audit data
  const auditDetails = {
    memberInfo: {
      id: memberReport.member,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 9876543210',
      joinDate: '2023-06-15',
      kycStatus: 'Verified'
    },
    portfolioSummary: {
      totalValue: '₹15,67,850',
      totalInvestment: '₹12,45,000',
      totalGainLoss: '₹3,22,850',
      gainLossPercent: '+25.9%',
      riskScore: 'Medium',
      diversificationScore: '78/100'
    },
    riskAssessment: {
      concentrationRisk: 'Low',
      volatilityRisk: 'Medium',
      liquidityRisk: 'Low',
      leverageRisk: 'High',
      overallRisk: memberReport.risk
    },
    complianceChecks: [
      { check: 'KYC Documentation', status: 'Pass', details: 'All documents verified' },
      { check: 'Trading Limits', status: 'Pass', details: 'Within prescribed limits' },
      { check: 'Margin Requirements', status: 'Fail', details: 'Exceeds safe margin ratio' },
      { check: 'Position Limits', status: 'Pass', details: 'Compliant with regulations' },
      { check: 'Reporting Requirements', status: 'Pass', details: 'All reports submitted on time' }
    ],
    topHoldings: [
      { symbol: 'RELIANCE', value: '₹3,45,000', percentage: '22.0%', risk: 'Medium' },
      { symbol: 'TCS', value: '₹2,89,000', percentage: '18.4%', risk: 'Low' },
      { symbol: 'HDFCBANK', value: '₹2,12,000', percentage: '13.5%', risk: 'Low' },
      { symbol: 'INFY', value: '₹1,89,000', percentage: '12.1%', risk: 'Medium' },
      { symbol: 'ICICIBANK', value: '₹1,67,000', percentage: '10.7%', risk: 'Medium' }
    ],
    recommendations: [
      { type: 'warning', message: 'Reduce leverage ratio to below 2.0x for better risk management' },
      { type: 'info', message: 'Consider diversifying into different sectors to reduce concentration risk' },
      { type: 'success', message: 'Maintain current position in blue-chip stocks' }
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Audit Report - {memberReport.member}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Member Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Member Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Member ID:</span>
                      <span className="font-medium">{auditDetails.memberInfo.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{auditDetails.memberInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{auditDetails.memberInfo.email}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{auditDetails.memberInfo.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Join Date:</span>
                      <span className="font-medium">{auditDetails.memberInfo.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">KYC Status:</span>
                      <Badge variant="default">{auditDetails.memberInfo.kycStatus}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{auditDetails.portfolioSummary.totalValue}</div>
                      <div className="text-sm text-gray-600">Total Portfolio Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{auditDetails.portfolioSummary.totalGainLoss}</div>
                      <div className="text-sm text-gray-600">Total Gains ({auditDetails.portfolioSummary.gainLossPercent})</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        <Badge variant={auditDetails.portfolioSummary.riskScore === 'High' ? 'destructive' : 'secondary'}>
                          {auditDetails.portfolioSummary.riskScore}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">Risk Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Audit Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Audit Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Audit Date:</span>
                      <span className="font-medium">{memberReport.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge variant={memberReport.status === 'Completed' ? 'default' : 'secondary'}>
                        {memberReport.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overall Risk:</span>
                      <Badge variant={memberReport.risk === 'High' ? 'destructive' : memberReport.risk === 'Medium' ? 'secondary' : 'default'}>
                        {memberReport.risk} Risk
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Diversification Score:</span>
                      <span className="font-medium">{auditDetails.portfolioSummary.diversificationScore}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6">
              {/* Top Holdings */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditDetails.topHoldings.map((holding, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{holding.symbol}</div>
                          <div className="text-sm text-gray-600">{holding.percentage} of portfolio</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{holding.value}</div>
                          <Badge variant={holding.risk === 'High' ? 'destructive' : holding.risk === 'Medium' ? 'secondary' : 'default'} className="text-xs">
                            {holding.risk}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Concentration Risk:</span>
                        <Badge variant={auditDetails.riskAssessment.concentrationRisk === 'High' ? 'destructive' : 'default'}>
                          {auditDetails.riskAssessment.concentrationRisk}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Volatility Risk:</span>
                        <Badge variant={auditDetails.riskAssessment.volatilityRisk === 'High' ? 'destructive' : 'secondary'}>
                          {auditDetails.riskAssessment.volatilityRisk}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Liquidity Risk:</span>
                        <Badge variant={auditDetails.riskAssessment.liquidityRisk === 'High' ? 'destructive' : 'default'}>
                          {auditDetails.riskAssessment.liquidityRisk}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Leverage Risk:</span>
                        <Badge variant={auditDetails.riskAssessment.leverageRisk === 'High' ? 'destructive' : 'secondary'}>
                          {auditDetails.riskAssessment.leverageRisk}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Overall Risk:</span>
                        <Badge variant={auditDetails.riskAssessment.overallRisk === 'High' ? 'destructive' : 'secondary'}>
                          {auditDetails.riskAssessment.overallRisk}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Checks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditDetails.complianceChecks.map((check, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {check.status === 'Pass' ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          )}
                          <div>
                            <div className="font-medium">{check.check}</div>
                            <div className="text-sm text-gray-600">{check.details}</div>
                          </div>
                        </div>
                        <Badge variant={check.status === 'Pass' ? 'default' : 'destructive'}>
                          {check.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {auditDetails.recommendations.map((rec, index) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        rec.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                        rec.type === 'info' ? 'bg-blue-50 border-blue-400' :
                        'bg-green-50 border-green-400'
                      }`}>
                        <div className="flex items-start gap-3">
                          {rec.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />}
                          {rec.type === 'info' && <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />}
                          {rec.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />}
                          <p className="text-sm">{rec.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button variant="default">
                  Generate Report PDF
                </Button>
                <Button variant="outline">
                  Send to Member
                </Button>
                <Button variant="outline">
                  Schedule Follow-up
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuditReportDialog;
