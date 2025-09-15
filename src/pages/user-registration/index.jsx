import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import WelcomeHeader from './components/WelcomeHeader';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import RegistrationFooter from './components/RegistrationFooter';
import Icon from '../../components/AppIcon';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form', 'verification'

  // Mock credentials for testing
  const mockCredentials = {
    parent: { email: "parent@kidsvid.com", password: "parent123" },
    creator: { email: "creator@kidsvid.com", password: "creator123" },
    educator: { email: "educator@kidsvid.com", password: "educator123" }
  };

  const handleRegistrationSubmit = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      console.log('Registration data:', formData);
      
      // Move to verification step
      setRegistrationStep('verification');
      
      // Auto-redirect after showing verification message
      setTimeout(() => {
        navigate('/user-login', { 
          state: { 
            message: 'Account created successfully! Please sign in with your credentials.',
            email: formData?.email 
          }
        });
      }, 3000);
      
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToForm = () => {
    setRegistrationStep('form');
  };

  if (registrationStep === 'verification') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <Helmet>
          <title>Email Verification - KidsVidHub</title>
          <meta name="description" content="Verify your email to complete KidsVidHub registration" />
        </Helmet>
        
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-card rounded-2xl shadow-soft-xl border border-border p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-success to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft-lg">
                <Icon name="Mail" size={40} color="white" />
              </div>
              
              <h1 className="font-heading font-bold text-fluid-xl text-foreground mb-4">
                Check Your Email
              </h1>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We've sent a verification link to your email address. Please check your inbox and click the link to activate your KidsVidHub account.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span>Verification email sent successfully</span>
                </div>
                
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-primary font-medium">
                    Redirecting to sign in page...
                  </p>
                  <div className="w-full bg-primary/20 rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleBackToForm}
                className="mt-6 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to registration form
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Helmet>
        <title>Join KidsVidHub - Safe Video Platform for Families</title>
        <meta name="description" content="Create your family-safe video account on KidsVidHub. Join thousands of parents in providing safe, educational content for children." />
        <meta name="keywords" content="kids videos, safe content, family platform, child safety, educational videos" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column - Welcome & Trust Signals */}
            <div className="space-y-8">
              <WelcomeHeader />
              <TrustSignals />
              
              {/* Mock Credentials Display */}
              <div className="bg-warning/5 border border-warning/20 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-warning mt-0.5" />
                  <div>
                    <h4 className="font-caption font-semibold text-warning text-sm mb-2">
                      Demo Credentials Available
                    </h4>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div><strong>Parent:</strong> parent@kidsvid.com / parent123</div>
                      <div><strong>Creator:</strong> creator@kidsvid.com / creator123</div>
                      <div><strong>Educator:</strong> educator@kidsvid.com / educator123</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-card rounded-2xl shadow-soft-xl border border-border p-8">
                <div className="mb-8">
                  <h2 className="font-heading font-bold text-fluid-xl text-foreground mb-2">
                    Create Your Account
                  </h2>
                  <p className="text-muted-foreground">
                    Join our safe community in just a few steps
                  </p>
                </div>

                <RegistrationForm 
                  onSubmit={handleRegistrationSubmit}
                  isLoading={isLoading}
                />

                <div className="mt-8">
                  <RegistrationFooter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Safety Badge */}
      <div className="fixed bottom-6 right-6 z-200">
        <div className="bg-success text-white px-4 py-2 rounded-full shadow-soft-lg flex items-center space-x-2 animate-gentle-bounce">
          <Icon name="Shield" size={16} />
          <span className="text-sm font-caption font-medium">Child Safe Platform</span>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;