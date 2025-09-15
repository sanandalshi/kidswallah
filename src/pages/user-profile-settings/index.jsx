import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProfileSection from './components/ProfileSection';
import SecuritySection from './components/SecuritySection';
import PrivacySection from './components/PrivacySection';
import ParentalControlsSection from './components/ParentalControlsSection';
import NotificationSection from './components/NotificationSection';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userProfile, setUserProfile] = useState({
    displayName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    userType: 'parent',
    childName: 'Emma Johnson',
    childAge: 7,
    bio: 'Loving parent dedicated to providing safe and educational content for my daughter Emma. We enjoy learning together through fun videos!',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    twoFactorEnabled: false,
    profileVisibility: 'friends',
    showWatchHistory: false,
    allowRecommendations: true,
    shareDataForImprovement: false,
    allowDirectMessages: false,
    showOnlineStatus: true,
    allowTagging: true,
    dataRetention: '2years',
    ageFilter: '6-8',
    screenTimeLimit: 60,
    allowedCategories: ['educational', 'music', 'stories'],
    blockedKeywords: ['scary', 'violence'],
    approvedCreators: ['Learning Fun Channel', 'Kids Science Lab'],
    requireApprovalForNew: true,
    enableSafeSearch: true,
    allowComments: false,
    allowSharing: false,
    bedtimeMode: { enabled: true, start: '20:00', end: '07:00' },
    emailNewVideos: true,
    emailSafetyAlerts: true,
    emailWeeklyDigest: true,
    emailPromotions: false,
    pushNewVideos: true,
    pushSafetyAlerts: true,
    pushScreenTimeReminders: true,
    pushContentApproval: true,
    inAppRecommendations: true,
    inAppSocialActivity: false,
    inAppSystemUpdates: true,
    digestFrequency: 'weekly',
    quietHours: { enabled: true, start: '20:00', end: '08:00' }
  });

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus !== 'true') {
      navigate('/user-login');
    }
  }, [navigate]);

  const handleAuthToggle = (status) => {
    setIsAuthenticated(status);
    localStorage.setItem('isAuthenticated', status?.toString());
  };

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(prev => ({
      ...prev,
      ...updatedProfile
    }));
    
    // Mock API call
    console.log('Profile updated:', updatedProfile);
  };

  const settingsTabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information and account details',
      available: true
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Lock',
      description: 'Password and authentication settings',
      available: true
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: 'Eye',
      description: 'Data sharing and visibility preferences',
      available: true
    },
    {
      id: 'parental',
      label: 'Parental Controls',
      icon: 'Shield',
      description: 'Child safety and content filtering',
      available: userProfile?.userType === 'parent'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Email and push notification preferences',
      available: true
    }
  ];

  const availableTabs = settingsTabs?.filter(tab => tab?.available);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection userProfile={userProfile} onProfileUpdate={handleProfileUpdate} />;
      case 'security':
        return <SecuritySection userProfile={userProfile} />;
      case 'privacy':
        return <PrivacySection userProfile={userProfile} />;
      case 'parental':
        return <ParentalControlsSection userProfile={userProfile} />;
      case 'notifications':
        return <NotificationSection userProfile={userProfile} />;
      default:
        return <ProfileSection userProfile={userProfile} onProfileUpdate={handleProfileUpdate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Header 
        isAuthenticated={isAuthenticated}
        userRole={userProfile?.userType}
        onAuthToggle={handleAuthToggle}
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/video-browse')}
                className="animate-hover-lift"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="font-heading font-bold text-fluid-2xl text-foreground">
                  Account Settings
                </h1>
                <p className="font-caption text-muted-foreground">
                  Manage your profile, privacy, and safety preferences
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="User" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Account Type</p>
                    <p className="font-semibold text-foreground capitalize">{userProfile?.userType}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Safety Status</p>
                    <p className="font-semibold text-success">Protected</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Screen Time Today</p>
                    <p className="font-semibold text-foreground">32 minutes</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-4 border border-border shadow-soft">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Heart" size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Favorite Videos</p>
                    <p className="font-semibold text-foreground">23</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden sticky top-24">
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 border-b border-border">
                  <h2 className="font-heading font-semibold text-foreground">Settings</h2>
                </div>
                
                <nav className="p-2">
                  {availableTabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all animate-hover-lift ${
                        activeTab === tab?.id
                          ? 'bg-primary text-white shadow-soft'
                          : 'text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon name={tab?.icon} size={20} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{tab?.label}</p>
                        <p className={`text-xs truncate ${
                          activeTab === tab?.id ? 'text-white/80' : 'text-muted-foreground'
                        }`}>
                          {tab?.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </nav>
                
                {/* Help Section */}
                <div className="p-4 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    iconName="HelpCircle"
                    iconPosition="left"
                    className="animate-hover-lift"
                  >
                    Get Help
                  </Button>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              {renderTabContent()}
            </div>
          </div>

          {/* Safety Notice */}
          <div className="mt-8 p-6 bg-success/5 border border-success/20 rounded-2xl">
            <div className="flex items-start space-x-4">
              <Icon name="Shield" size={24} color="var(--color-success)" className="mt-1" />
              <div>
                <h3 className="font-heading font-semibold text-success mb-2">Your Family's Safety is Our Priority</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  All settings changes are logged for security purposes. Our platform uses advanced AI moderation 
                  and human review to ensure all content meets our strict child safety standards. If you have any 
                  concerns about content or safety, please contact our support team immediately.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="animate-hover-lift"
                  >
                    Contact Support
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="FileText"
                    iconPosition="left"
                    className="animate-hover-lift"
                  >
                    Safety Guidelines
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="AlertTriangle"
                    iconPosition="left"
                    className="animate-hover-lift"
                  >
                    Report Content
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;