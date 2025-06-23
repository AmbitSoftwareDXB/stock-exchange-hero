
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreditCard } from 'lucide-react';
import { useRegistrationContext } from '@/contexts/RegistrationContext';

const IdentificationStep = () => {
  const { formData, errors, updateFormData } = useRegistrationContext();

  const formatPAN = (value: string) => {
    // Remove non-alphanumeric characters and convert to uppercase
    const cleaned = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    return cleaned.slice(0, 10);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Identification</h3>
      
      <div className="space-y-2">
        <Label htmlFor="panNumber">PAN Number *</Label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="panNumber"
            type="text"
            placeholder="ABCDE1234F"
            value={formData.panNumber}
            onChange={(e) => updateFormData('panNumber', formatPAN(e.target.value))}
            className={`pl-10 font-mono ${errors.panNumber ? 'border-red-500' : ''}`}
            aria-describedby={errors.panNumber ? 'panNumber-error' : undefined}
            maxLength={10}
          />
        </div>
        {errors.panNumber && (
          <p id="panNumber-error" className="text-red-500 text-sm">{errors.panNumber}</p>
        )}
        <p className="text-xs text-gray-500">
          Format: 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h4 className="font-medium text-blue-900 mb-2">Why do we need your PAN?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Required for financial transactions and compliance</li>
          <li>• Ensures secure identity verification</li>
          <li>• Mandatory for investment and trading activities</li>
        </ul>
      </div>
    </div>
  );
};

export default IdentificationStep;
