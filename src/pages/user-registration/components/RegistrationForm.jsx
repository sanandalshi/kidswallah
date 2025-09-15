import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';

const RegistrationForm = ({ onRegistrationSuccess }) => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    displayName: '',
    role: 'parent',
    termsAccepted: false,
    parentEmail: '' // For creator/educator accounts
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData?.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    if ((formData?.role === 'creator' || formData?.role === 'educator') && !formData?.parentEmail) {
      newErrors.parentEmail = 'Parent email is required for creator and educator accounts';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const userData = {
        full_name: formData?.fullName,
        display_name: formData?.displayName || formData?.fullName,
        role: formData?.role,
        parent_email: formData?.parentEmail || null
      };

      await signUp(formData?.email, formData?.password, userData);
      
      // Successful registration
      onRegistrationSuccess?.({
        email: formData?.email,
        fullName: formData?.fullName,
        role: formData?.role
      });
      
      navigate('/email-confirmation');
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error?.message?.includes('already registered')) {
        errorMessage = 'This email is already registered. Please use a different email or try logging in.';
      } else if (error?.message?.includes('Password should be')) {
        errorMessage = 'Password does not meet requirements. Please choose a stronger password.';
      } else if (error?.message?.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to authentication service. Please check your connection.';
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            value={formData?.fullName}
            onChange={handleInputChange}
            error={errors?.fullName}
            placeholder="Enter your full name"
            required
            className="text-base"
          />

          <Input
            label="Display Name (Optional)"
            type="text"
            name="displayName"
            value={formData?.displayName}
            onChange={handleInputChange}
            placeholder="How you'd like to be shown"
            className="text-base"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type
            </label>
            <select
              name="role"
              value={formData?.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="parent">Parent/Guardian</option>
              <option value="creator">Content Creator</option>
              <option value="educator">Educator/Teacher</option>
            </select>
          </div>

          {(formData?.role === 'creator' || formData?.role === 'educator') && (
            <Input
              label="Parent/Guardian Email"
              type="email"
              name="parentEmail"
              value={formData?.parentEmail}
              onChange={handleInputChange}
              error={errors?.parentEmail}
              placeholder="Parent's email address"
              required
              className="text-base"
            />
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
            className="text-base"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            placeholder="Create a secure password"
            required
            className="text-base"
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={errors?.confirmPassword}
            placeholder="Confirm your password"
            required
            className="text-base"
          />

          <Checkbox
            label="I accept the Terms of Service and Privacy Policy"
            name="termsAccepted"
            checked={formData?.termsAccepted}
            onChange={handleInputChange}
            error={errors?.termsAccepted}
            className="text-sm"
          />
        </div>

        {errors?.submit && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" className="mt-0.5" />
              <div>
                <p className="text-error text-sm font-medium">Registration Failed</p>
                <p className="text-error/80 text-xs mt-1">{errors?.submit}</p>
              </div>
            </div>
          </div>
        )}

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="left"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 text-base animate-hover-lift"
        >
          {isLoading ? 'Creating Your Safe Account...' : 'Create KidsVidHub Account'}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;