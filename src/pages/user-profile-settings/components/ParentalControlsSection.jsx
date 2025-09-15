import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ParentalControlsSection = ({ userProfile }) => {
  const [controls, setControls] = useState({
    ageFilter: userProfile?.ageFilter || '6-8',
    screenTimeLimit: userProfile?.screenTimeLimit || 60,
    allowedCategories: userProfile?.allowedCategories || ['educational', 'music', 'stories'],
    blockedKeywords: userProfile?.blockedKeywords || [],
    approvedCreators: userProfile?.approvedCreators || [],
    requireApprovalForNew: userProfile?.requireApprovalForNew || true,
    enableSafeSearch: userProfile?.enableSafeSearch || true,
    allowComments: userProfile?.allowComments || false,
    allowSharing: userProfile?.allowSharing || false,
    bedtimeMode: userProfile?.bedtimeMode || { enabled: false, start: '20:00', end: '07:00' }
  });
  
  const [newKeyword, setNewKeyword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleControlChange = (setting, value) => {
    setControls(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleCategoryToggle = (category) => {
    setControls(prev => ({
      ...prev,
      allowedCategories: prev?.allowedCategories?.includes(category)
        ? prev?.allowedCategories?.filter(c => c !== category)
        : [...prev?.allowedCategories, category]
    }));
  };

  const addBlockedKeyword = () => {
    if (newKeyword?.trim() && !controls?.blockedKeywords?.includes(newKeyword?.trim())) {
      setControls(prev => ({
        ...prev,
        blockedKeywords: [...prev?.blockedKeywords, newKeyword?.trim()]
      }));
      setNewKeyword('');
    }
  };

  const removeBlockedKeyword = (keyword) => {
    setControls(prev => ({
      ...prev,
      blockedKeywords: prev?.blockedKeywords?.filter(k => k !== keyword)
    }));
  };

  const handleSaveControls = async () => {
    setIsSaving(true);
    try {
      // Mock save operation
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Parental controls updated successfully!');
    } catch (error) {
      alert('Failed to save controls. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const ageGroups = [
    { value: '3-5', label: 'Toddlers (3-5)', description: 'Simple songs, basic learning' },
    { value: '6-8', label: 'Early Elementary (6-8)', description: 'Educational content, stories' },
    { value: '9-12', label: 'Late Elementary (9-12)', description: 'Advanced learning, science' }
  ];

  const categories = [
    { id: 'educational', label: 'Educational', icon: 'GraduationCap', color: 'text-primary' },
    { id: 'music', label: 'Music & Songs', icon: 'Music', color: 'text-secondary' },
    { id: 'stories', label: 'Stories & Tales', icon: 'Book', color: 'text-accent' },
    { id: 'science', label: 'Science & Nature', icon: 'Microscope', color: 'text-success' },
    { id: 'arts', label: 'Arts & Crafts', icon: 'Palette', color: 'text-warning' },
    { id: 'sports', label: 'Sports & Activity', icon: 'Zap', color: 'text-error' }
  ];

  const approvedCreators = [
    { id: 1, name: 'Learning Fun Channel', subscribers: '2.5M', verified: true },
    { id: 2, name: 'Kids Science Lab', subscribers: '1.8M', verified: true },
    { id: 3, name: 'Story Time Adventures', subscribers: '3.2M', verified: true },
    { id: 4, name: 'Music for Little Ones', subscribers: '1.5M', verified: true }
  ];

  return (
    <div className="space-y-6">
      {/* Age & Content Filtering */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-success/5 to-primary/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-success to-primary rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Shield" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">Content Filtering</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Control what content your child can access
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Age Group Selection */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Age Group</h4>
            <div className="space-y-3">
              {ageGroups?.map((group) => (
                <label
                  key={group?.value}
                  className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    controls?.ageFilter === group?.value
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="ageFilter"
                    value={group?.value}
                    checked={controls?.ageFilter === group?.value}
                    onChange={(e) => handleControlChange('ageFilter', e?.target?.value)}
                    className="mt-1"
                  />
                  <div>
                    <h5 className="font-medium text-foreground">{group?.label}</h5>
                    <p className="text-sm text-muted-foreground">{group?.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Content Categories */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Allowed Categories</h4>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categories?.map((category) => (
                <label
                  key={category?.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    controls?.allowedCategories?.includes(category?.id)
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={controls?.allowedCategories?.includes(category?.id)}
                    onChange={() => handleCategoryToggle(category?.id)}
                  />
                  <Icon name={category?.icon} size={20} className={category?.color} />
                  <span className="font-medium text-foreground">{category?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Safety Options */}
          <div className="space-y-4">
            <Checkbox
              label="Enable Safe Search"
              description="Filter out potentially inappropriate content"
              checked={controls?.enableSafeSearch}
              onChange={(e) => handleControlChange('enableSafeSearch', e?.target?.checked)}
            />
            
            <Checkbox
              label="Require Approval for New Content"
              description="New videos must be approved before viewing"
              checked={controls?.requireApprovalForNew}
              onChange={(e) => handleControlChange('requireApprovalForNew', e?.target?.checked)}
            />
            
            <Checkbox
              label="Allow Comments"
              description="Let your child read and write comments"
              checked={controls?.allowComments}
              onChange={(e) => handleControlChange('allowComments', e?.target?.checked)}
            />
            
            <Checkbox
              label="Allow Sharing"
              description="Let your child share videos with others"
              checked={controls?.allowSharing}
              onChange={(e) => handleControlChange('allowSharing', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Screen Time Management */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-warning/5 to-accent/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-warning to-accent rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Clock" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">Screen Time Management</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Set healthy viewing limits for your child
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Daily Time Limit */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Daily Screen Time Limit (minutes)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="15"
                max="180"
                step="15"
                value={controls?.screenTimeLimit}
                onChange={(e) => handleControlChange('screenTimeLimit', parseInt(e?.target?.value))}
                className="flex-1 accent-primary"
              />
              <div className="w-20 text-center">
                <span className="text-lg font-semibold text-primary">{controls?.screenTimeLimit}</span>
                <span className="text-sm text-muted-foreground block">minutes</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>15 min</span>
              <span>3 hours</span>
            </div>
          </div>

          {/* Bedtime Mode */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium text-foreground">Bedtime Mode</h4>
                <p className="text-sm text-muted-foreground">Restrict access during sleep hours</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={controls?.bedtimeMode?.enabled}
                  onChange={(e) => handleControlChange('bedtimeMode', {
                    ...controls?.bedtimeMode,
                    enabled: e?.target?.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            {controls?.bedtimeMode?.enabled && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Bedtime Start"
                  type="time"
                  value={controls?.bedtimeMode?.start}
                  onChange={(e) => handleControlChange('bedtimeMode', {
                    ...controls?.bedtimeMode,
                    start: e?.target?.value
                  })}
                />
                
                <Input
                  label="Wake Up Time"
                  type="time"
                  value={controls?.bedtimeMode?.end}
                  onChange={(e) => handleControlChange('bedtimeMode', {
                    ...controls?.bedtimeMode,
                    end: e?.target?.value
                  })}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Blocked Keywords */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-error/5 to-warning/5 p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-error to-warning rounded-xl flex items-center justify-center shadow-soft">
              <Icon name="Ban" size={24} color="white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-fluid-lg text-foreground">Blocked Keywords</h3>
              <p className="font-caption text-sm text-muted-foreground">
                Block content containing specific words or phrases
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Enter keyword to block"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e?.target?.value)}
              onKeyPress={(e) => e?.key === 'Enter' && addBlockedKeyword()}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={addBlockedKeyword}
              iconName="Plus"
              iconPosition="left"
            >
              Add
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {controls?.blockedKeywords?.map((keyword, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-error/10 text-error border border-error/20"
              >
                {keyword}
                <button
                  onClick={() => removeBlockedKeyword(keyword)}
                  className="ml-2 hover:text-error/80"
                >
                  <Icon name="X" size={14} />
                </button>
              </span>
            ))}
            {controls?.blockedKeywords?.length === 0 && (
              <p className="text-muted-foreground text-sm">No blocked keywords yet</p>
            )}
          </div>
        </div>
      </div>
      {/* Approved Creators */}
      <div className="bg-card rounded-2xl shadow-soft-lg border border-border overflow-hidden">
        <div className="bg-gradient-to-r from-secondary/5 to-success/5 p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-success rounded-xl flex items-center justify-center shadow-soft">
                <Icon name="UserCheck" size={24} color="white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-fluid-lg text-foreground">Approved Creators</h3>
                <p className="font-caption text-sm text-muted-foreground">
                  Trusted content creators for your child
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Add Creator
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {approvedCreators?.map((creator) => (
              <div key={creator?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground">{creator?.name}</h4>
                      {creator?.verified && (
                        <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{creator?.subscribers} subscribers</p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  className="text-error hover:bg-error/10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="success"
          onClick={handleSaveControls}
          loading={isSaving}
          iconName="Shield"
          iconPosition="left"
          className="animate-hover-lift"
        >
          Save Parental Controls
        </Button>
      </div>
    </div>
  );
};

export default ParentalControlsSection;