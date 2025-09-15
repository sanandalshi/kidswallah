import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';

const LoginForm = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Demo credentials available for testing
  const demoCredentials = [
    { email: "parent@kidsvid.com", password: "parent123", role: "Parent" },
    { email: "creator@kidsvid.com", password: "creator123", role: "Creator" }, 
    { email: "teacher@kidsvid.com", password: "teacher123", role: "Educator" }
  ];

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
      newErrors.email = 'Email is required for safe access';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await signIn(formData?.email, formData?.password);
      
      // Successful login - navigate to browse page
      onLoginSuccess?.({
        email: formData?.email,
        isAuthenticated: true,
        rememberMe: formData?.rememberMe
      });
      
      navigate('/video-browse');
    } catch (error) {
      // Handle authentication errors
      let errorMessage = 'Login failed. Please try again.';
      
      if (error?.message?.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please check your credentials.';
      } else if (error?.message?.includes('Email not confirmed')) {
        errorMessage = 'Please check your email and confirm your account.';
      } else if (error?.message?.includes('Too many requests')) {
        errorMessage = 'Too many login attempts. Please try again later.';
      } else if (error?.message?.includes('Failed to fetch')) {
        errorMessage = 'Cannot connect to authentication service. Your Supabase project may be paused or inactive. Please check your Supabase dashboard.';
      }
      
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Navigate to password reset (implement as needed)
    navigate('/forgot-password');
  };

  const handleDemoLogin = async (credentials) => {
    setFormData({
      email: credentials?.email,
      password: credentials?.password,
      rememberMe: false
    });
    
    setIsLoading(true);
    try {
      await signIn(credentials?.email, credentials?.password);
      onLoginSuccess?.({
        email: credentials?.email,
        isAuthenticated: true,
        rememberMe: false
      });
      navigate('/video-browse');
    } catch (error) {
      setErrors({ submit: 'Demo login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
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
            placeholder="Enter your password"
            required
            className="text-base"
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              className="text-sm"
            />
            
            <Button
              variant="link"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 p-0"
            >
              Forgot Password?
            </Button>
          </div>
        </div>

        {errors?.submit && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" className="mt-0.5" />
              <div>
                <p className="text-error text-sm font-medium">Login Failed</p>
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
          iconName="LogIn"
          iconPosition="left"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 text-base animate-hover-lift"
        >
          {isLoading ? 'Signing In Safely...' : 'Sign In to KidsVidHub'}
        </Button>
      </form>

      {/* Demo Credentials Section */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-3">Demo Credentials</h3>
        <div className="space-y-2">
          {demoCredentials?.map((cred, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="text-blue-800">
                <span className="font-medium">{cred?.role}:</span> {cred?.email}
              </div>
              <Button
                variant="link"
                size="sm"
                onClick={() => handleDemoLogin(cred)}
                className="text-blue-600 hover:text-blue-800 p-1 text-xs"
              >
                Try It
              </Button>
            </div>
          ))}
        </div>
        <p className="text-xs text-blue-600 mt-2">
          Click "Try It" to auto-fill credentials or copy: parent@kidsvid.com / parent123
        </p>
      </div>
    </div>
  );
};

export default LoginForm;