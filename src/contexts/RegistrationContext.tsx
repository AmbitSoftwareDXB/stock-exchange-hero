
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { z } from 'zod';

// Validation schemas
const personalDetailsSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
});

const identificationSchema = z.object({
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PAN number (e.g., ABCDE1234F)'),
});

const locationSchema = z.object({
  state: z.string().min(1, 'Please select a state'),
  city: z.string().min(1, 'Please select a city'),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit pincode'),
});

const addressSchema = z.object({
  address: z.string().min(10, 'Please enter a complete address (minimum 10 characters)'),
});

const passwordSchema = z.object({
  password: z.string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain uppercase, lowercase, number, and special character'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface RegistrationData {
  fullName: string;
  email: string;
  mobile: string;
  panNumber: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface RegistrationContextType {
  formData: RegistrationData;
  errors: Record<string, string>;
  updateFormData: (field: keyof RegistrationData, value: string | boolean) => void;
  validateStep: (step: number) => Promise<boolean>;
  submitRegistration: () => Promise<boolean>;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistrationContext must be used within a RegistrationProvider');
  }
  return context;
};

interface RegistrationProviderProps {
  children: ReactNode;
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    mobile: '',
    panNumber: '',
    state: '',
    city: '',
    pincode: '',
    address: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: keyof RegistrationData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = async (step: number): Promise<boolean> => {
    let schema;
    let dataToValidate;

    switch (step) {
      case 1:
        schema = personalDetailsSchema;
        dataToValidate = {
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
        };
        break;
      case 2:
        schema = identificationSchema;
        dataToValidate = {
          panNumber: formData.panNumber,
        };
        break;
      case 3:
        schema = locationSchema;
        dataToValidate = {
          state: formData.state,
          city: formData.city,
          pincode: formData.pincode,
        };
        break;
      case 4:
        schema = addressSchema;
        dataToValidate = {
          address: formData.address,
        };
        break;
      case 5:
        schema = passwordSchema;
        dataToValidate = {
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          acceptTerms: formData.acceptTerms,
        };
        break;
      default:
        return false;
    }

    try {
      await schema.parseAsync(dataToValidate);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const submitRegistration = async (): Promise<boolean> => {
    try {
      // Simulate API call
      console.log('Submitting registration:', formData);
      
      // In a real app, you would hash the password and send to API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data (in real app, this would be handled by your backend)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userName', formData.fullName);
      
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ general: 'Registration failed. Please try again.' });
      return false;
    }
  };

  return (
    <RegistrationContext.Provider
      value={{
        formData,
        errors,
        updateFormData,
        validateStep,
        submitRegistration,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};
