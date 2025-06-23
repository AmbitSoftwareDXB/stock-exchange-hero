
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';
import { useRegistrationContext } from '@/contexts/RegistrationContext';

const LocationStep = () => {
  const { formData, errors, updateFormData } = useRegistrationContext();
  const [cities, setCities] = useState<string[]>([]);

  // Sample Indian states and cities data
  const statesAndCities = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
    'Delhi': ['New Delhi', 'Delhi'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut'],
  };

  useEffect(() => {
    if (formData.state && statesAndCities[formData.state as keyof typeof statesAndCities]) {
      setCities(statesAndCities[formData.state as keyof typeof statesAndCities]);
      // Reset city if it's not valid for the new state
      if (formData.city && !statesAndCities[formData.state as keyof typeof statesAndCities].includes(formData.city)) {
        updateFormData('city', '');
      }
    } else {
      setCities([]);
    }
  }, [formData.state]);

  const handlePincodeChange = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    updateFormData('pincode', numericValue);
    
    // Auto-locate functionality (mock implementation)
    if (numericValue.length === 6) {
      console.log('Auto-locating for pincode:', numericValue);
      // In a real app, you would call an API to get location data
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
      
      <div className="space-y-2">
        <Label htmlFor="state">State *</Label>
        <Select value={formData.state} onValueChange={(value) => updateFormData('state', value)}>
          <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(statesAndCities).map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.state && (
          <p className="text-red-500 text-sm">{errors.state}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City *</Label>
        <Select 
          value={formData.city} 
          onValueChange={(value) => updateFormData('city', value)}
          disabled={!formData.state}
        >
          <SelectTrigger className={errors.city ? 'border-red-500' : ''}>
            <SelectValue placeholder={formData.state ? "Select your city" : "Select state first"} />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pincode">Pincode *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="pincode"
            type="text"
            placeholder="Enter 6-digit pincode"
            value={formData.pincode}
            onChange={(e) => handlePincodeChange(e.target.value)}
            className={`pl-10 ${errors.pincode ? 'border-red-500' : ''}`}
            aria-describedby={errors.pincode ? 'pincode-error' : undefined}
            maxLength={6}
          />
        </div>
        {errors.pincode && (
          <p id="pincode-error" className="text-red-500 text-sm">{errors.pincode}</p>
        )}
        <p className="text-xs text-gray-500">
          We'll use this to auto-locate your area for better service
        </p>
      </div>
    </div>
  );
};

export default LocationStep;
