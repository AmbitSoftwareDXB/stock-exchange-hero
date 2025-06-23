
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PersonalDetailsStep from '@/components/registration/PersonalDetailsStep';
import IdentificationStep from '@/components/registration/IdentificationStep';
import LocationStep from '@/components/registration/LocationStep';
import AddressStep from '@/components/registration/AddressStep';
import PasswordStep from '@/components/registration/PasswordStep';
import { useRegistrationContext } from '@/contexts/RegistrationContext';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { formData, errors, validateStep, submitRegistration } = useRegistrationContext();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    // Load draft from localStorage
    const draft = localStorage.getItem('registrationDraft');
    if (draft) {
      // Initialize form with draft data
      console.log('Loading draft data:', JSON.parse(draft));
    }
  }, []);

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      // Save draft to localStorage
      localStorage.setItem('registrationDraft', JSON.stringify(formData));
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      const success = await submitRegistration();
      if (success) {
        setShowSuccess(true);
        localStorage.removeItem('registrationDraft');
        setTimeout(() => {
          navigate('/dashboard');
        }, 5000);
      }
    }
  };

  const getStepTitle = () => {
    const titles = [
      'Personal Details',
      'Identification',
      'Location',
      'Address',
      'Security'
    ];
    return titles[currentStep - 1];
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetailsStep />;
      case 2:
        return <IdentificationStep />;
      case 3:
        return <LocationStep />;
      case 4:
        return <AddressStep />;
      case 5:
        return <PasswordStep />;
      default:
        return <PersonalDetailsStep />;
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h1>
            <p className="text-gray-600 mb-4">
              Welcome to FinanceHub! A verification email has been sent to your email address.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to dashboard in 5 seconds...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl mx-auto w-fit mb-4">
            FinanceHub
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600">Join India's leading financial platform</p>
          
          {/* Progress Indicator */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{getStepTitle()}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent>
          {/* Error Summary */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-6 flex items-start gap-2">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Please correct the following errors:</p>
                <ul className="mt-1 text-sm list-disc list-inside">
                  {Object.values(errors).map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Registration Steps */}
          <div className="space-y-6">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Complete Registration
                </Button>
              )}
            </div>
          </div>

          {/* Alternative Registration */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full mt-4"
              onClick={() => console.log('Google registration')}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Register with Google
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign in here
              </a>
            </p>
          </div>

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

export default Register;
