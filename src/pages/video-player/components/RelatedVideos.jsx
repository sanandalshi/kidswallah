import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RelatedVideos = ({ videos = [], currentVideoId, ageGroup }) => {
  const navigate = useNavigate();

  const handleVideoSelect = (videoId) => {
    navigate(`/video-player?id=${videoId}`);
  };

  const handleBrowseMore = () => {
    navigate('/video-browse');
  };

  const filteredVideos = videos?.filter(video => 
    video?.id !== currentVideoId && 
    (ageGroup ? video?.ageGroup === ageGroup : true)
  );

  const ageGroupColors = {
    '3-5': 'bg-green-100 text-green-800',
    '6-8': 'bg-blue-100 text-blue-800',
    '9-12': 'bg-purple-100 text-purple-800'
  };

  return (
    <div className="bg-card border border-border rounded-2xl shadow-soft-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-foreground flex items-center space-x-2">
            <Icon name="PlayCircle" size={20} />
            <span>More Safe Videos</span>
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBrowseMore}
            iconName="Grid3X3"
            iconPosition="left"
            className="text-primary hover:bg-primary/10"
          >
            Browse All
          </Button>
        </div>
        {ageGroup && (
          <p className="text-sm text-muted-foreground mt-1">
            Showing videos for ages {ageGroup}
          </p>
        )}
      </div>
      {/* Videos List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredVideos?.length > 0 ? (
          <div className="divide-y divide-border">
            {filteredVideos?.map((video) => (
              <div
                key={video?.id}
                className="p-4 hover:bg-muted/50 cursor-pointer transition-all animate-hover-lift"
                onClick={() => handleVideoSelect(video?.id)}
              >
                <div className="flex space-x-3">
                  {/* Thumbnail */}
                  <div className="relative flex-shrink-0">
                    <Image
                      src={video?.thumbnail}
                      alt={video?.title}
                      className="w-24 h-16 md:w-28 md:h-20 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
                      {video?.duration}
                    </div>
                    <div className="absolute top-1 left-1">
                      <div className="w-6 h-6 bg-success/90 rounded-full flex items-center justify-center">
                        <Icon name="Shield" size={12} color="white" />
                      </div>
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-caption font-medium text-sm text-foreground line-clamp-2 mb-1">
                      {video?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                      {video?.creator}
                    </p>
                    
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-caption ${
                        ageGroupColors?.[video?.ageGroup] || 'bg-gray-100 text-gray-800'
                      }`}>
                        Ages {video?.ageGroup}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-caption">
                        {video?.category}
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={12} />
                        <span>{video?.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={12} />
                        <span>{video?.likes}</span>
                      </div>
                    </div>
                  </div>

                  {/* Play Button */}
                  <div className="flex-shrink-0 flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-primary hover:bg-primary/10 rounded-full"
                    >
                      <Icon name="Play" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="Video" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="font-heading font-medium text-foreground mb-2">
              No related videos found
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Explore more safe content for your age group
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBrowseMore}
              iconName="Search"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Browse Videos
            </Button>
          </div>
        )}
      </div>
      {/* Footer */}
      {filteredVideos?.length > 0 && (
        <div className="p-4 border-t border-border bg-muted/20">
          <Button
            variant="outline"
            fullWidth
            onClick={handleBrowseMore}
            iconName="ArrowRight"
            iconPosition="right"
            className="animate-hover-lift"
          >
            View All Safe Videos
          </Button>
        </div>
      )}
    </div>
  );
};

export default RelatedVideos;