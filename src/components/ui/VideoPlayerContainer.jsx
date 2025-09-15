import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';
import Image from '../AppImage';

const VideoPlayerContainer = ({ 
  videoData = {
    id: '1',
    title: 'Fun Learning Adventure',
    duration: '5:32',
    ageGroup: '6-8',
    category: 'Educational',
    creator: 'Learning Fun Channel',
    thumbnail: '/assets/images/video-thumb.jpg',
    videoUrl: '/assets/videos/sample.mp4'
  },
  onClose,
  relatedVideos = []
}) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleLoadedData = () => {
      setDuration(video?.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video?.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video?.addEventListener('loadeddata', handleLoadedData);
    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('play', handlePlay);
    video?.addEventListener('pause', handlePause);

    return () => {
      video?.removeEventListener('loadeddata', handleLoadedData);
      video?.removeEventListener('timeupdate', handleTimeUpdate);
      video?.removeEventListener('play', handlePlay);
      video?.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef?.current;
    if (video?.paused) {
      video?.play();
    } else {
      video?.pause();
    }
  };

  const handleSeek = (e) => {
    const video = videoRef?.current;
    const rect = e?.currentTarget?.getBoundingClientRect();
    const pos = (e?.clientX - rect?.left) / rect?.width;
    video.currentTime = pos * duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const toggleFullscreen = () => {
    const container = videoRef?.current?.parentElement;
    if (!document.fullscreenElement) {
      container?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const handleVideoSelect = (video) => {
    navigate(`/video-player?id=${video?.id}`);
  };

  const handleBackToBrowse = () => {
    navigate('/video-browse');
  };

  return (
    <div className="fixed inset-0 bg-background z-300">
      {/* Header Navigation */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToBrowse}
              className="animate-hover-lift"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="font-heading font-bold text-fluid-lg text-foreground truncate max-w-md">
                {videoData?.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="font-caption">{videoData?.creator}</span>
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{videoData?.duration}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Users" size={14} />
                  <span>Ages {videoData?.ageGroup}</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Heart"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Like
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Share
            </Button>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="animate-hover-lift"
              >
                <Icon name="X" size={20} />
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col bg-black">
          <div className="flex-1 relative group">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-white text-center">
                  <Icon name="Loader2" size={48} className="animate-spin mx-auto mb-4" />
                  <p className="font-caption">Loading safe video content...</p>
                </div>
              </div>
            )}
            
            <video
              ref={videoRef}
              className="w-full h-full object-contain"
              poster={videoData?.thumbnail}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              <source src={videoData?.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls */}
            {showControls && !isLoading && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* Progress Bar */}
                <div
                  className="w-full h-2 bg-white/20 rounded-full cursor-pointer mb-4"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={togglePlay}
                      className="text-white hover:bg-white/20"
                    >
                      <Icon name={isPlaying ? 'Pause' : 'Play'} size={24} />
                    </Button>
                    
                    <div className="flex items-center space-x-2">
                      <Icon name="Volume2" size={20} className="text-white" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 accent-primary"
                      />
                    </div>
                    
                    <span className="text-white font-mono text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name={isFullscreen ? 'Minimize' : 'Maximize'} size={20} />
                  </Button>
                </div>
              </div>
            )}

            {/* Play Button Overlay */}
            {!isPlaying && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="default"
                  size="lg"
                  onClick={togglePlay}
                  className="w-20 h-20 rounded-full shadow-soft-xl animate-gentle-bounce"
                >
                  <Icon name="Play" size={32} />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Related Videos */}
        <div className="w-80 bg-card border-l border-border overflow-y-auto">
          <div className="p-4">
            <h3 className="font-heading font-semibold text-foreground mb-4">
              More Safe Videos
            </h3>
            
            <div className="space-y-3">
              {relatedVideos?.length > 0 ? relatedVideos?.map((video) => (
                <div
                  key={video?.id}
                  className="flex space-x-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors animate-hover-lift"
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      src={video?.thumbnail}
                      alt={video?.title}
                      className="w-20 h-14 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                      {video?.duration}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-caption font-medium text-sm text-foreground line-clamp-2 mb-1">
                      {video?.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{video?.creator}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                      <span>Ages {video?.ageGroup}</span>
                      <span>•</span>
                      <span>{video?.category}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <Icon name="Video" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground font-caption">
                    No related videos available
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackToBrowse}
                    className="mt-4"
                  >
                    Browse More Videos
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Safety Notice */}
      <div className="absolute top-20 left-4 bg-success/90 text-white px-3 py-2 rounded-lg shadow-soft-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} />
          <span className="text-xs font-caption">Safe Content Verified</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerContainer;