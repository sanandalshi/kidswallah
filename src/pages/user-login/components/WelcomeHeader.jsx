import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/user-registration');
  };

  return (
    <div className="text-center space-y-6">
      {/* Logo and Brand */}
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl shadow-soft-xl animate-gentle-bounce">
          <Icon name="Play" size={40} color="white" />
        </div>
        
        <div className="space-y-2">
          <h1 className="font-heading font-bold text-fluid-3xl text-foreground">
            Welcome Back!
          </h1>
          <p className="font-caption text-lg text-muted-foreground max-w-md mx-auto">
            Sign in to continue your safe video adventure with KidsVidHub
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 rounded-xl p-6">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Icon name="Heart" size={24} color="var(--color-primary)" />
          <h2 className="font-heading font-semibold text-lg text-foreground">
            Safe Video Fun Awaits
          </h2>
          <Icon name="Heart" size={24} color="var(--color-secondary)" />
        </div>
        <p className="font-caption text-sm text-muted-foreground leading-relaxed">
          Access thousands of educational and entertaining videos, all carefully curated for children. 
          Your personalized dashboard is ready with age-appropriate content and parental controls.
        </p>
      </div>

      {/* New User CTA */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Users" size={20} color="var(--color-accent)" />
            <span className="font-caption font-medium text-foreground">New to KidsVidHub?</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Join thousands of families enjoying safe, educational video content
          </p>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={handleCreateAccount}
            iconName="UserPlus"
            iconPosition="left"
            className="animate-hover-lift"
          >
            Create Free Account
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-1">
          <div className="font-heading font-bold text-fluid-lg text-primary">50K+</div>
          <div className="font-caption text-xs text-muted-foreground">Happy Families</div>
        </div>
        <div className="space-y-1">
          <div className="font-heading font-bold text-fluid-lg text-secondary">10K+</div>
          <div className="font-caption text-xs text-muted-foreground">Safe Videos</div>
        </div>
        <div className="space-y-1">
          <div className="font-heading font-bold text-fluid-lg text-accent">100%</div>
          <div className="font-caption text-xs text-muted-foreground">Child Safe</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;