
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

  // Member Dashboard Data
  const memberData = {
    compliance: {
      deadlines: { value: 3, trend: '+10%', isPositive: false },
      status: { value: 'In Progress', trend: '2 pending', isPositive: false },
      alerts: { value: 5, trend: '+2', isPositive: false },
      penalties: { value: 0, trend: '0%', isPositive: true }
    },
    financial: {
      actualVsApplicable: { actual: '₹500,000', applicable: '₹400,000', trend: '+5%', isPositive: true },
      shortfall: { value: '₹0', trend: 'No change', isPositive: true },
      autoCalculated: { value: '₹100,000', trend: '+12%', isPositive: true }
    },
    document: {
      recentSubmissions: { value: 8, trend: '+3', isPositive: true },
      auditStatus: { value: 'Completed', trend: 'Last: 15 days ago', isPositive: true },
      atrTracker: { value: 12, trend: '+2', isPositive: true }
    },
    communication: {
      notifications: { value: 4, trend: '+1', isPositive: false },
      queryPanel: { value: 'Open', trend: '3 active', isPositive: false },
      emailHistory: { value: 23, trend: '+5', isPositive: true }
    }
  };

  // Auditor Dashboard Data
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
      {/* Compliance & Submission */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance & Submission</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Deadlines"
            value={memberData.compliance.deadlines.value}
            trend={memberData.compliance.deadlines.trend}
            isPositive={memberData.compliance.deadlines.isPositive}
            icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
          />
          <MetricCard
            title="Status Tracker"
            value={memberData.compliance.status.value}
            trend={memberData.compliance.status.trend}
            isPositive={memberData.compliance.status.isPositive}
          />
          <MetricCard
            title="Alerts"
            value={memberData.compliance.alerts.value}
            trend={memberData.compliance.alerts.trend}
            isPositive={memberData.compliance.alerts.isPositive}
            icon={<Bell className="h-5 w-5 text-red-500" />}
          />
          <MetricCard
            title="Penalties"
            value={memberData.compliance.penalties.value}
            trend={memberData.compliance.penalties.trend}
            isPositive={memberData.compliance.penalties.isPositive}
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
                  {memberData.financial.actualVsApplicable.actual}
                </div>
                <div className="text-lg font-bold text-gray-600">
                  / {memberData.financial.actualVsApplicable.applicable}
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>{memberData.financial.actualVsApplicable.trend}</span>
              </div>
            </CardContent>
          </Card>
          
          <MetricCard
            title="Shortfall"
            value={memberData.financial.shortfall.value}
            trend={memberData.financial.shortfall.trend}
            isPositive={memberData.financial.shortfall.isPositive}
          />
          
          <MetricCard
            title="Auto-Calculated Values"
            value={memberData.financial.autoCalculated.value}
            trend={memberData.financial.autoCalculated.trend}
            isPositive={memberData.financial.autoCalculated.isPositive}
          />
        </div>
      </section>

      {/* Document & Audit */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Document & Audit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Recent Submissions"
            value={memberData.document.recentSubmissions.value}
            trend={memberData.document.recentSubmissions.trend}
            isPositive={memberData.document.recentSubmissions.isPositive}
          />
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Audit Status</h3>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {memberData.document.auditStatus.value}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {memberData.document.auditStatus.trend}
              </div>
            </CardContent>
          </Card>
          
          <MetricCard
            title="ATR Tracker"
            value={memberData.document.atrTracker.value}
            trend={memberData.document.atrTracker.trend}
            isPositive={memberData.document.atrTracker.isPositive}
          />
        </div>
      </section>

      {/* Communication & Interaction */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Communication & Interaction</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Notifications"
            value={memberData.communication.notifications.value}
            trend={memberData.communication.notifications.trend}
            isPositive={memberData.communication.notifications.isPositive}
            icon={<Bell className="h-5 w-5 text-blue-500" />}
          />
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Query Panel</h3>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {memberData.communication.queryPanel.value}
                </Badge>
              </div>
              <div className="text-sm text-gray-600">
                {memberData.communication.queryPanel.trend}
              </div>
            </CardContent>
          </Card>
          
          <MetricCard
            title="Email History"
            value={memberData.communication.emailHistory.value}
            trend={memberData.communication.emailHistory.trend}
            isPositive={memberData.communication.emailHistory.isPositive}
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
              : 'Welcome back! Here\'s your compliance and financial overview.'
            }
          </p>
        </div>

        {isAuditor ? renderAuditorDashboard() : renderMemberDashboard()}
      </main>
    </div>
  );
};

export default Dashboard;
