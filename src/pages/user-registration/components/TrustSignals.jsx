import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      title: 'Child Safety Certified',
      description: 'COPPA compliant platform with verified safety measures',
      color: 'text-success'
    },
    {
      icon: 'Eye',
      title: 'Content Moderated',
      description: 'All videos reviewed by child safety experts',
      color: 'text-primary'
    },
    {
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'Your family data is encrypted and secure',
      color: 'text-warning'
    },
    {
      icon: 'Users',
      title: 'Parent Approved',
      description: 'Trusted by 50,000+ families worldwide',
      color: 'text-secondary'
    }
  ];

  const safetyFeatures = [
    'No inappropriate advertisements',
    'Age-appropriate content filtering',
    'Parental control dashboard',
    'Safe commenting system',
    'Educational content focus',
    '24/7 content monitoring'
  ];

  return (
    <div className="space-y-6">
      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trustBadges?.map((badge, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 bg-card border border-border rounded-xl shadow-soft animate-hover-lift"
          >
            <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${badge?.color}`}>
              <Icon name={badge?.icon} size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-caption font-semibold text-sm text-foreground">
                {badge?.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {badge?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Safety Features */}
      <div className="bg-success/5 border border-success/20 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
            <Icon name="Heart" size={24} color="white" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-success">Safety First Promise</h3>
            <p className="text-sm text-muted-foreground">Our commitment to your family</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {safetyFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">50K+</div>
            <div className="text-xs text-muted-foreground">Families</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">100K+</div>
            <div className="text-xs text-muted-foreground">Safe Videos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">99.9%</div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;