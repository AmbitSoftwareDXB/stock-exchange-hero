
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Home } from 'lucide-react';
import { useRegistrationContext } from '@/contexts/RegistrationContext';

const AddressStep = () => {
  const { formData, errors, updateFormData } = useRegistrationContext();

  const maxLength = 500;
  const characterCount = formData.address.length;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
      
      <div className="space-y-2">
        <Label htmlFor="address">Residential Address *</Label>
        <div className="relative">
          <Home className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
          <Textarea
            id="address"
            placeholder="Enter your complete residential address including house number, street, landmark, etc."
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value.slice(0, maxLength))}
            className={`pl-10 min-h-[120px] resize-none ${errors.address ? 'border-red-500' : ''}`}
            aria-describedby={errors.address ? 'address-error' : undefined}
            maxLength={maxLength}
          />
        </div>
        <div className="flex justify-between items-center">
          {errors.address && (
            <p id="address-error" className="text-red-500 text-sm">{errors.address}</p>
          )}
          <span className={`text-xs ml-auto ${characterCount > maxLength * 0.9 ? 'text-orange-500' : 'text-gray-500'}`}>
            {characterCount}/{maxLength} characters
          </span>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h4 className="font-medium text-gray-900 mb-2">Address Guidelines:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Include house/flat number and building name</li>
          <li>• Mention street name and area</li>
          <li>• Add nearby landmark for easy identification</li>
          <li>• Ensure address matches your identity documents</li>
        </ul>
      </div>
    </div>
  );
};

export default AddressStep;
