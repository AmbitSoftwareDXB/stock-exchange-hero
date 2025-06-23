
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff, Lock, Shield, Check, X } from 'lucide-react';
import { useRegistrationContext } from '@/contexts/RegistrationContext';

const PasswordStep = () => {
  const { formData, errors, updateFormData } = useRegistrationContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    const requirements = {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    };

    Object.values(requirements).forEach(req => {
      if (req) strength += 20;
    });

    return { strength, requirements };
  };

  const { strength, requirements } = getPasswordStrength(formData.password);

  const getStrengthColor = (strength: number) => {
    if (strength < 40) return 'bg-red-500';
    if (strength < 60) return 'bg-orange-500';
    if (strength < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength < 40) return 'Weak';
    if (strength < 60) return 'Fair';
    if (strength < 80) return 'Good';
    return 'Strong';
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Setup</h3>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => updateFormData('password', e.target.value)}
            className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" className="text-red-500 text-sm">{errors.password}</p>
        )}
        
        {/* Password Strength Meter */}
        {formData.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Password Strength:</span>
              <span className={`text-sm font-medium ${
                strength >= 80 ? 'text-green-600' : 
                strength >= 60 ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {getStrengthText(strength)}
              </span>
            </div>
            <Progress value={strength} className={`h-2 ${getStrengthColor(strength)}`} />
          </div>
        )}
      </div>

      {/* Password Requirements */}
      {formData.password && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Password Requirements
          </h4>
          <div className="space-y-2">
            {[
              { key: 'length', text: 'At least 12 characters' },
              { key: 'uppercase', text: 'One uppercase letter' },
              { key: 'lowercase', text: 'One lowercase letter' },
              { key: 'number', text: 'One number' },
              { key: 'special', text: 'One special character (@$!%*?&)' },
            ].map(({ key, text }) => (
              <div key={key} className="flex items-center gap-2">
                {requirements[key as keyof typeof requirements] ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <X className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm ${
                  requirements[key as keyof typeof requirements] ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
            className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p id="confirmPassword-error" className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="acceptTerms"
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => updateFormData('acceptTerms', !!checked)}
            className={errors.acceptTerms ? 'border-red-500' : ''}
          />
          <div className="text-sm">
            <label htmlFor="acceptTerms" className="text-gray-700 cursor-pointer">
              I agree to the{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-800 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>
        {errors.acceptTerms && (
          <p className="text-red-500 text-sm">{errors.acceptTerms}</p>
        )}
      </div>
    </div>
  );
};

export default PasswordStep;
