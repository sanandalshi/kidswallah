import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SecuritySection = ({ userProfile }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(userProfile?.twoFactorEnabled || false);
  const [errors, setErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e?.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData?.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData?.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData?.newPassword?.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData?.newPassword !== passwordData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handlePasswordSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    setIsChangingPassword(true);
    try {
      // Mock password change
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      alert('Password changed successfully!');
    } catch (error) {
      setErrors({ submit: 'Failed to change password. Please try again.' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleTwoFactorToggle = async () => {
    if (!twoFactorEnabled) {
      setShowQRCode(true);
    } else {
      // Disable 2FA
      setTwoFactorEnabled(false);
      alert('Two-factor authentication disabled');
    }
  };

  const confirmTwoFactorSetup = () => {
    setTwoFactorEnabled(true);
    setShowQRCode(false);
    alert('Two-factor authentication enabled successfully!');
  };

  const loginActivity = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'New York, NY',
      time: '2 hours ago',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'New York, NY',
      time: '1 day ago',
      current: false
    },
    {
      id: 3,
      device: 'Chrome on Android',
      location: 'Brooklyn, NY',
      time: '3 days ago',
      current: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Password Change Section */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-warning/5 to-error/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-warning to-error rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Lock" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">Change Password</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Keep your account secure with a strong password
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              name="currentPassword"
              value={passwordData?.currentPassword}
              onChange={handlePasswordChange}
              error={errors?.currentPassword}
              placeholder="Enter your current password"
              required
            />
            
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="New Password"
                type="password"
                name="newPassword"
                value={passwordData?.newPassword}
                onChange={handlePasswordChange}
                error={errors?.newPassword}
                placeholder="Enter new password"
                required
              />
              
              <Input
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={passwordData?.confirmPassword}
                onChange={handlePasswordChange}
                error={errors?.confirmPassword}
                placeholder="Confirm new password"
                required
              />
            </div>

            {errors?.submit && (
              <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                <p className="text-error text-sm font-medium">{errors?.submit}</p>
              </div>
            )}

            <Button
              type="submit"
              variant="warning"
              loading={isChangingPassword}
              iconName="Key"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Update Password
            </Button>
          </form>
        </div>
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-success/5 to-primary/5 p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-success to-primary rounded-xl flex items-center justify-center shadow-soft">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-fluid-lg text-foreground">Two-Factor Authentication</h3>
                <p className="font-caption text-sm text-muted-foreground">
                  Add an extra layer of security to your account
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${twoFactorEnabled ? 'text-success' : 'text-muted-foreground'}`}>
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
              <Button
                variant={twoFactorEnabled ? 'outline' : 'success'}
                onClick={handleTwoFactorToggle}
                iconName={twoFactorEnabled ? 'ShieldOff' : 'ShieldCheck'}
                iconPosition="left"
                className="animate-hover-lift"
              >
                {twoFactorEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </div>
        </div>

        {showQRCode && (
          <div className="p-6 border-b border-border bg-muted/20">
            <div className="text-center">
              <div className="w-48 h-48 bg-white border-2 border-border rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="text-center">
                  <Icon name="QrCode" size={64} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">QR Code Placeholder</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Scan this QR code with your authenticator app
              </p>
              <div className="flex justify-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowQRCode(false)}
                  iconName="X"
                  iconPosition="left"
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  onClick={confirmTwoFactorSetup}
                  iconName="Check"
                  iconPosition="left"
                >
                  I've Added It
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name={twoFactorEnabled ? 'CheckCircle' : 'AlertCircle'} 
                    size={20} 
                    color={twoFactorEnabled ? 'var(--color-success)' : 'var(--color-warning)'} />
              <div>
                <p className="font-medium text-foreground">
                  {twoFactorEnabled ? 'Your account is protected' : 'Enhance your security'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {twoFactorEnabled 
                    ? 'Two-factor authentication is active' :'Enable 2FA to protect your family\'s content'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Login Activity */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Activity" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">Login Activity</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Monitor your recent account access
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {loginActivity?.map((activity) => (
              <div key={activity?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity?.current ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={activity?.device?.includes('iPhone') ? 'Smartphone' : 
                                activity?.device?.includes('Android') ? 'Smartphone' : 'Monitor'} 
                          size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{activity?.device}</p>
                    <p className="text-sm text-muted-foreground">{activity?.location}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-foreground">{activity?.time}</p>
                  {activity?.current && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-success/10 text-success">
                      Current Session
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-border">
            <Button
              variant="outline"
              iconName="LogOut"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Sign Out All Other Sessions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;