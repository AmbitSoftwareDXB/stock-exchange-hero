import React from 'react';
import { Search, Bell, User, TrendingUp, TrendingDown, Download, Eye, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const complianceData = {
    deadlines: { value: 3, trend: '+10%', isPositive: false },
    status: { value: 'In Progress', trend: '2 pending', isPositive: false },
    alerts: { value: 5, trend: '+2', isPositive: false },
    penalties: { value: 0, trend: '0%', isPositive: true }
  };

  const financialData = {
    actualVsApplicable: { actual: '₹500,000', applicable: '₹400,000', trend: '+5%', isPositive: true },
    shortfall: { value: '₹0', trend: 'No change', isPositive: true },
    autoCalculated: { value: '₹100,000', trend: '+12%', isPositive: true }
  };

  const documentData = {
    recentSubmissions: { value: 8, trend: '+3', isPositive: true },
    auditStatus: { value: 'Completed', trend: 'Last: 15 days ago', isPositive: true },
    atrTracker: { value: 12, trend: '+2', isPositive: true }
  };

  const communicationData = {
    notifications: { value: 4, trend: '+1', isPositive: false },
    queryPanel: { value: 'Open', trend: '3 active', isPositive: false },
    emailHistory: { value: 23, trend: '+5', isPositive: true }
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
                <a href="/dashboard" className="text-blue-600 font-medium">Dashboard</a>
                <button 
                  onClick={() => navigate('/trading')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Trading
                </button>
                <a href="#" className="text-gray-600 hover:text-gray-900">Portfolio</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Research</a>
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
          <h1 className="text-3xl font-bold text-gray-900">Member Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your compliance and financial overview.</p>
        </div>

        <div className="space-y-8">
          {/* Compliance & Submission */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance & Submission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Deadlines"
                value={complianceData.deadlines.value}
                trend={complianceData.deadlines.trend}
                isPositive={complianceData.deadlines.isPositive}
                icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
              />
              <MetricCard
                title="Status Tracker"
                value={complianceData.status.value}
                trend={complianceData.status.trend}
                isPositive={complianceData.status.isPositive}
              />
              <MetricCard
                title="Alerts"
                value={complianceData.alerts.value}
                trend={complianceData.alerts.trend}
                isPositive={complianceData.alerts.isPositive}
                icon={<Bell className="h-5 w-5 text-red-500" />}
              />
              <MetricCard
                title="Penalties"
                value={complianceData.penalties.value}
                trend={complianceData.penalties.trend}
                isPositive={complianceData.penalties.isPositive}
              />
            </div>
          </section>

          {/* Network & Financial Overview */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Network & Financial Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Actual vs. Applicable</h3>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-lg font-bold text-gray-900">
                      {financialData.actualVsApplicable.actual}
                    </div>
                    <div className="text-lg font-bold text-gray-600">
                      / {financialData.actualVsApplicable.applicable}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>{financialData.actualVsApplicable.trend}</span>
                  </div>
                </CardContent>
              </Card>
              
              <MetricCard
                title="Shortfall"
                value={financialData.shortfall.value}
                trend={financialData.shortfall.trend}
                isPositive={financialData.shortfall.isPositive}
              />
              
              <MetricCard
                title="Auto-Calculated Values"
                value={financialData.autoCalculated.value}
                trend={financialData.autoCalculated.trend}
                isPositive={financialData.autoCalculated.isPositive}
              />
            </div>
          </section>

          {/* Document & Audit */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Document & Audit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                title="Recent Submissions"
                value={documentData.recentSubmissions.value}
                trend={documentData.recentSubmissions.trend}
                isPositive={documentData.recentSubmissions.isPositive}
              />
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Audit Status</h3>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {documentData.auditStatus.value}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {documentData.auditStatus.trend}
                  </div>
                </CardContent>
              </Card>
              
              <MetricCard
                title="ATR Tracker"
                value={documentData.atrTracker.value}
                trend={documentData.atrTracker.trend}
                isPositive={documentData.atrTracker.isPositive}
              />
            </div>
          </section>

          {/* Communication & Interaction */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Communication & Interaction</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                title="Notifications"
                value={communicationData.notifications.value}
                trend={communicationData.notifications.trend}
                isPositive={communicationData.notifications.isPositive}
                icon={<Bell className="h-5 w-5 text-blue-500" />}
              />
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Query Panel</h3>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      {communicationData.queryPanel.value}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {communicationData.queryPanel.trend}
                  </div>
                </CardContent>
              </Card>
              
              <MetricCard
                title="Email History"
                value={communicationData.emailHistory.value}
                trend={communicationData.emailHistory.trend}
                isPositive={communicationData.emailHistory.isPositive}
              />
            </div>
          </section>

          {/* Analytics & Logs */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics & Logs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Log</h3>
                  <p className="text-gray-600 mb-4">View detailed activity logs and user interactions</p>
                  <Button className="w-full" variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Summary Report</h3>
                  <p className="text-gray-600 mb-4">Download comprehensive summary reports</p>
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
