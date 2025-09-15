import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Child Safety Certified',
      description: 'COPPA compliant platform with verified safety standards'
    },
    {
      icon: 'Lock',
      title: 'Secure Login',
      description: 'Advanced encryption protects your family data'
    },
    {
      icon: 'Eye',
      title: 'Content Moderated',
      description: 'All videos reviewed for age-appropriate content'
    },
    {
      icon: 'Users',
      title: 'Trusted by Parents',
      description: 'Over 50,000 families use our safe platform'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Trust Badge */}
      <div className="bg-gradient-to-r from-success/10 to-primary/10 border border-success/20 rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft-lg">
          <Icon name="ShieldCheck" size={32} color="white" />
        </div>
        <h3 className="font-heading font-bold text-lg text-foreground mb-2">
          100% Safe & Secure
        </h3>
        <p className="font-caption text-sm text-muted-foreground">
          Your family's safety is our top priority. Every aspect of our platform is designed with child protection in mind.
        </p>
      </div>
      {/* Trust Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-soft-md transition-all animate-hover-lift"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-caption font-semibold text-sm text-foreground mb-1">
                  {feature?.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6 py-4">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Lock" size={16} color="var(--color-success)" />
          <span className="font-caption">SSL Encrypted</span>
        </div>
        <div className="w-px h-4 bg-border"></div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={16} color="var(--color-success)" />
          <span className="font-caption">COPPA Compliant</span>
        </div>
        <div className="w-px h-4 bg-border"></div>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="CheckCircle" size={16} color="var(--color-success)" />
          <span className="font-caption">Verified Safe</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;