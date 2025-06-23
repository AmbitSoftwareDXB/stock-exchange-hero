
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone } from 'lucide-react';
import { useRegistrationContext } from '@/contexts/RegistrationContext';

const PersonalDetailsStep = () => {
  const { formData, errors, updateFormData } = useRegistrationContext();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
      
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            className={`pl-10 ${errors.fullName ? 'border-red-500' : ''}`}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
        </div>
        {errors.fullName && (
          <p id="fullName-error" className="text-red-500 text-sm">{errors.fullName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </div>
        {errors.email && (
          <p id="email-error" className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobile">Mobile Number *</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
              +91
            </span>
            <Input
              id="mobile"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={formData.mobile}
              onChange={(e) => updateFormData('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
              className={`rounded-l-none ${errors.mobile ? 'border-red-500' : ''}`}
              aria-describedby={errors.mobile ? 'mobile-error' : undefined}
            />
          </div>
        </div>
        {errors.mobile && (
          <p id="mobile-error" className="text-red-500 text-sm">{errors.mobile}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
