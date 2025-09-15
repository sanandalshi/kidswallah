import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center space-y-6">
      {/* Logo and Brand */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-soft-xl">
            <Icon name="Play" size={40} color="white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-soft">
            <Icon name="Shield" size={16} color="white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="font-heading font-bold text-fluid-3xl text-foreground">
            Join KidsVidHub
          </h1>
          <p className="font-caption text-fluid-base text-muted-foreground max-w-md">
            Create your family-safe video account and join thousands of parents creating a better digital world for children
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="Sparkles" size={24} className="text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-heading font-semibold text-foreground mb-2">
              Welcome to Safe Video Sharing
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              KidsVidHub is designed by parents, for parents. Every feature prioritizes your child's safety while providing engaging, educational content that sparks curiosity and learning.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col items-center space-y-2 p-4">
          <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-success" />
          </div>
          <span className="text-sm font-caption font-medium text-foreground">2-Minute Setup</span>
        </div>
        
        <div className="flex flex-col items-center space-y-2 p-4">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
          <span className="text-sm font-caption font-medium text-foreground">Instant Access</span>
        </div>
        
        <div className="flex flex-col items-center space-y-2 p-4">
          <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
            <Icon name="Gift" size={20} className="text-secondary" />
          </div>
          <span className="text-sm font-caption font-medium text-foreground">Always Free</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;