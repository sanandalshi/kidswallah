import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfileSection = ({ userProfile, onProfileUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: userProfile?.displayName || '',
    email: userProfile?.email || '',
    userType: userProfile?.userType || 'parent',
    childName: userProfile?.childName || '',
    childAge: userProfile?.childAge || '',
    bio: userProfile?.bio || '',
    profilePicture: userProfile?.profilePicture || ''
  });
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setProfileData(prev => ({
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

  const handleProfilePictureUpload = async (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    if (file?.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        profilePicture: 'Image must be less than 5MB'
      }));
      return;
    }

    setIsUploading(true);
    try {
      // Mock upload simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mockUrl = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face`;
      setProfileData(prev => ({
        ...prev,
        profilePicture: mockUrl
      }));
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        profilePicture: 'Failed to upload image'
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!profileData?.displayName?.trim()) {
      newErrors.displayName = 'Display name is required';
    }
    
    if (!profileData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(profileData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (profileData?.userType === 'parent' && !profileData?.childName?.trim()) {
      newErrors.childName = 'Child name is required for parent accounts';
    }
    
    if (profileData?.userType === 'parent' && (!profileData?.childAge || profileData?.childAge < 3 || profileData?.childAge > 12)) {
      newErrors.childAge = 'Child age must be between 3 and 12';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    onProfileUpdate(profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      displayName: userProfile?.displayName || '',
      email: userProfile?.email || '',
      userType: userProfile?.userType || 'parent',
      childName: userProfile?.childName || '',
      childAge: userProfile?.childAge || '',
      bio: userProfile?.bio || '',
      profilePicture: userProfile?.profilePicture || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  const userTypeOptions = [
    { value: 'parent', label: 'Parent/Guardian', icon: 'Users' },
    { value: 'creator', label: 'Content Creator', icon: 'Video' },
    { value: 'educator', label: 'Teacher/Educator', icon: 'GraduationCap' }
  ];

  return (
    <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="User" size={24} color="white" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-fluid-lg text-foreground">Profile Information</h2>
              <p className="font-caption text-sm text-muted-foreground">
                Manage your account details and preferences
              </p>
            </div>
          </div>
          
          {!isEditing ? (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              iconName="Edit"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={handleCancel}
                iconName="X"
                iconPosition="left"
                className="animate-hover-lift"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSave}
                iconName="Check"
                iconPosition="left"
                className="animate-hover-lift"
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Profile Content */}
      <div className="p-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-soft-lg">
                  <Image
                    src={profileData?.profilePicture || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face`}
                    alt="Profile Picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {isEditing && (
                  <div className="absolute bottom-0 right-0">
                    <label className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer shadow-soft-lg hover:bg-primary/90 transition-colors">
                      <Icon name="Camera" size={16} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureUpload}
                        className="sr-only"
                      />
                    </label>
                  </div>
                )}
                
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                    <Icon name="Loader2" size={24} color="white" className="animate-spin" />
                  </div>
                )}
              </div>
              
              {errors?.profilePicture && (
                <p className="text-error text-sm mt-2">{errors?.profilePicture}</p>
              )}
              
              <div className="mt-4">
                <h3 className="font-heading font-semibold text-foreground">
                  {profileData?.displayName || 'Your Name'}
                </h3>
                <p className="font-caption text-sm text-muted-foreground capitalize">
                  {profileData?.userType} Account
                </p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Account Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {userTypeOptions?.map((option) => (
                    <label
                      key={option?.value}
                      className={`flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        profileData?.userType === option?.value
                          ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
                      } ${!isEditing ? 'pointer-events-none opacity-60' : ''}`}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value={option?.value}
                        checked={profileData?.userType === option?.value}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <Icon name={option?.icon} size={24} className="mx-auto mb-2" />
                        <span className="font-caption text-sm font-medium">{option?.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Display Name"
                  type="text"
                  name="displayName"
                  value={profileData?.displayName}
                  onChange={handleInputChange}
                  error={errors?.displayName}
                  placeholder="Enter your display name"
                  disabled={!isEditing}
                  required
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={profileData?.email}
                  onChange={handleInputChange}
                  error={errors?.email}
                  placeholder="Enter your email"
                  disabled={!isEditing}
                  required
                />
              </div>

              {/* Child Information (for parents) */}
              {profileData?.userType === 'parent' && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Child's Name"
                    type="text"
                    name="childName"
                    value={profileData?.childName}
                    onChange={handleInputChange}
                    error={errors?.childName}
                    placeholder="Enter child's name"
                    disabled={!isEditing}
                    required
                  />
                  
                  <Input
                    label="Child's Age"
                    type="number"
                    name="childAge"
                    value={profileData?.childAge}
                    onChange={handleInputChange}
                    error={errors?.childAge}
                    placeholder="Age"
                    min="3"
                    max="12"
                    disabled={!isEditing}
                    required
                  />
                </div>
              )}

              {/* Bio Section */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bio {profileData?.userType === 'creator' && '(Channel Description)'}
                </label>
                <textarea
                  name="bio"
                  value={profileData?.bio}
                  onChange={handleInputChange}
                  placeholder={`Tell us about ${profileData?.userType === 'parent' ? 'your family' : 'yourself'}...`}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-muted disabled:opacity-60 resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="mt-8 pt-6 border-t border-border">
          <h3 className="font-heading font-semibold text-foreground mb-4">Account Activity</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Icon name="Calendar" size={24} className="text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-semibold text-foreground">March 2024</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Icon name="Eye" size={24} className="text-secondary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Videos Watched</p>
              <p className="font-semibold text-foreground">
                {profileData?.userType === 'parent' ? '127' : profileData?.userType === 'creator' ? '1,234' : '89'}
              </p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Icon name="Heart" size={24} className="text-accent mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {profileData?.userType === 'creator' ? 'Total Likes' : 'Favorites'}
              </p>
              <p className="font-semibold text-foreground">
                {profileData?.userType === 'creator' ? '2,456' : '23'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;