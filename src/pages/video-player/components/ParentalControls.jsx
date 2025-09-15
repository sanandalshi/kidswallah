import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ParentalControls = ({ 
  videoData, 
  onReport, 
  onAddToFavorites, 
  onViewHistory, 
  onSetTimeLimit,
  isFavorite = false,
  watchTime = 0,
  isVisible = true 
}) => {
  const [showTimeLimit, setShowTimeLimit] = useState(false);
  const [timeLimit, setTimeLimit] = useState(30);
  const [showReportModal, setShowReportModal] = useState(false);

  const formatWatchTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const handleTimeLimit = () => {
    onSetTimeLimit?.(timeLimit);
    setShowTimeLimit(false);
  };

  const handleReport = (reason) => {
    onReport?.(reason);
    setShowReportModal(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Controls Panel */}
      <div className="fixed top-20 right-4 z-200 bg-card border border-border rounded-xl shadow-soft-lg p-4 w-64">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground text-sm flex items-center space-x-2">
            <Icon name="Shield" size={16} />
            <span>Parental Controls</span>
          </h3>
        </div>

        {/* Watch Time Display */}
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-caption text-muted-foreground">Watch Time Today</span>
            <span className="text-sm font-mono text-foreground font-medium">
              {formatWatchTime(watchTime)}
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-success to-warning h-2 rounded-full transition-all"
              style={{ width: `${Math.min((watchTime / 120) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Recommended: 2 hours daily
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Button
            variant={isFavorite ? 'default' : 'outline'}
            size="sm"
            fullWidth
            onClick={onAddToFavorites}
            iconName={isFavorite ? 'Heart' : 'Heart'}
            iconPosition="left"
            className="justify-start animate-hover-lift"
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => setShowTimeLimit(!showTimeLimit)}
            iconName="Clock"
            iconPosition="left"
            className="justify-start animate-hover-lift"
          >
            Set Time Limit
          </Button>

          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={onViewHistory}
            iconName="History"
            iconPosition="left"
            className="justify-start animate-hover-lift"
          >
            View Watch History
          </Button>

          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => setShowReportModal(true)}
            iconName="Flag"
            iconPosition="left"
            className="justify-start animate-hover-lift text-warning hover:text-warning"
          >
            Report Content
          </Button>
        </div>

        {/* Time Limit Setter */}
        {showTimeLimit && (
          <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
            <h4 className="font-caption font-medium text-accent text-sm mb-2">
              Set Viewing Time Limit
            </h4>
            <div className="flex items-center space-x-2 mb-3">
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e?.target?.value))}
                className="flex-1 accent-accent"
              />
              <span className="text-sm font-mono text-foreground w-12">
                {timeLimit}m
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="xs"
                onClick={handleTimeLimit}
                className="flex-1"
              >
                Set Limit
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setShowTimeLimit(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Safety Information */}
        <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} color="var(--color-success)" className="mt-0.5" />
            <div>
              <h4 className="font-caption font-medium text-success text-xs mb-1">
                Content Safety
              </h4>
              <p className="text-xs text-muted-foreground">
                This video has been reviewed and approved for ages {videoData?.ageGroup}.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
          <div className="bg-card border border-border rounded-2xl shadow-soft-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">
                Report Content
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReportModal(false)}
                className="animate-hover-lift"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Help us keep KidsVidHub safe. Why are you reporting this video?
            </p>

            <div className="space-y-2">
              {[
                'Inappropriate content for age group',
                'Violent or scary content',
                'Inappropriate language',
                'Misleading or false information',
                'Copyright violation',
                'Other safety concern'
              ]?.map((reason) => (
                <Button
                  key={reason}
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => handleReport(reason)}
                  className="justify-start text-left animate-hover-lift"
                >
                  {reason}
                </Button>
              ))}
            </div>

            <div className="mt-6 flex space-x-3">
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={() => setShowReportModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ParentalControls;