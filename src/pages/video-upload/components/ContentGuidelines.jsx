import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContentGuidelines = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const guidelines = [
    {
      id: 'safety',
      title: 'Child Safety Requirements',
      icon: 'Shield',
      color: 'success',
      items: [
        'No inappropriate language or content',
        'Age-appropriate themes and visuals',
        'No scary or violent imagery',
        'Positive messaging and educational value',
        'Clear audio without background noise'
      ]
    },
    {
      id: 'content',
      title: 'Content Standards',
      icon: 'CheckCircle',
      color: 'primary',
      items: [
        'Original content or proper licensing',
        'High video quality (720p minimum)',
        'Engaging and educational material',
        'Appropriate length (2-15 minutes)',
        'Clear and understandable narration'
      ]
    },
    {
      id: 'community',
      title: 'Community Guidelines',
      icon: 'Users',
      color: 'secondary',
      items: [
        'Respectful and inclusive content',
        'No promotional or commercial content',
        'Encourage learning and creativity',
        'Support diverse learning styles',
        'Foster positive social values'
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-soft-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-warning to-accent rounded-xl flex items-center justify-center shadow-soft">
            <Icon name="BookOpen" size={20} color="white" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-fluid-lg text-foreground">Content Guidelines</h2>
            <p className="font-caption text-sm text-muted-foreground">Ensure your content meets our safety standards</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {guidelines?.map((guideline) => (
          <div
            key={guideline?.id}
            className="border border-border rounded-xl overflow-hidden transition-all animate-hover-lift"
          >
            <button
              onClick={() => toggleSection(guideline?.id)}
              className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${guideline?.color}/10`}>
                    <Icon 
                      name={guideline?.icon} 
                      size={16} 
                      className={`text-${guideline?.color}`}
                    />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {guideline?.title}
                  </h3>
                </div>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`text-muted-foreground transition-transform ${
                    expandedSection === guideline?.id ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>
            
            {expandedSection === guideline?.id && (
              <div className="px-4 pb-4">
                <ul className="space-y-2 ml-11">
                  {guideline?.items?.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground font-caption">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-warning/5 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="mt-0.5" />
            <div>
              <h4 className="font-caption font-medium text-warning text-sm">Content Review Process</h4>
              <p className="text-xs text-muted-foreground mt-1">
                All uploaded videos undergo automatic and manual review to ensure they meet our child safety standards. 
                This process may take 24-48 hours before your content becomes visible to other users.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="left"
            className="animate-hover-lift"
          >
            Full Guidelines
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            className="animate-hover-lift"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentGuidelines;