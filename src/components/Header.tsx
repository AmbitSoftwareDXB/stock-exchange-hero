
import React, { useState } from 'react';
import { Search, Menu, X, User, Bell, LogOut, Settings, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check user role
  const isAuditor = localStorage.getItem('auditorId') !== null;
  const isMember = localStorage.getItem('memberId') !== null && !isAuditor;
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  // Member navigation items
  const memberNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Trading', path: '/trading' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Research', path: '/research' },
    { name: 'Market Data', path: '#' },
    { name: 'Indices', path: '#' },
    { name: 'IPOs', path: '#' }
  ];

  // Auditor navigation items
  const auditorNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Research', path: '/research' },
    { name: 'Audit Reports', path: '#' },
    { name: 'Compliance Review', path: '#' },
    { name: 'Member Analytics', path: '#' },
    { name: 'Risk Assessment', path: '#' }
  ];

  // Guest navigation items
  const guestNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Market Data', path: '#' },
    { name: 'Indices', path: '#' },
    { name: 'IPOs', path: '#' },
    { name: 'Products', path: '#' },
    { name: 'Resources', path: '#' },
    { name: 'Investor Education', path: '#' },
    { name: 'About Us', path: '#' },
    { name: 'Contact', path: '#' }
  ];

  const getCurrentNavItems = () => {
    if (isAuditor) return auditorNavItems;
    if (isMember) return memberNavItems;
    return guestNavItems;
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleAuditorLoginClick = () => {
    navigate('/auditor-login');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('memberId');
    localStorage.removeItem('auditorId');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleNavItemClick = (path: string) => {
    console.log(`Header navigation clicked: ${path}`);
    if (path !== '#') {
      navigate(path);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Market Status: <span className="text-green-600 font-semibold">OPEN</span></span>
            <span>Time: 15:30 IST</span>
            {isAuthenticated && (
              <span className="text-blue-600 font-medium">
                {isAuditor ? 'Auditor Mode' : 'Member Portal'}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <button 
                  onClick={handleLoginClick}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-all duration-200"
                >
                  Member Login
                </button>
                <button 
                  onClick={handleAuditorLoginClick}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-all duration-200"
                >
                  Auditor Login
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded-md hover:bg-red-50 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            )}
            
            {/* Bell Icon with Dropdown for Authenticated Users */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4 text-gray-500" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    {isAuditor ? 'Auditor Account' : 'Member Account'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <UserCircle className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Bell className="h-4 w-4 text-gray-500" />
            )}
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('/')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl hover:bg-blue-700 transition-colors"
            >
              FinanceHub
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {getCurrentNavItems().map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavItemClick(item.path)}
                className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={isAuditor ? "Search members, reports..." : "Search stocks, news..."}
                className="pl-10 w-64"
              />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {getCurrentNavItems().map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    handleNavItemClick(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2 text-left"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4">
                <Input
                  type="text"
                  placeholder={isAuditor ? "Search members, reports..." : "Search stocks, news..."}
                  className="w-full"
                />
              </div>
              {/* Mobile Logout Option */}
              {isAuthenticated && (
                <div className="pt-4 border-t border-gray-200">
                  <button 
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 transition-colors py-2 text-left w-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
