import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const AccountManagementHub = ({ userRole = 'parent', isCollapsed = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path, tab) => {
    navigate(path);
    setActiveTab(tab);
  };

  const accountSections = [
    {
      id: 'profile',
      label: 'Profile Settings',
      icon: 'User',
      path: '/user-profile-settings',
      description: 'Manage your account and preferences',
      available: true
    },
    {
      id: 'upload',
      label: 'Upload Content',
      icon: 'Upload',
      path: '/video-upload',
      description: 'Share educational videos safely',
      available: userRole === 'creator' || userRole === 'educator'
    },
    {
      id: 'safety',
      label: 'Safety Controls',
      icon: 'Shield',
      path: '/safety-settings',
      description: 'Configure parental controls',
      available: userRole === 'parent'
    },
    {
      id: 'analytics',
      label: 'Content Analytics',
      icon: 'BarChart3',
      path: '/content-analytics',
      description: 'View your content performance',
      available: userRole === 'creator' || userRole === 'educator'
    }
  ];

  const availableSections = accountSections?.filter(section => section?.available);

  if (isCollapsed) {
    return (
      <div className="fixed left-4 top-20 z-200">
        <div className="bg-card border border-border rounded-xl shadow-soft-lg p-2">
          <div className="space-y-2">
            {availableSections?.map((section) => (
              <Button
                key={section?.id}
                variant={isActivePath(section?.path) ? 'default' : 'ghost'}
                size="icon"
                onClick={() => handleNavigation(section?.path, section?.id)}
                className="w-10 h-10 animate-hover-lift"
                title={section?.label}
              >
                <Icon name={section?.icon} size={20} />
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl shadow-soft-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft">
            <Icon name="Settings" size={24} color="white" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-fluid-lg text-foreground">Account Management</h2>
            <p className="font-caption text-sm text-muted-foreground">
              {userRole === 'parent' ? 'Manage family settings and safety' : 
               userRole === 'creator'? 'Create and manage your content' : 'Educational content management'}
            </p>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="border-b border-border">
        <nav className="flex overflow-x-auto">
          {availableSections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => handleNavigation(section?.path, section?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                isActivePath(section?.path)
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Icon name={section?.icon} size={16} />
              <span>{section?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Content Area */}
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {availableSections?.map((section) => (
            <div
              key={section?.id}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer animate-hover-lift ${
                isActivePath(section?.path)
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
              onClick={() => handleNavigation(section?.path, section?.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isActivePath(section?.path) ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={section?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    {section?.label}
                  </h3>
                  <p className="font-caption text-sm text-muted-foreground">
                    {section?.description}
                  </p>
                </div>
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className={`text-muted-foreground transition-transform ${
                    isActivePath(section?.path) ? 'rotate-90' : ''
                  }`} 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="font-heading font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => navigate('/video-browse')}
              className="animate-hover-lift"
            >
              Browse Videos
            </Button>
            
            {userRole === 'parent' && (
              <Button
                variant="outline"
                size="sm"
                iconName="Clock"
                iconPosition="left"
                className="animate-hover-lift"
              >
                View Watch History
              </Button>
            )}
            
            {(userRole === 'creator' || userRole === 'educator') && (
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/video-upload')}
                className="animate-hover-lift"
              >
                Upload New Video
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              iconName="HelpCircle"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Get Help
            </Button>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} color="var(--color-success)" className="mt-0.5" />
            <div>
              <h4 className="font-caption font-medium text-success text-sm">Safety First</h4>
              <p className="text-xs text-muted-foreground mt-1">
                All account changes are logged for security. Your family's safety is our priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagementHub;