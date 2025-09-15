import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VideoInfo = ({ videoData, onLike, onShare, onReport, isLiked = false }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const ageGroupColors = {
    '3-5': 'bg-green-100 text-green-800 border-green-200',
    '6-8': 'bg-blue-100 text-blue-800 border-blue-200',
    '9-12': 'bg-purple-100 text-purple-800 border-purple-200'
  };

  const categoryIcons = {
    'Educational': 'BookOpen',
    'Entertainment': 'Smile',
    'Music': 'Music',
    'Stories': 'Book',
    'Science': 'Microscope',
    'Art': 'Palette'
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-soft-lg p-6">
      {/* Video Title and Creator */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h1 className="font-heading font-bold text-fluid-xl text-foreground mb-2 line-clamp-2">
            {videoData?.title}
          </h1>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Image
                src={videoData?.creatorAvatar}
                alt={videoData?.creator}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-caption font-medium">{videoData?.creator}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span className="text-sm">Sep 15, 2025</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant={isLiked ? 'default' : 'outline'}
            size="sm"
            onClick={onLike}
            iconName="Heart"
            iconPosition="left"
            className="animate-hover-lift"
          >
            {isLiked ? 'Liked' : 'Like'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            iconName="Share"
            iconPosition="left"
            className="animate-hover-lift"
          >
            Share
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onReport}
            className="text-muted-foreground hover:text-warning animate-hover-lift"
            title="Report content"
          >
            <Icon name="Flag" size={16} />
          </Button>
        </div>
      </div>
      {/* Video Stats and Badges */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Age Group Badge */}
        <div className={`px-3 py-1 rounded-full border text-sm font-caption font-medium ${
          ageGroupColors?.[videoData?.ageGroup] || 'bg-gray-100 text-gray-800 border-gray-200'
        }`}>
          <Icon name="Users" size={14} className="inline mr-1" />
          Ages {videoData?.ageGroup}
        </div>

        {/* Category Badge */}
        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-caption font-medium">
          <Icon name={categoryIcons?.[videoData?.category] || 'Tag'} size={14} className="inline mr-1" />
          {videoData?.category}
        </div>

        {/* Duration */}
        <div className="flex items-center space-x-1 text-muted-foreground text-sm">
          <Icon name="Clock" size={14} />
          <span>{videoData?.duration}</span>
        </div>

        {/* Views */}
        <div className="flex items-center space-x-1 text-muted-foreground text-sm">
          <Icon name="Eye" size={14} />
          <span>{videoData?.views} views</span>
        </div>

        {/* Safety Badge */}
        <div className="px-3 py-1 rounded-full bg-success/10 text-success border border-success/20 text-sm font-caption font-medium">
          <Icon name="Shield" size={14} className="inline mr-1" />
          Parent Approved
        </div>
      </div>
      {/* Description */}
      <div className="border-t border-border pt-4">
        <h3 className="font-heading font-semibold text-foreground mb-2">About this video</h3>
        <div className="text-muted-foreground">
          <p className={`${showFullDescription ? '' : 'line-clamp-3'} text-sm leading-relaxed`}>
            {videoData?.description}
          </p>
          {videoData?.description && videoData?.description?.length > 150 && (
            <Button
              variant="link"
              size="sm"
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-2 p-0 h-auto font-caption"
            >
              {showFullDescription ? 'Show less' : 'Show more'}
            </Button>
          )}
        </div>

        {/* Tags */}
        {videoData?.tags && videoData?.tags?.length > 0 && (
          <div className="mt-4">
            <h4 className="font-caption font-medium text-foreground mb-2 text-sm">Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {videoData?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-caption"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Educational Value */}
      {videoData?.educationalValue && (
        <div className="mt-4 p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="GraduationCap" size={20} color="var(--color-secondary)" className="mt-0.5" />
            <div>
              <h4 className="font-caption font-medium text-secondary text-sm mb-1">
                Educational Benefits
              </h4>
              <p className="text-xs text-muted-foreground">
                {videoData?.educationalValue}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Parental Notes */}
      {videoData?.parentalNotes && (
        <div className="mt-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="MessageCircle" size={20} color="var(--color-accent)" className="mt-0.5" />
            <div>
              <h4 className="font-caption font-medium text-accent text-sm mb-1">
                Note for Parents
              </h4>
              <p className="text-xs text-muted-foreground">
                {videoData?.parentalNotes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoInfo;