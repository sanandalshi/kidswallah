import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PrivacySection = ({ userProfile }) => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: userProfile?.profileVisibility || 'friends',
    showWatchHistory: userProfile?.showWatchHistory || false,
    allowRecommendations: userProfile?.allowRecommendations || true,
    shareDataForImprovement: userProfile?.shareDataForImprovement || false,
    allowDirectMessages: userProfile?.allowDirectMessages || false,
    showOnlineStatus: userProfile?.showOnlineStatus || true,
    allowTagging: userProfile?.allowTagging || true,
    dataRetention: userProfile?.dataRetention || '2years'
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSettingChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Privacy settings updated successfully!');
    } catch (error) {
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can see your profile' },
    { value: 'friends', label: 'Friends Only', description: 'Only approved friends can see your profile' },
    { value: 'private', label: 'Private', description: 'Only you can see your profile' }
  ];

  const dataRetentionOptions = [
    { value: '1year', label: '1 Year', description: 'Delete data after 1 year' },
    { value: '2years', label: '2 Years', description: 'Delete data after 2 years' },
    { value: '5years', label: '5 Years', description: 'Delete data after 5 years' },
    { value: 'never', label: 'Never', description: 'Keep data indefinitely' }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Visibility */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Eye" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">Profile Visibility</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Control who can see your profile and content
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {visibilityOptions?.map((option) => (
              <label
                key={option?.value}
                className={`flex items-start space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  privacySettings?.profileVisibility === option?.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <input
                  type="radio"
                  name="profileVisibility"
                  value={option?.value}
                  checked={privacySettings?.profileVisibility === option?.value}
                  onChange={(e) => handleSettingChange('profileVisibility', e?.target?.value)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{option?.label}</h4>
                  <p className="text-sm text-muted-foreground">{option?.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* Content & Activity Privacy */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-accent/5 to-warning/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-warning rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Activity" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">Content & Activity</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Manage your content sharing and activity visibility
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <Checkbox
              label="Show Watch History"
              description="Allow others to see videos you've watched"
              checked={privacySettings?.showWatchHistory}
              onChange={(e) => handleSettingChange('showWatchHistory', e?.target?.checked)}
            />
            
            <Checkbox
              label="Allow Personalized Recommendations"
              description="Use your activity to suggest relevant content"
              checked={privacySettings?.allowRecommendations}
              onChange={(e) => handleSettingChange('allowRecommendations', e?.target?.checked)}
            />
            
            <Checkbox
              label="Show Online Status"
              description="Let others see when you're active on the platform"
              checked={privacySettings?.showOnlineStatus}
              onChange={(e) => handleSettingChange('showOnlineStatus', e?.target?.checked)}
            />
            
            <Checkbox
              label="Allow Tagging in Videos"
              description="Let others tag you in their video content"
              checked={privacySettings?.allowTagging}
              onChange={(e) => handleSettingChange('allowTagging', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Communication Privacy */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-success/5 to-primary/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-success to-primary rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="MessageCircle" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">Communication</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Control how others can contact you
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <Checkbox
              label="Allow Direct Messages"
              description="Let other users send you private messages"
              checked={privacySettings?.allowDirectMessages}
              onChange={(e) => handleSettingChange('allowDirectMessages', e?.target?.checked)}
            />
            
            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="mt-0.5" />
                <div>
                  <h4 className="font-caption font-medium text-warning text-sm">Child Safety Notice</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    All communications are monitored for child safety. Inappropriate messages are automatically blocked and reported.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Data Management */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-error/5 to-warning/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-error to-warning rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Database" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">Data Management</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Control how your data is used and stored
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <Checkbox
              label="Share Data for Platform Improvement"
              description="Help us improve KidsVidHub by sharing anonymous usage data"
              checked={privacySettings?.shareDataForImprovement}
              onChange={(e) => handleSettingChange('shareDataForImprovement', e?.target?.checked)}
            />
          </div>

          {/* Data Retention */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Data Retention Period</h4>
            <div className="space-y-3">
              {dataRetentionOptions?.map((option) => (
                <label
                  key={option?.value}
                  className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    privacySettings?.dataRetention === option?.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="dataRetention"
                    value={option?.value}
                    checked={privacySettings?.dataRetention === option?.value}
                    onChange={(e) => handleSettingChange('dataRetention', e?.target?.value)}
                    className="mt-1"
                  />
                  <div>
                    <h5 className="font-medium text-foreground">{option?.label}</h5>
                    <p className="text-sm text-muted-foreground">{option?.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Data Export & Deletion */}
          <div className="pt-4 border-t border-border">
            <h4 className="font-medium text-foreground mb-4">Data Rights</h4>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                className="animate-hover-lift"
              >
                Export My Data
              </Button>
              
              <Button
                variant="destructive"
                iconName="Trash2"
                iconPosition="left"
                className="animate-hover-lift"
              >
                Delete My Account
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSaveSettings}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
          className="animate-hover-lift"
        >
          Save Privacy Settings
        </Button>
      </div>
    </div>
  );
};

export default PrivacySection;