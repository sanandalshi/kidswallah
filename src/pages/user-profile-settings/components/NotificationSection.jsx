import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const NotificationSection = ({ userProfile }) => {
  const [notifications, setNotifications] = useState({
    // Email Notifications
    emailNewVideos: userProfile?.emailNewVideos || true,
    emailSafetyAlerts: userProfile?.emailSafetyAlerts || true,
    emailWeeklyDigest: userProfile?.emailWeeklyDigest || false,
    emailPromotions: userProfile?.emailPromotions || false,
    
    // Push Notifications
    pushNewVideos: userProfile?.pushNewVideos || true,
    pushSafetyAlerts: userProfile?.pushSafetyAlerts || true,
    pushScreenTimeReminders: userProfile?.pushScreenTimeReminders || true,
    pushContentApproval: userProfile?.pushContentApproval || true,
    
    // In-App Notifications
    inAppRecommendations: userProfile?.inAppRecommendations || true,
    inAppSocialActivity: userProfile?.inAppSocialActivity || false,
    inAppSystemUpdates: userProfile?.inAppSystemUpdates || true,
    
    // Frequency Settings
    digestFrequency: userProfile?.digestFrequency || 'weekly',
    quietHours: userProfile?.quietHours || { enabled: true, start: '20:00', end: '08:00' }
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleNotificationChange = (setting, value) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    try {
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Notification preferences updated successfully!');
    } catch (error) {
      alert('Failed to save preferences. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const digestOptions = [
    { value: 'daily', label: 'Daily', description: 'Receive updates every day' },
    { value: 'weekly', label: 'Weekly', description: 'Receive updates once a week' },
    { value: 'monthly', label: 'Monthly', description: 'Receive updates once a month' },
    { value: 'never', label: 'Never', description: 'No digest emails' }
  ];

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Mail" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">Email Notifications</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Choose what updates you'd like to receive via email
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <Checkbox
            label="New Videos from Approved Creators"
            description="Get notified when your approved creators upload new content"
            checked={notifications?.emailNewVideos}
            onChange={(e) => handleNotificationChange('emailNewVideos', e?.target?.checked)}
          />
          
          <Checkbox
            label="Safety Alerts"
            description="Important notifications about child safety and security"
            checked={notifications?.emailSafetyAlerts}
            onChange={(e) => handleNotificationChange('emailSafetyAlerts', e?.target?.checked)}
          />
          
          <Checkbox
            label="Weekly Activity Digest"
            description="Summary of your child's viewing activity and recommendations"
            checked={notifications?.emailWeeklyDigest}
            onChange={(e) => handleNotificationChange('emailWeeklyDigest', e?.target?.checked)}
          />
          
          <Checkbox
            label="Promotions and Features"
            description="Updates about new features and special offers"
            checked={notifications?.emailPromotions}
            onChange={(e) => handleNotificationChange('emailPromotions', e?.target?.checked)}
          />

          {/* Digest Frequency */}
          {notifications?.emailWeeklyDigest && (
            <div className="mt-6 p-4 bg-muted/20 rounded-lg">
              <h4 className="font-medium text-foreground mb-3">Digest Frequency</h4>
              <div className="space-y-2">
                {digestOptions?.map((option) => (
                  <label
                    key={option?.value}
                    className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      notifications?.digestFrequency === option?.value
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="digestFrequency"
                      value={option?.value}
                      checked={notifications?.digestFrequency === option?.value}
                      onChange={(e) => handleNotificationChange('digestFrequency', e?.target?.value)}
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
          )}
        </div>
      </div>
      {/* Push Notifications */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-accent/5 to-warning/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-warning rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Smartphone" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">Push Notifications</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Instant notifications on your device
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <Checkbox
            label="New Content Available"
            description="When new videos are available for your child"
            checked={notifications?.pushNewVideos}
            onChange={(e) => handleNotificationChange('pushNewVideos', e?.target?.checked)}
          />
          
          <Checkbox
            label="Safety Alerts"
            description="Immediate alerts about safety concerns"
            checked={notifications?.pushSafetyAlerts}
            onChange={(e) => handleNotificationChange('pushSafetyAlerts', e?.target?.checked)}
          />
          
          <Checkbox
            label="Screen Time Reminders"
            description="Notifications when approaching daily limits"
            checked={notifications?.pushScreenTimeReminders}
            onChange={(e) => handleNotificationChange('pushScreenTimeReminders', e?.target?.checked)}
          />
          
          <Checkbox
            label="Content Approval Needed"
            description="When new content requires your approval"
            checked={notifications?.pushContentApproval}
            onChange={(e) => handleNotificationChange('pushContentApproval', e?.target?.checked)}
          />
        </div>
      </div>
      {/* In-App Notifications */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-success/5 to-primary/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-success to-primary rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Bell" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">In-App Notifications</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Notifications shown while using KidsVidHub
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <Checkbox
            label="Content Recommendations"
            description="Suggestions for new videos your child might enjoy"
            checked={notifications?.inAppRecommendations}
            onChange={(e) => handleNotificationChange('inAppRecommendations', e?.target?.checked)}
          />
          
          <Checkbox
            label="Social Activity"
            description="Updates about friends and family activity"
            checked={notifications?.inAppSocialActivity}
            onChange={(e) => handleNotificationChange('inAppSocialActivity', e?.target?.checked)}
          />
          
          <Checkbox
            label="System Updates"
            description="Information about app updates and new features"
            checked={notifications?.inAppSystemUpdates}
            onChange={(e) => handleNotificationChange('inAppSystemUpdates', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Quiet Hours */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-warning/5 to-error/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-warning to-error rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Moon" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">Quiet Hours</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Pause notifications during specific hours
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-foreground">Enable Quiet Hours</h4>
              <p className="text-sm text-muted-foreground">No notifications during these hours</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications?.quietHours?.enabled}
                onChange={(e) => handleNotificationChange('quietHours', {
                  ...notifications?.quietHours,
                  enabled: e?.target?.checked
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          {notifications?.quietHours?.enabled && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Start Time</label>
                <input
                  type="time"
                  value={notifications?.quietHours?.start}
                  onChange={(e) => handleNotificationChange('quietHours', {
                    ...notifications?.quietHours,
                    start: e?.target?.value
                  })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">End Time</label>
                <input
                  type="time"
                  value={notifications?.quietHours?.end}
                  onChange={(e) => handleNotificationChange('quietHours', {
                    ...notifications?.quietHours,
                    end: e?.target?.value
                  })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Notification Preview */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-secondary/5 to-accent/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Eye" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">Notification Preview</h3>
              <p className="font-caption text-sm text-muted-foreground">
                See how your notifications will look
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {/* Sample Email Notification */}
            <div className="p-4 border border-border rounded-lg bg-muted/20">
              <div className="flex items-start space-x-3">
                <Icon name="Mail" size={20} className="text-primary mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">New Video Available!</h4>
                  <p className="text-sm text-muted-foreground">Learning Fun Channel uploaded "Fun with Numbers" - perfect for ages 6-8</p>
                  <span className="text-xs text-muted-foreground">2 minutes ago</span>
                </div>
              </div>
            </div>

            {/* Sample Push Notification */}
            <div className="p-4 border border-border rounded-lg bg-muted/20">
              <div className="flex items-start space-x-3">
                <Icon name="Smartphone" size={20} className="text-accent mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">Screen Time Reminder</h4>
                  <p className="text-sm text-muted-foreground">15 minutes of viewing time remaining today</p>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
              </div>
            </div>

            {/* Sample Safety Alert */}
            <div className="p-4 border border-error/20 rounded-lg bg-error/5">
              <div className="flex items-start space-x-3">
                <Icon name="Shield" size={20} className="text-error mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium text-error">Safety Alert</h4>
                  <p className="text-sm text-muted-foreground">Content approval needed for new video request</p>
                  <span className="text-xs text-muted-foreground">5 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSaveNotifications}
          loading={isSaving}
          iconName="Bell"
          iconPosition="left"
          className="animate-hover-lift"
        >
          Save Notification Preferences
        </Button>
      </div>
    </div>
  );
};

export default NotificationSection;