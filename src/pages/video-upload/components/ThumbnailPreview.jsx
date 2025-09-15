import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ThumbnailPreview = ({ videoFile, thumbnailTime, onThumbnailTimeChange }) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [customThumbnail, setCustomThumbnail] = useState(null);

  // Mock thumbnail options - in real app, these would be generated from video
  const thumbnailOptions = [
    {
      id: 0,
      time: 5,
      url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop',
      label: '5 seconds'
    },
    {
      id: 1,
      time: 15,
      url: 'https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?w=300&h=200&fit=crop',
      label: '15 seconds'
    },
    {
      id: 2,
      time: 30,
      url: 'https://images.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg?w=300&h=200&fit=crop',
      label: '30 seconds'
    }
  ];

  const handleThumbnailSelect = (thumbnailId) => {
    setSelectedThumbnail(thumbnailId);
    const selected = thumbnailOptions?.find(t => t?.id === thumbnailId);
    if (selected) {
      onThumbnailTimeChange(selected?.time);
    }
  };

  const handleCustomThumbnailUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file && file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomThumbnail(e?.target?.result);
        setSelectedThumbnail('custom');
      };
      reader?.readAsDataURL(file);
    }
  };

  if (!videoFile) {
    return (
      <div className="bg-card border border-border rounded-2xl shadow-soft-lg p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="Image" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="font-heading font-semibold text-foreground mb-2">No Video Selected</h3>
          <p className="text-muted-foreground font-caption text-sm">
            Upload a video first to generate thumbnail options
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl shadow-soft-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center shadow-soft">
            <Icon name="Image" size={20} color="white" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-fluid-lg text-foreground">Choose Thumbnail</h2>
            <p className="font-caption text-sm text-muted-foreground">Select an attractive preview image</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Auto-generated Thumbnails */}
        <div>
          <h3 className="font-heading font-semibold text-foreground mb-4">Auto-generated Options</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {thumbnailOptions?.map((thumbnail) => (
              <div
                key={thumbnail?.id}
                className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all animate-hover-lift ${
                  selectedThumbnail === thumbnail?.id
                    ? 'border-primary shadow-soft-lg scale-105'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleThumbnailSelect(thumbnail?.id)}
              >
                <Image
                  src={thumbnail?.url}
                  alt={`Thumbnail at ${thumbnail?.label}`}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-caption">
                    {thumbnail?.label}
                  </div>
                </div>
                {selectedThumbnail === thumbnail?.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} color="white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Custom Thumbnail Upload */}
        <div className="pt-4 border-t border-border">
          <h3 className="font-heading font-semibold text-foreground mb-4">Custom Thumbnail</h3>
          
          {customThumbnail ? (
            <div className="flex items-start space-x-4">
              <div
                className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all animate-hover-lift ${
                  selectedThumbnail === 'custom' ?'border-primary shadow-soft-lg' :'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedThumbnail('custom')}
              >
                <Image
                  src={customThumbnail}
                  alt="Custom thumbnail"
                  className="w-32 h-24 object-cover"
                />
                {selectedThumbnail === 'custom' && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} color="white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-foreground font-caption mb-2">Custom thumbnail uploaded</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Upload"
                    iconPosition="left"
                    onClick={() => document.getElementById('custom-thumbnail')?.click()}
                  >
                    Replace
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Trash2"
                    iconPosition="left"
                    onClick={() => {
                      setCustomThumbnail(null);
                      setSelectedThumbnail(0);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
              <input
                id="custom-thumbnail"
                type="file"
                accept="image/*"
                onChange={handleCustomThumbnailUpload}
                className="hidden"
              />
              <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon name="ImagePlus" size={24} className="text-muted-foreground" />
              </div>
              <h4 className="font-heading font-medium text-foreground mb-2">Upload Custom Image</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Choose your own thumbnail image (JPG, PNG, max 2MB)
              </p>
              <Button
                variant="outline"
                size="sm"
                iconName="Upload"
                iconPosition="left"
                onClick={() => document.getElementById('custom-thumbnail')?.click()}
              >
                Select Image
              </Button>
            </div>
          )}
        </div>

        {/* Thumbnail Guidelines */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} color="var(--color-primary)" className="mt-0.5" />
            <div>
              <h4 className="font-caption font-medium text-primary text-sm">Thumbnail Tips</h4>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>• Choose bright, colorful images that appeal to children</li>
                <li>• Avoid text overlays or complex graphics</li>
                <li>• Show the main subject or activity clearly</li>
                <li>• Ensure the image represents the video content accurately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailPreview;