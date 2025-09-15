import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import WelcomeHeader from './components/WelcomeHeader';
import LoadingIndicator from './components/LoadingIndicator';
import Icon from '../../components/AppIcon';

const UserLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/video-browse');
    }
  }, [navigate]);

  const handleLoginSuccess = (userData) => {
    setIsLoading(true);
    setLoadingMessage('Setting up your safe dashboard...');
    
    // Store user data
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userType', userData?.userType);
    localStorage.setItem('userEmail', userData?.email);
    
    if (userData?.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }
    
    // Simulate dashboard setup
    setTimeout(() => {
      setIsLoading(false);
      navigate('/video-browse');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-secondary rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-primary rounded-full"></div>
      </div>
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Welcome & Trust Signals */}
            <div className="space-y-8">
              <WelcomeHeader />
              
              {/* Mobile Trust Signals - Hidden on Desktop */}
              <div className="lg:hidden">
                <TrustSignals />
              </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="space-y-8">
              {/* Login Card */}
              <div className="bg-card border border-border rounded-3xl shadow-soft-xl p-8 lg:p-10">
                <div className="space-y-6">
                  {/* Form Header */}
                  <div className="text-center space-y-2">
                    <h2 className="font-heading font-bold text-fluid-xl text-foreground">
                      Sign In
                    </h2>
                    <p className="font-caption text-muted-foreground">
                      Enter your credentials to access your safe video hub
                    </p>
                  </div>

                  {/* Login Form */}
                  <LoginForm onLoginSuccess={handleLoginSuccess} />

                  {/* Demo Credentials Info */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="Info" size={20} color="var(--color-primary)" className="mt-0.5" />
                      <div>
                        <h4 className="font-caption font-medium text-primary text-sm mb-2">
                          Demo Credentials
                        </h4>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div><strong>Parent:</strong> parent@kidsvid.com / parent123</div>
                          <div><strong>Creator:</strong> creator@kidsvid.com / creator123</div>
                          <div><strong>Educator:</strong> teacher@kidsvid.com / teacher123</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Trust Signals - Hidden on Mobile */}
              <div className="hidden lg:block">
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Loading Indicator */}
      <LoadingIndicator isVisible={isLoading} message={loadingMessage} />
      {/* Footer */}
      <div className="relative z-10 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span className="font-caption text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} KidsVidHub - Safe Video Platform for Children
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="Lock" size={12} />
                <span>Privacy Policy</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="FileText" size={12} />
                <span>Terms of Service</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="HelpCircle" size={12} />
                <span>Help Center</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;