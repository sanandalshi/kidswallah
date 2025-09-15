import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import VideoControls from './components/VideoControls';
import VideoInfo from './components/VideoInfo';
import RelatedVideos from './components/RelatedVideos';
import ParentalControls from './components/ParentalControls';
import ScreenTimePrompt from './components/ScreenTimePrompt';

const VideoPlayer = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const videoRef = useRef(null);
  
  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // User interaction state
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [watchTime, setWatchTime] = useState(45); // Mock watch time in minutes
  const [showScreenTimePrompt, setShowScreenTimePrompt] = useState(false);
  const [showParentalControls, setShowParentalControls] = useState(true);
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('parent');

  // Mock video data
  const videoData = {
    id: searchParams?.get('id') || '1',
    title: "Amazing Ocean Animals - Educational Adventure for Kids",
    description: `Join us on an incredible underwater journey to discover the most amazing ocean animals! This educational video is perfect for curious young minds who love marine life.\n\nIn this adventure, children will learn about:\n• Colorful tropical fish and their habitats\n• Gentle giants like whales and dolphins\n• Fascinating sea creatures like octopuses and seahorses\n• How ocean animals adapt to their environment\n• The importance of protecting our oceans\n\nThis video is designed to be both educational and entertaining, featuring beautiful underwater footage, fun facts, and engaging narration that will keep children interested while they learn about the wonders of marine life.`,
    creator: "Ocean Explorers Kids",
    creatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    duration: "8:45",
    ageGroup: "6-8",
    category: "Educational",
    views: "12.5K",
    likes: "1.2K",
    thumbnail: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=450&fit=crop",
    videoUrl: "/assets/videos/ocean-animals.mp4",
    tags: ["ocean", "animals", "educational", "marine-life", "nature", "learning"],
    educationalValue: "Develops knowledge about marine ecosystems, animal behavior, and environmental awareness. Enhances vocabulary with ocean-related terms and promotes curiosity about nature.",
    parentalNotes: "This video contains beautiful underwater scenes that may inspire questions about ocean conservation. Great opportunity to discuss environmental protection with your child."
  };

  // Mock related videos
  const relatedVideos = [
    {
      id: '2',
      title: "Jungle Safari Adventure - Meet Wild Animals",
      creator: "Safari Kids Channel",
      duration: "6:32",
      ageGroup: "6-8",
      category: "Educational",
      views: "8.9K",
      likes: "890",
      thumbnail: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=300&h=200&fit=crop"
    },
    {
      id: '3',
      title: "Fun with Numbers - Counting Games for Kids",
      creator: "Math Magic Kids",
      duration: "5:15",
      ageGroup: "6-8",
      category: "Educational",
      views: "15.2K",
      likes: "1.5K",
      thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&h=200&fit=crop"
    },
    {
      id: '4',
      title: "Space Adventure - Planets and Stars",
      creator: "Cosmic Kids Learning",
      duration: "7:20",
      ageGroup: "6-8",
      category: "Educational",
      views: "9.8K",
      likes: "1.1K",
      thumbnail: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=200&fit=crop"
    },
    {
      id: '5',
      title: "Healthy Eating Fun - Fruits and Vegetables",
      creator: "Healthy Kids Channel",
      duration: "4:45",
      ageGroup: "6-8",
      category: "Educational",
      views: "6.7K",
      likes: "720",
      thumbnail: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=200&fit=crop"
    }
  ];

  // Video player effects
  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleLoadedData = () => {
      setDuration(video?.duration || 525); // 8:45 in seconds
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video?.currentTime || 0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    // Mock video events since we don't have actual video file
    setTimeout(() => {
      setDuration(525); // 8:45 in seconds
      setIsLoading(false);
    }, 1500);

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

  // Screen time monitoring
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setWatchTime(prev => prev + 1);
        
        // Show screen time prompt every 30 minutes
        if (watchTime > 0 && watchTime % 30 === 0) {
          setShowScreenTimePrompt(true);
          setIsPlaying(false);
        }
      }, 60000); // Every minute

      return () => clearInterval(interval);
    }
  }, [isPlaying, watchTime]);

  // Auto-hide controls
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowControls(true);
    }
  }, [isPlaying, showControls]);

  // Video control handlers
  const handlePlayPause = () => {
    const video = videoRef?.current;
    if (video) {
      if (video?.paused) {
        video?.play();
      } else {
        video?.pause();
      }
    } else {
      // Mock play/pause for demo
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (time) => {
    const video = videoRef?.current;
    if (video) {
      video.currentTime = time;
    } else {
      // Mock seek for demo
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    const video = videoRef?.current;
    if (video) {
      video.volume = newVolume;
    }
  };

  const handleFullscreen = () => {
    const container = document.querySelector('.video-container');
    if (!document.fullscreenElement && container) {
      container?.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // User interaction handlers
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: videoData?.title,
        text: 'Check out this amazing educational video for kids!',
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      alert('Video link copied to clipboard!');
    }
  };

  const handleReport = (reason) => {
    alert(`Content reported for: ${reason}. Thank you for helping keep KidsVidHub safe!`);
  };

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
  };

  const handleViewHistory = () => {
    navigate('/user-profile-settings');
  };

  const handleSetTimeLimit = (limit) => {
    alert(`Time limit set to ${limit} minutes`);
  };

  // Screen time prompt handlers
  const handleContinueWatching = () => {
    setShowScreenTimePrompt(false);
    setIsPlaying(true);
  };

  const handleTakeBreak = () => {
    setShowScreenTimePrompt(false);
    alert('Great choice! Enjoy your break. The video will be here when you return.');
  };

  const handleFinishWatching = () => {
    setShowScreenTimePrompt(false);
    navigate('/video-browse');
  };

  const handleBackToBrowse = () => {
    navigate('/video-browse');
  };

  const handleAuthToggle = (authState) => {
    setIsAuthenticated(authState);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onAuthToggle={handleAuthToggle}
      />
      <div className="pt-16">
        {/* Back Navigation */}
        <div className="bg-card border-b border-border p-4">
          <div className="max-w-7xl mx-auto">
            <Button
              variant="ghost"
              onClick={handleBackToBrowse}
              iconName="ArrowLeft"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Back to Browse
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Video Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <div className="video-container relative bg-black rounded-2xl overflow-hidden shadow-soft-xl">
                <div className="aspect-video relative">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                      <div className="text-white text-center">
                        <Icon name="Loader2" size={48} className="animate-spin mx-auto mb-4" />
                        <p className="font-caption text-lg">Loading safe video content...</p>
                      </div>
                    </div>
                  )}

                  {/* Mock Video Display */}
                  <div 
                    className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-700 to-teal-600 flex items-center justify-center cursor-pointer"
                    onClick={() => setShowControls(!showControls)}
                    style={{
                      backgroundImage: `url(${videoData?.thumbnail})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!isPlaying && !isLoading && (
                      <Button
                        variant="default"
                        size="lg"
                        onClick={handlePlayPause}
                        className="w-20 h-20 rounded-full shadow-soft-xl animate-gentle-bounce bg-white/90 hover:bg-white text-primary"
                      >
                        <Icon name="Play" size={32} />
                      </Button>
                    )}
                  </div>

                  {/* Actual video element (hidden for demo) */}
                  <video
                    ref={videoRef}
                    className="hidden w-full h-full object-contain"
                    poster={videoData?.thumbnail}
                  >
                    <source src={videoData?.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Controls */}
                  <VideoControls
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    currentTime={currentTime}
                    duration={duration}
                    onSeek={handleSeek}
                    volume={volume}
                    onVolumeChange={handleVolumeChange}
                    onFullscreen={handleFullscreen}
                    isFullscreen={isFullscreen}
                    showControls={showControls}
                  />

                  {/* Safety Badge */}
                  <div className="absolute top-4 left-4 bg-success/90 text-white px-3 py-2 rounded-lg shadow-soft-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={16} />
                      <span className="text-sm font-caption">Safe Content Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Information */}
              <VideoInfo
                videoData={videoData}
                onLike={handleLike}
                onShare={handleShare}
                onReport={handleReport}
                isLiked={isLiked}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related Videos */}
              <RelatedVideos
                videos={relatedVideos}
                currentVideoId={videoData?.id}
                ageGroup={videoData?.ageGroup}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Parental Controls */}
      {isAuthenticated && userRole === 'parent' && (
        <ParentalControls
          videoData={videoData}
          onReport={handleReport}
          onAddToFavorites={handleAddToFavorites}
          onViewHistory={handleViewHistory}
          onSetTimeLimit={handleSetTimeLimit}
          isFavorite={isFavorite}
          watchTime={watchTime}
          isVisible={showParentalControls}
        />
      )}
      {/* Screen Time Prompt */}
      <ScreenTimePrompt
        watchTime={watchTime}
        onContinue={handleContinueWatching}
        onTakeBreak={handleTakeBreak}
        onFinish={handleFinishWatching}
        isVisible={showScreenTimePrompt}
      />
    </div>
  );
};

export default VideoPlayer;