import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VideoCard = ({ video, onVideoSelect }) => {
  const navigate = useNavigate();

  const handleVideoClick = () => {
    navigate(`/video-player?id=${video?.id}`);
    onVideoSelect?.(video);
  };

  const getAgeGroupColor = (ageGroup) => {
    if (ageGroup?.includes('3-5')) return 'bg-green-100 text-green-700 border-green-200';
    if (ageGroup?.includes('6-8')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (ageGroup?.includes('9-12')) return 'bg-purple-100 text-purple-700 border-purple-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'educational': return 'BookOpen';
      case 'entertainment': return 'Smile';
      case 'music': return 'Music';
      case 'science': return 'Microscope';
      case 'art': return 'Palette';
      default: return 'Play';
    }
  };

  return (
    <div className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden animate-hover-lift cursor-pointer transition-all duration-200 hover:shadow-soft-lg">
      <div className="relative" onClick={handleVideoClick}>
        <div className="aspect-video overflow-hidden">
          <Image
            src={video?.thumbnail}
            alt={video?.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-mono">
          {video?.duration}
        </div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black/20">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-soft-xl animate-gentle-bounce">
            <Icon name="Play" size={24} color="white" />
          </div>
        </div>
        
        {/* Safety Badge */}
        {video?.isVerified && (
          <div className="absolute top-2 left-2 bg-success text-white px-2 py-1 rounded-lg text-xs flex items-center space-x-1">
            <Icon name="Shield" size={12} />
            <span>Safe</span>
          </div>
        )}
      </div>
      <div className="p-4">
        {/* Title */}
        <h3 className="font-heading font-semibold text-foreground text-lg mb-2 line-clamp-2 leading-tight">
          {video?.title}
        </h3>
        
        {/* Creator Info */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <Icon name="User" size={16} color="white" />
          </div>
          <div>
            <p className="font-caption text-sm text-foreground font-medium">{video?.creator}</p>
            <p className="text-xs text-muted-foreground">{video?.views} views</p>
          </div>
        </div>
        
        {/* Tags and Badges */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getAgeGroupColor(video?.ageGroup)}`}>
              Ages {video?.ageGroup}
            </span>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name={getCategoryIcon(video?.category)} size={14} />
              <span className="text-xs font-caption">{video?.category}</span>
            </div>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={i < Math.floor(video?.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              {video?.rating} ({video?.reviewCount})
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="Heart"
            className="text-muted-foreground hover:text-error animate-press"
          />
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
          <Button
            variant="default"
            size="sm"
            onClick={handleVideoClick}
            iconName="Play"
            iconPosition="left"
            className="flex-1 animate-hover-lift"
          >
            Watch Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            className="animate-hover-lift"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;