import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SafetyIndicator = ({ 
  isParentalControlsActive = true, 
  currentAgeFilter = '6-8',
  onToggleControls,
  onAgeSettingsClick 
}) => {
  return (
    <div className="bg-gradient-to-r from-success/10 to-primary/10 border border-success/20 rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-success to-primary rounded-xl flex items-center justify-center shadow-soft">
            <Icon name="Shield" size={24} color="white" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground flex items-center space-x-2">
              <span>Safe Browsing Active</span>
              <Icon name="CheckCircle" size={16} className="text-success" />
            </h3>
            <p className="font-caption text-sm text-muted-foreground">
              Content filtered for ages {currentAgeFilter} • All videos are moderated and safe
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onAgeSettingsClick}
            iconName="Settings"
            iconPosition="left"
            className="animate-hover-lift"
          >
            Age Settings
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="font-caption text-sm text-muted-foreground">
              Parental Controls
            </span>
            <button
              onClick={onToggleControls}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isParentalControlsActive ? 'bg-success' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isParentalControlsActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Safety Features */}
      <div className="mt-4 pt-4 border-t border-success/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Eye" size={16} className="text-success" />
            <span className="font-caption text-xs text-muted-foreground">Content Moderated</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Volume2" size={16} className="text-success" />
            <span className="font-caption text-xs text-muted-foreground">Audio Safe</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MessageCircle" size={16} className="text-success" />
            <span className="font-caption text-xs text-muted-foreground">Comments Disabled</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-success" />
            <span className="font-caption text-xs text-muted-foreground">Time Limits</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyIndicator;