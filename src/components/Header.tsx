
import React, { useState } from 'react';
import { Search, Menu, X, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    'Home',
    'Market Data',
    'Indices',
    'IPOs',
    'Products',
    'Resources',
    'Investor Education',
    'About Us',
    'Contact'
  ];

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Market Status: <span className="text-green-600 font-semibold">OPEN</span></span>
            <span>Time: 15:30 IST</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLoginClick}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Login
            </button>
            <button 
              onClick={handleRegisterClick}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Register
            </button>
            <Bell className="h-4 w-4 text-gray-500" />
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
              FinanceHub
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search stocks, news..."
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
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4">
                <Input
                  type="text"
                  placeholder="Search stocks, news..."
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
