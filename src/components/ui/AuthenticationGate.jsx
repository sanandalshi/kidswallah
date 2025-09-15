import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import Icon from '../AppIcon';

const AuthenticationGate = ({ mode = 'login', onAuthSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    parentName: '',
    childName: '',
    childAge: '',
    userType: 'parent'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (mode === 'register') {
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData?.parentName) {
        newErrors.parentName = 'Parent name is required';
      }
      
      if (formData?.userType === 'parent' && !formData?.childName) {
        newErrors.childName = 'Child name is required';
      }
      
      if (formData?.userType === 'parent' && !formData?.childAge) {
        newErrors.childAge = 'Child age is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        email: formData?.email,
        userType: formData?.userType,
        parentName: formData?.parentName,
        childName: formData?.childName,
        childAge: formData?.childAge
      };
      
      onAuthSuccess?.(userData);
      navigate('/video-browse');
    } catch (error) {
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'login' ? 'register' : 'login';
    navigate(newMode === 'login' ? '/user-login' : '/user-registration');
  };

  const userTypeOptions = [
    { value: 'parent', label: 'Parent/Guardian' },
    { value: 'creator', label: 'Content Creator' },
    { value: 'educator', label: 'Teacher/Educator' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-soft-lg mb-4">
            <Icon name="Play" size={32} color="white" />
          </div>
          <h1 className="font-heading font-bold text-fluid-2xl text-foreground mb-2">
            Welcome to KidsVidHub
          </h1>
          <p className="font-caption text-muted-foreground">
            {mode === 'login' ? 'Sign in to continue your safe video journey' : 'Create your family-safe video account'}
          </p>
        </div>

        {/* Authentication Form */}
        <div className="bg-card rounded-2xl shadow-soft-xl border border-border p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  {userTypeOptions?.map((option) => (
                    <label
                      key={option?.value}
                      className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        formData?.userType === option?.value
                          ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value={option?.value}
                        checked={formData?.userType === option?.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="font-caption text-sm font-medium">{option?.label}</span>
                    </label>
                  ))}
                </div>

                <Input
                  label="Parent/Guardian Name"
                  type="text"
                  name="parentName"
                  value={formData?.parentName}
                  onChange={handleInputChange}
                  error={errors?.parentName}
                  placeholder="Enter your full name"
                  required
                />

                {formData?.userType === 'parent' && (
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Child's Name"
                      type="text"
                      name="childName"
                      value={formData?.childName}
                      onChange={handleInputChange}
                      error={errors?.childName}
                      placeholder="Child's name"
                      required
                    />
                    <Input
                      label="Child's Age"
                      type="number"
                      name="childAge"
                      value={formData?.childAge}
                      onChange={handleInputChange}
                      error={errors?.childAge}
                      placeholder="Age"
                      min="3"
                      max="12"
                      required
                    />
                  </div>
                )}
              </>
            )}

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleInputChange}
              error={errors?.email}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              placeholder="Enter your password"
              required
            />

            {mode === 'register' && (
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData?.confirmPassword}
                onChange={handleInputChange}
                error={errors?.confirmPassword}
                placeholder="Confirm your password"
                required
              />
            )}

            {errors?.submit && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                <p className="text-error text-sm font-medium">{errors?.submit}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isLoading}
              iconName={mode === 'login' ? 'LogIn' : 'UserPlus'}
              iconPosition="left"
              className="mt-6"
            >
              {mode === 'login' ? 'Sign In Safely' : 'Create Safe Account'}
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            </p>
            <Button
              variant="link"
              onClick={toggleMode}
              className="mt-1 font-medium"
            >
              {mode === 'login' ? 'Join KidsVidHub' : 'Sign In Instead'}
            </Button>
          </div>

          {/* Safety Notice */}
          <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} color="var(--color-success)" className="mt-0.5" />
              <div>
                <h4 className="font-caption font-medium text-success text-sm">Safe & Secure</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Your family's privacy and safety are our top priority. All content is moderated and age-appropriate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationGate;