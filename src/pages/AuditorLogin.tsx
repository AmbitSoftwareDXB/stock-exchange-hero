
import React, { useState } from 'react';
import { Eye, EyeOff, Shield, User, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const AuditorLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [auditorId, setAuditorId] = useState('');
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ auditorId: '', memberId: '', password: '', general: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { auditorId: '', memberId: '', password: '', general: '' };
    
    // Auditor ID validation
    if (!auditorId) {
      newErrors.auditorId = 'Auditor ID is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(auditorId)) {
      newErrors.auditorId = 'Auditor ID must be alphanumeric';
    } else if (auditorId.length < 4 || auditorId.length > 12) {
      newErrors.auditorId = 'Auditor ID must be between 4 and 12 characters';
    }
    
    // Member ID validation
    if (!memberId) {
      newErrors.memberId = 'Member ID is required';
    } else if (!/^[a-zA-Z0-9]+$/.test(memberId)) {
      newErrors.memberId = 'Member ID must be alphanumeric';
    } else if (memberId.length < 4 || memberId.length > 16) {
      newErrors.memberId = 'Member ID must be between 4 and 16 characters';
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
    return !newErrors.auditorId && !newErrors.memberId && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      // Simulate successful login for demo
      if (auditorId && memberId && password) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('auditorId', auditorId);
        localStorage.setItem('memberId', memberId);
        navigate('/dashboard');
      } else {
        setErrors({ ...errors, general: 'Invalid auditor credentials. Please check your Auditor ID, Member ID, and Password.' });
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
          <h1 className="text-2xl font-bold text-gray-900">Auditor Login</h1>
          <p className="text-gray-600">Stock Exchange Auditor Access</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {errors.general}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="auditorId">Auditor ID</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="auditorId"
                  type="text"
                  placeholder="Enter your Auditor ID"
                  value={auditorId}
                  onChange={(e) => setAuditorId(e.target.value.toUpperCase())}
                  className={`pl-10 ${errors.auditorId ? 'border-red-500' : ''}`}
                  aria-describedby={errors.auditorId ? 'auditorId-error' : undefined}
                  maxLength={12}
                />
              </div>
              {errors.auditorId && (
                <p id="auditorId-error" className="text-red-500 text-sm">{errors.auditorId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="memberId">Member ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="memberId"
                  type="text"
                  placeholder="Enter your Member ID"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  className={`pl-10 ${errors.memberId ? 'border-red-500' : ''}`}
                  aria-describedby={errors.memberId ? 'memberId-error' : undefined}
                  maxLength={16}
                />
              </div>
              {errors.memberId && (
                <p id="memberId-error" className="text-red-500 text-sm">{errors.memberId}</p>
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

export default AuditorLogin;
