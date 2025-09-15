import React from 'react';
import VideoCard from './VideoCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoGrid = ({ 
  videos = [], 
  isLoading = false, 
  hasMore = true, 
  onLoadMore, 
  onVideoSelect 
}) => {
  if (isLoading && videos?.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)]?.map((_, index) => (
          <div key={index} className="bg-card rounded-2xl shadow-soft border border-border overflow-hidden animate-pulse">
            <div className="aspect-video bg-muted"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="flex space-x-2">
                <div className="h-6 bg-muted rounded w-16"></div>
                <div className="h-6 bg-muted rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (videos?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Search" size={48} className="text-primary" />
        </div>
        <h3 className="font-heading font-bold text-fluid-xl text-foreground mb-2">
          No Videos Found
        </h3>
        <p className="text-muted-foreground font-caption max-w-md mx-auto mb-6">
          We couldn't find any safe videos matching your search. Try adjusting your filters or search terms.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="default"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() => window.location?.reload()}
          >
            Reset Filters
          </Button>
          <Button
            variant="outline"
            iconName="Plus"
            iconPosition="left"
          >
            Suggest Content
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos?.map((video) => (
          <VideoCard
            key={video?.id}
            video={video}
            onVideoSelect={onVideoSelect}
          />
        ))}
      </div>
      {/* Load More Section */}
      {hasMore && (
        <div className="text-center py-8">
          {isLoading ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-spin">
                <Icon name="Loader2" size={24} color="white" />
              </div>
              <p className="font-caption text-muted-foreground">Loading more safe videos...</p>
            </div>
          ) : (
            <Button
              variant="outline"
              size="lg"
              onClick={onLoadMore}
              iconName="ChevronDown"
              iconPosition="right"
              className="animate-hover-lift"
            >
              Load More Videos
            </Button>
          )}
        </div>
      )}
      {/* End of Results */}
      {!hasMore && videos?.length > 0 && (
        <div className="text-center py-8 border-t border-border">
          <div className="w-16 h-16 bg-gradient-to-br from-success/20 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h4 className="font-heading font-semibold text-foreground mb-2">
            You've seen all the videos!
          </h4>
          <p className="text-muted-foreground font-caption">
            Check back later for new safe content, or try different search terms.
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;