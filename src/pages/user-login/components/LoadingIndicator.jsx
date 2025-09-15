import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingIndicator = ({ isVisible, message = "Signing you in safely..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-300">
      <div className="bg-card border border-border rounded-2xl shadow-soft-xl p-8 max-w-sm mx-4">
        <div className="text-center space-y-6">
          {/* Animated Logo */}
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto animate-gentle-bounce">
              <Icon name="Play" size={32} color="white" />
            </div>
            <div className="absolute -inset-2 border-2 border-primary/20 rounded-2xl animate-ping"></div>
          </div>

          {/* Loading Animation */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Loader2" size={24} color="var(--color-primary)" className="animate-spin" />
              <span className="font-heading font-semibold text-lg text-foreground">
                Authenticating...
              </span>
            </div>
            
            <p className="font-caption text-sm text-muted-foreground">
              {message}
            </p>
          </div>

          {/* Progress Dots */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>

          {/* Safety Message */}
          <div className="bg-success/5 border border-success/20 rounded-lg p-3">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span className="font-caption text-xs text-success font-medium">
                Verifying safe access...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;