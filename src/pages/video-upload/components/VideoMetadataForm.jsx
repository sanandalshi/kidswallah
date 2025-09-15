import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VideoMetadataForm = ({ onSubmit, isSubmitting, selectedFile }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ageGroup: '',
    category: '',
    tags: '',
    isEducational: false,
    contentRating: '',
    thumbnailTime: 5
  });
  const [errors, setErrors] = useState({});

  const ageGroupOptions = [
    { value: '3-5', label: '3-5 years (Preschool)' },
    { value: '6-8', label: '6-8 years (Early Elementary)' },
    { value: '9-12', label: '9-12 years (Elementary)' }
  ];

  const categoryOptions = [
    { value: 'educational', label: 'Educational' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'music', label: 'Music & Songs' },
    { value: 'stories', label: 'Stories & Tales' },
    { value: 'science', label: 'Science & Nature' },
    { value: 'arts', label: 'Arts & Crafts' }
  ];

  const contentRatingOptions = [
    { value: 'safe', label: 'Safe for All Ages' },
    { value: 'supervised', label: 'Parental Supervision Recommended' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) {
      newErrors.title = 'Video title is required';
    } else if (formData?.title?.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }
    
    if (!formData?.description?.trim()) {
      newErrors.description = 'Video description is required';
    } else if (formData?.description?.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }
    
    if (!formData?.ageGroup) {
      newErrors.ageGroup = 'Please select an age group';
    }
    
    if (!formData?.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData?.contentRating) {
      newErrors.contentRating = 'Please confirm content rating';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit(formData);
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-soft-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-xl flex items-center justify-center shadow-soft">
            <Icon name="FileText" size={20} color="white" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-fluid-lg text-foreground">Video Details</h2>
            <p className="font-caption text-sm text-muted-foreground">Add information about your video content</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <Input
              label="Video Title"
              type="text"
              name="title"
              value={formData?.title}
              onChange={handleInputChange}
              error={errors?.title}
              placeholder="Enter a descriptive title for your video"
              required
              maxLength={100}
              description="Make it engaging and child-friendly"
            />
          </div>
          
          <div className="md:col-span-2">
            <Input
              label="Video Description"
              type="text"
              name="description"
              value={formData?.description}
              onChange={handleInputChange}
              error={errors?.description}
              placeholder="Describe what children will learn or enjoy in this video..."
              required
              maxLength={500}
              description="Explain the educational value and content"
            />
          </div>
          
          <Select
            label="Age Group"
            options={ageGroupOptions}
            value={formData?.ageGroup}
            onChange={(value) => handleSelectChange('ageGroup', value)}
            error={errors?.ageGroup}
            placeholder="Select target age group"
            required
            description="Choose the most appropriate age range"
          />
          
          <Select
            label="Category"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleSelectChange('category', value)}
            error={errors?.category}
            placeholder="Select video category"
            required
            description="Help parents find relevant content"
          />
          
          <div className="md:col-span-2">
            <Input
              label="Tags"
              type="text"
              name="tags"
              value={formData?.tags}
              onChange={handleInputChange}
              placeholder="learning, fun, colors, numbers (separate with commas)"
              description="Add keywords to help with discovery"
            />
          </div>
          
          <Select
            label="Content Rating"
            options={contentRatingOptions}
            value={formData?.contentRating}
            onChange={(value) => handleSelectChange('contentRating', value)}
            error={errors?.contentRating}
            placeholder="Confirm content safety"
            required
            description="Verify your content meets safety standards"
          />
          
          <div className="flex items-center space-x-3">
            <Input
              label="Thumbnail Time (seconds)"
              type="number"
              name="thumbnailTime"
              value={formData?.thumbnailTime}
              onChange={handleInputChange}
              min={1}
              max={60}
              description="Choose when to capture thumbnail"
            />
          </div>
        </div>
        
        <div className="pt-4 border-t border-border">
          <Checkbox
            label="This is educational content"
            checked={formData?.isEducational}
            onChange={(e) => setFormData(prev => ({ ...prev, isEducational: e?.target?.checked }))}
            description="Check if this video has educational value"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            iconName="Save"
            iconPosition="left"
            className="animate-hover-lift"
            disabled={isSubmitting}
          >
            Save as Draft
          </Button>
          
          <Button
            type="submit"
            variant="default"
            iconName="Upload"
            iconPosition="left"
            loading={isSubmitting}
            disabled={!selectedFile}
            className="animate-hover-lift"
          >
            {isSubmitting ? 'Publishing Video...' : 'Publish Video'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VideoMetadataForm;