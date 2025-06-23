
import React, { useState, useEffect } from 'react';
import { Search, Menu, X, User, Bell, LogOut, Settings, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isAuditor: false,
    isMember: false,
    memberId: null,
    auditorId: null,
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  // Update auth state on mount and location change
  useEffect(() => {
    const updateAuthState = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const auditorId = localStorage.getItem('auditorId');
      const memberId = localStorage.getItem('memberId');
      const isAuditor = auditorId !== null;
      const isMember = memberId !== null && !isAuditor;

      const newAuthState = {
        isAuthenticated,
        isAuditor,
        isMember,
        memberId,
        auditorId,
      };

      console.log('Header auth state updated:', {
        ...newAuthState,
        currentPath: location.pathname,
        localStorage: {
          isAuthenticated: localStorage.getItem('isAuthenticated'),
          memberId: localStorage.getItem('memberId'),
          auditorId: localStorage.getItem('auditorId'),
          userRole: localStorage.getItem('userRole')
        }
      });

      setAuthState(newAuthState);
    };

    updateAuthState();
    
    // Listen for storage changes
    window.addEventListener('storage', updateAuthState);
    
    return () => {
      window.removeEventListener('storage', updateAuthState);
    };
  }, [location.pathname]);

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
    if (authState.isAuditor) return auditorNavItems;
    if (authState.isMember) return memberNavItems;
    return guestNavItems;
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleAuditorLoginClick = () => {
    navigate('/auditor-login');
  };

  const handleLogout = () => {
    console.log('Logout clicked - clearing localStorage');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('memberId');
    localStorage.removeItem('auditorId');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    
    // Update state immediately
    setAuthState({
      isAuthenticated: false,
      isAuditor: false,
      isMember: false,
      memberId: null,
      auditorId: null,
    });
    
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
            {authState.isAuthenticated && (
              <span className="text-blue-600 font-medium">
                {authState.isAuditor ? 'Auditor Mode' : 'Member Portal'}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {!authState.isAuthenticated ? (
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
            {authState.isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4 text-gray-500" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg z-[100]">
                  <DropdownMenuLabel>
                    {authState.isAuditor ? 'Auditor Account' : 'Member Account'}
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
              onClick={() => navigate('/')}
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src="/lovable-uploads/d15aa133-7bad-4e9d-8f52-fb81f9eea244.png" 
                alt="India Stock Exchange" 
                className="h-12 w-auto"
              />
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
                placeholder={authState.isAuditor ? "Search members, reports..." : "Search stocks, news..."}
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
                  placeholder={authState.isAuditor ? "Search members, reports..." : "Search stocks, news..."}
                  className="w-full"
                />
              </div>
              {/* Mobile Logout Option */}
              {authState.isAuthenticated && (
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
