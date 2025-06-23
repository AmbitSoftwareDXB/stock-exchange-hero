import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ memberId: '', userId: '', password: '', general: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Hardcoded credentials for testing
  const HARDCODED_MEMBER_ID = 'MEM12345';
  const HARDCODED_USER_ID = 'USER001';
  const HARDCODED_PASSWORD = 'Password123';

  const validateForm = () => {
    const newErrors = { memberId: '', userId: '', password: '', general: '' };
    
    // Member ID validation
    if (!memberId) {
      newErrors.memberId = 'Member ID is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(memberId)) {
      newErrors.memberId = 'Member ID must be alphanumeric';
    } else if (memberId.length < 4 || memberId.length > 12) {
      newErrors.memberId = 'Member ID must be between 4 and 12 characters';
    }
    
    // User ID validation
    if (!userId) {
      newErrors.userId = 'User ID is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(userId)) {
      newErrors.userId = 'User ID must be alphanumeric';
    } else if (userId.length < 4 || userId.length > 16) {
      newErrors.userId = 'User ID must be between 4 and 16 characters';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain at least one letter and one number';
    }
    
    setErrors(newErrors);
    return !newErrors.memberId && !newErrors.userId && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate authentication with hardcoded credentials
    setTimeout(() => {
      if (memberId === HARDCODED_MEMBER_ID && userId === HARDCODED_USER_ID && password === HARDCODED_PASSWORD) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('memberId', memberId);
        localStorage.setItem('userId', userId);
        navigate('/dashboard');
      } else {
        setErrors({ ...errors, general: 'Invalid member credentials. Please check your Member ID, User ID, and Password.' });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl mx-auto w-fit mb-4">
            FinanceHub
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Member Login</h1>
          <p className="text-gray-600">Stock Exchange Member Access</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {errors.general}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="memberId">Member ID</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="memberId"
                  type="text"
                  placeholder="Enter your Member ID"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value.toUpperCase())}
                  className={`pl-10 ${errors.memberId ? 'border-red-500' : ''}`}
                  aria-describedby={errors.memberId ? 'memberId-error' : undefined}
                  maxLength={12}
                />
              </div>
              {errors.memberId && (
                <p id="memberId-error" className="text-red-500 text-sm">{errors.memberId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="userId"
                  type="text"
                  placeholder="Enter your User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className={`pl-10 ${errors.userId ? 'border-red-500' : ''}`}
                  aria-describedby={errors.userId ? 'userId-error' : undefined}
                  maxLength={16}
                />
              </div>
              {errors.userId && (
                <p id="userId-error" className="text-red-500 text-sm">{errors.userId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot password?
              </a>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-700">
              Need help? Contact support
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
