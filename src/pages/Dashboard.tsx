import React from 'react';
import { Search, Bell, User, TrendingUp, TrendingDown, Download, Eye, AlertTriangle, FileCheck, Users, Shield, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Check if user is auditor or member
  const isAuditor = localStorage.getItem('auditorId') !== null;
  const isMember = localStorage.getItem('memberId') !== null && !isAuditor;
  
  console.log('Dashboard page loaded');
  console.log('Is Auditor:', isAuditor);
  console.log('Is Member:', isMember);

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  // Member Dashboard Data - focused on member activities
  const memberData = {
    trading: {
      portfolioValue: { value: '₹8,45,000', trend: '+2.5%', isPositive: true },
      daysPnL: { value: '₹12,500', trend: '+1.8%', isPositive: true },
      totalPnL: { value: '₹1,25,000', trend: '+15%', isPositive: true },
      activePositions: { value: 15, trend: '+3', isPositive: true }
    },
    compliance: {
      complianceScore: { value: '95%', trend: '+2%', isPositive: true },
      pendingActions: { value: 2, trend: '-1', isPositive: true },
      documentsStatus: { value: 'Up to Date', trend: 'Last updated: 3 days ago', isPositive: true },
      riskLevel: { value: 'Low', trend: 'Stable', isPositive: true }
    },
    financial: {
      availableMargin: { value: '₹2,50,000', trend: '+5%', isPositive: true },
      usedMargin: { value: '₹85,000', trend: '+12%', isPositive: false },
      exposure: { value: '₹3,35,000', trend: '+8%', isPositive: false },
      cashBalance: { value: '₹1,65,000', trend: 'No change', isPositive: true }
    },
    recent: {
      lastTrade: { value: 'RELIANCE', trend: 'Bought at ₹2,450', isPositive: true },
      watchlistAlerts: { value: 3, trend: '+1', isPositive: false },
      ordersPending: { value: 1, trend: 'No change', isPositive: true },
      dividendReceived: { value: '₹5,200', trend: 'This month', isPositive: true }
    }
  };

  // Auditor Dashboard Data - focused on audit activities
  const auditorData = {
    audit: {
      activeMember: { value: 'MEM54321', trend: 'Current audit', isPositive: true },
      auditProgress: { value: '75%', trend: '+15%', isPositive: true },
      findings: { value: 8, trend: '+3', isPositive: false },
      riskScore: { value: 'Medium', trend: 'Stable', isPositive: true }
    },
    compliance: {
      documentsReviewed: { value: 45, trend: '+12', isPositive: true },
      pendingReviews: { value: 7, trend: '-2', isPositive: true },
      violations: { value: 2, trend: 'No change', isPositive: true },
      approvals: { value: 38, trend: '+10', isPositive: true }
    },
    financial: {
      totalAssets: { value: '₹2.5Cr', trend: '+8%', isPositive: true },
      liabilities: { value: '₹45L', trend: '-3%', isPositive: true },
      netWorth: { value: '₹2.05Cr', trend: '+12%', isPositive: true },
      riskExposure: { value: '₹15L', trend: '-5%', isPositive: true }
    },
    reports: {
      draftReports: { value: 3, trend: '+1', isPositive: false },
      submittedReports: { value: 15, trend: '+2', isPositive: true },
      approvedReports: { value: 12, trend: '+3', isPositive: true }
    }
  };

  const TrendIcon = ({ isPositive }: { isPositive: boolean }) => {
    return isPositive ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const MetricCard = ({ 
    title, 
    value, 
    trend, 
    isPositive, 
    icon 
  }: { 
    title: string; 
    value: string | number; 
    trend: string; 
    isPositive: boolean;
    icon?: React.ReactNode;
  }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {icon}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            <div className={`flex items-center space-x-1 text-sm ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendIcon isPositive={isPositive} />
              <span>{trend}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderMemberDashboard = () => (
    <div className="space-y-8">
      {/* Trading Overview */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Trading Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Portfolio Value"
            value={memberData.trading.portfolioValue.value}
            trend={memberData.trading.portfolioValue.trend}
            isPositive={memberData.trading.portfolioValue.isPositive}
          />
          <MetricCard
            title="Day's P&L"
            value={memberData.trading.daysPnL.value}
            trend={memberData.trading.daysPnL.trend}
            isPositive={memberData.trading.daysPnL.isPositive}
          />
          <MetricCard
            title="Total P&L"
            value={memberData.trading.totalPnL.value}
            trend={memberData.trading.totalPnL.trend}
            isPositive={memberData.trading.totalPnL.isPositive}
          />
          <MetricCard
            title="Active Positions"
            value={memberData.trading.activePositions.value}
            trend={memberData.trading.activePositions.trend}
            isPositive={memberData.trading.activePositions.isPositive}
          />
        </div>
      </section>

      {/* Compliance Status */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Compliance Score"
            value={memberData.compliance.complianceScore.value}
            trend={memberData.compliance.complianceScore.trend}
            isPositive={memberData.compliance.complianceScore.isPositive}
            icon={<Shield className="h-5 w-5 text-green-500" />}
          />
          <MetricCard
            title="Pending Actions"
            value={memberData.compliance.pendingActions.value}
            trend={memberData.compliance.pendingActions.trend}
            isPositive={memberData.compliance.pendingActions.isPositive}
            icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
          />
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Documents Status</h3>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {memberData.compliance.documentsStatus.value}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {memberData.compliance.documentsStatus.trend}
              </div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Risk Level</h3>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {memberData.compliance.riskLevel.value}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {memberData.compliance.riskLevel.trend}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Financial Summary */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Available Margin"
            value={memberData.financial.availableMargin.value}
            trend={memberData.financial.availableMargin.trend}
            isPositive={memberData.financial.availableMargin.isPositive}
          />
          <MetricCard
            title="Used Margin"
            value={memberData.financial.usedMargin.value}
            trend={memberData.financial.usedMargin.trend}
            isPositive={memberData.financial.usedMargin.isPositive}
          />
          <MetricCard
            title="Total Exposure"
            value={memberData.financial.exposure.value}
            trend={memberData.financial.exposure.trend}
            isPositive={memberData.financial.exposure.isPositive}
          />
          <MetricCard
            title="Cash Balance"
            value={memberData.financial.cashBalance.value}
            trend={memberData.financial.cashBalance.trend}
            isPositive={memberData.financial.cashBalance.isPositive}
          />
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Last Trade</h3>
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-bold text-gray-900">
                  {memberData.recent.lastTrade.value}
                </div>
              </div>
              <div className="text-sm text-green-600">
                {memberData.recent.lastTrade.trend}
              </div>
            </CardContent>
          </Card>
          
          <MetricCard
            title="Watchlist Alerts"
            value={memberData.recent.watchlistAlerts.value}
            trend={memberData.recent.watchlistAlerts.trend}
            isPositive={memberData.recent.watchlistAlerts.isPositive}
            icon={<Bell className="h-5 w-5 text-blue-500" />}
          />
          
          <MetricCard
            title="Orders Pending"
            value={memberData.recent.ordersPending.value}
            trend={memberData.recent.ordersPending.trend}
            isPositive={memberData.recent.ordersPending.isPositive}
          />
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Dividend Received</h3>
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-bold text-gray-900">
                  {memberData.recent.dividendReceived.value}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {memberData.recent.dividendReceived.trend}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Start Trading</h3>
              <p className="text-gray-600 mb-4">Access trading platform and place orders</p>
              <Button className="w-full" onClick={() => handleNavigation('/trading')}>
                <Activity className="mr-2 h-4 w-4" />
                Trade Now
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">View Portfolio</h3>
              <p className="text-gray-600 mb-4">Check your holdings and performance</p>
              <Button className="w-full" variant="outline" onClick={() => handleNavigation('/portfolio')}>
                <Eye className="mr-2 h-4 w-4" />
                View Portfolio
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Research Tools</h3>
              <p className="text-gray-600 mb-4">Access market research and analysis</p>
              <Button className="w-full" variant="outline" onClick={() => handleNavigation('/research')}>
                <FileCheck className="mr-2 h-4 w-4" />
                Research
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );

  const renderAuditorDashboard = () => (
    <div className="space-y-8">
      {/* Current Audit Overview */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Audit Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Active Member</h3>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {auditorData.audit.activeMember.value}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {auditorData.audit.activeMember.trend}
              </div>
            </CardContent>
          </Card>
          
          <MetricCard
            title="Audit Progress"
            value={auditorData.audit.auditProgress.value}
            trend={auditorData.audit.auditProgress.trend}
            isPositive={auditorData.audit.auditProgress.isPositive}
            icon={<Activity className="h-5 w-5 text-blue-500" />}
          />
          
          <MetricCard
            title="Audit Findings"
            value={auditorData.audit.findings.value}
            trend={auditorData.audit.findings.trend}
            isPositive={auditorData.audit.findings.isPositive}
            icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
          />
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Risk Score</h3>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  {auditorData.audit.riskScore.value}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {auditorData.audit.riskScore.trend}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Compliance Review */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance Review</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Documents Reviewed"
            value={auditorData.compliance.documentsReviewed.value}
            trend={auditorData.compliance.documentsReviewed.trend}
            isPositive={auditorData.compliance.documentsReviewed.isPositive}
            icon={<FileCheck className="h-5 w-5 text-green-500" />}
          />
          
          <MetricCard
            title="Pending Reviews"
            value={auditorData.compliance.pendingReviews.value}
            trend={auditorData.compliance.pendingReviews.trend}
            isPositive={auditorData.compliance.pendingReviews.isPositive}
            icon={<Eye className="h-5 w-5 text-orange-500" />}
          />
          
          <MetricCard
            title="Violations Found"
            value={auditorData.compliance.violations.value}
            trend={auditorData.compliance.violations.trend}
            isPositive={auditorData.compliance.violations.isPositive}
            icon={<Shield className="h-5 w-5 text-red-500" />}
          />
          
          <MetricCard
            title="Approvals Given"
            value={auditorData.compliance.approvals.value}
            trend={auditorData.compliance.approvals.trend}
            isPositive={auditorData.compliance.approvals.isPositive}
            icon={<FileCheck className="h-5 w-5 text-blue-500" />}
          />
        </div>
      </section>

      {/* Financial Analysis */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Financial Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Assets"
            value={auditorData.financial.totalAssets.value}
            trend={auditorData.financial.totalAssets.trend}
            isPositive={auditorData.financial.totalAssets.isPositive}
          />
          
          <MetricCard
            title="Liabilities"
            value={auditorData.financial.liabilities.value}
            trend={auditorData.financial.liabilities.trend}
            isPositive={auditorData.financial.liabilities.isPositive}
          />
          
          <MetricCard
            title="Net Worth"
            value={auditorData.financial.netWorth.value}
            trend={auditorData.financial.netWorth.trend}
            isPositive={auditorData.financial.netWorth.isPositive}
          />
          
          <MetricCard
            title="Risk Exposure"
            value={auditorData.financial.riskExposure.value}
            trend={auditorData.financial.riskExposure.trend}
            isPositive={auditorData.financial.riskExposure.isPositive}
          />
        </div>
      </section>

      {/* Audit Reports */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Audit Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Draft Reports"
            value={auditorData.reports.draftReports.value}
            trend={auditorData.reports.draftReports.trend}
            isPositive={auditorData.reports.draftReports.isPositive}
          />
          
          <MetricCard
            title="Submitted Reports"
            value={auditorData.reports.submittedReports.value}
            trend={auditorData.reports.submittedReports.trend}
            isPositive={auditorData.reports.submittedReports.isPositive}
          />
          
          <MetricCard
            title="Approved Reports"
            value={auditorData.reports.approvedReports.value}
            trend={auditorData.reports.approvedReports.trend}
            isPositive={auditorData.reports.approvedReports.isPositive}
          />
        </div>
      </section>

      {/* Auditor Actions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Auditor Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Member Portfolio Review</h3>
              <p className="text-gray-600 mb-4">Review and analyze member's trading portfolio and compliance</p>
              <Button className="w-full" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Review Portfolio
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Audit Report</h3>
              <p className="text-gray-600 mb-4">Create comprehensive audit report for current member</p>
              <Button className="w-full" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                FinanceHub
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={() => handleNavigation('/dashboard')} 
                  className="text-blue-600 font-medium"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => handleNavigation('/trading')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Trading
                </button>
                <button 
                  onClick={() => handleNavigation('/portfolio')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Portfolio
                </button>
                <button 
                  onClick={() => handleNavigation('/research')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Research
                </button>
                <a href="#" className="text-gray-600 hover:text-gray-900">News</a>
              </nav>
            </div>

            {/* Search and User Menu */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isAuditor ? 'Auditor Dashboard' : 'Member Dashboard'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isAuditor 
              ? 'Welcome back! Here\'s your audit progress and member compliance overview.' 
              : 'Welcome back! Here\'s your trading and portfolio overview.'
            }
          </p>
        </div>

        {isAuditor ? renderAuditorDashboard() : renderMemberDashboard()}
      </main>
    </div>
  );
};

export default Dashboard;
