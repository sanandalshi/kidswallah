import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const VideoControls = ({ 
  isPlaying, 
  onPlayPause, 
  currentTime, 
  duration, 
  onSeek, 
  volume, 
  onVolumeChange,
  onFullscreen,
  isFullscreen,
  showControls = true 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const pos = (e?.clientX - rect?.left) / rect?.width;
    onSeek(pos * duration);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return 'VolumeX';
    if (volume < 0.5) return 'Volume1';
    return 'Volume2';
  };

  if (!showControls) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-6">
      {/* Progress Bar */}
      <div className="mb-4">
        <div
          className="w-full h-3 md:h-4 bg-white/20 rounded-full cursor-pointer relative group"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 relative"
            style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
          >
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-soft-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex justify-between mt-2 text-white text-sm md:text-base font-mono">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      {/* Control Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Play/Pause Button */}
          <Button
            variant="ghost"
            size="lg"
            onClick={onPlayPause}
            className="text-white hover:bg-white/20 w-12 h-12 md:w-14 md:h-14 rounded-full animate-hover-lift"
          >
            <Icon name={isPlaying ? 'Pause' : 'Play'} size={28} />
          </Button>

          {/* Volume Control */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onVolumeChange(volume === 0 ? 1 : 0)}
              className="text-white hover:bg-white/20 w-10 h-10 md:w-12 md:h-12 rounded-full"
            >
              <Icon name={getVolumeIcon()} size={20} />
            </Button>
            <div className="hidden md:flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e?.target?.value))}
                className="w-20 accent-primary bg-white/20 rounded-full"
              />
              <span className="text-white text-sm font-mono w-8">
                {Math.round(volume * 100)}
              </span>
            </div>
          </div>

          {/* Time Display */}
          <div className="hidden sm:block text-white font-mono text-sm md:text-base">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Fullscreen Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onFullscreen}
            className="text-white hover:bg-white/20 w-10 h-10 md:w-12 md:h-12 rounded-full"
          >
            <Icon name={isFullscreen ? 'Minimize' : 'Maximize'} size={20} />
          </Button>
        </div>
      </div>
      {/* Child-Friendly Visual Indicators */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <div className="bg-success/90 text-white px-3 py-1 rounded-full text-xs font-caption flex items-center space-x-1">
          <Icon name="Shield" size={14} />
          <span>Safe Content</span>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;