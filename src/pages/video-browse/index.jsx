import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import FilterToolbar from './components/FilterToolbar';
import SafetyIndicator from './components/SafetyIndicator';
import VideoGrid from './components/VideoGrid';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const VideoBrowse = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State management
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('parent');
  const [isParentalControlsActive, setIsParentalControlsActive] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock video data
  const mockVideos = [
    {
      id: '1',
      title: 'Fun ABC Learning Song for Toddlers',
      creator: 'Learning Adventures',
      thumbnail: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '3:45',
      ageGroup: '3-5',
      category: 'educational',
      rating: 4.8,
      reviewCount: 234,
      views: '12.5K views',
      isVerified: true
    },
    {
      id: '2',
      title: 'Amazing Science Experiments for Kids',
      creator: 'Science Fun Channel',
      thumbnail: 'https://images.pexels.com/photos/8471916/pexels-photo-8471916.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '8:22',
      ageGroup: '6-8',
      category: 'science',
      rating: 4.9,
      reviewCount: 456,
      views: '25.3K views',
      isVerified: true
    },
    {
      id: '3',
      title: 'Colorful Art and Craft Tutorial',
      creator: 'Creative Kids Studio',
      thumbnail: 'https://images.pexels.com/photos/8613268/pexels-photo-8613268.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '12:15',
      ageGroup: '6-8',
      category: 'art',
      rating: 4.7,
      reviewCount: 189,
      views: '8.9K views',
      isVerified: true
    },
    {
      id: '4',
      title: 'Happy Dance Songs for Children',
      creator: 'Music & Movement',
      thumbnail: 'https://images.pexels.com/photos/8613272/pexels-photo-8613272.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '5:33',
      ageGroup: '3-5',
      category: 'music',
      rating: 4.6,
      reviewCount: 312,
      views: '18.7K views',
      isVerified: true
    },
    {
      id: '5',
      title: 'Interactive Math Games and Puzzles',
      creator: 'Math Masters',
      thumbnail: 'https://images.pexels.com/photos/8613097/pexels-photo-8613097.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '10:45',
      ageGroup: '9-12',
      category: 'educational',
      rating: 4.8,
      reviewCount: 267,
      views: '15.2K views',
      isVerified: true
    },
    {
      id: '6',
      title: 'Animal Kingdom Adventures',
      creator: 'Nature Explorers',
      thumbnail: 'https://images.pexels.com/photos/8613271/pexels-photo-8613271.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '7:18',
      ageGroup: '6-8',
      category: 'entertainment',
      rating: 4.9,
      reviewCount: 423,
      views: '32.1K views',
      isVerified: true
    },
    {
      id: '7',
      title: 'Space Exploration for Young Minds',
      creator: 'Cosmic Kids',
      thumbnail: 'https://images.pexels.com/photos/8613090/pexels-photo-8613090.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '9:27',
      ageGroup: '9-12',
      category: 'science',
      rating: 4.7,
      reviewCount: 198,
      views: '11.4K views',
      isVerified: true
    },
    {
      id: '8',
      title: 'Bedtime Stories and Lullabies',
      creator: 'Sleepy Time Tales',
      thumbnail: 'https://images.pexels.com/photos/8613273/pexels-photo-8613273.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '15:42',
      ageGroup: '3-5',
      category: 'entertainment',
      rating: 4.8,
      reviewCount: 356,
      views: '22.8K views',
      isVerified: true
    }
  ];

  const [filteredVideos, setFilteredVideos] = useState(mockVideos);
  const [displayedVideos, setDisplayedVideos] = useState(mockVideos?.slice(0, 8));

  // Filter videos based on current filters
  useEffect(() => {
    let filtered = mockVideos;

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter(video =>
        video?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        video?.creator?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        video?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Age group filter
    if (selectedAgeGroup !== 'all') {
      filtered = filtered?.filter(video => video?.ageGroup === selectedAgeGroup);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(video => video?.category === selectedCategory);
    }

    // Duration filter
    if (selectedDuration !== 'all') {
      filtered = filtered?.filter(video => {
        const duration = video?.duration?.split(':');
        const totalMinutes = parseInt(duration?.[0]) + (parseInt(duration?.[1]) / 60);
        
        switch (selectedDuration) {
          case 'short':
            return totalMinutes < 5;
          case 'medium':
            return totalMinutes >= 5 && totalMinutes <= 15;
          case 'long':
            return totalMinutes > 15;
          default:
            return true;
        }
      });
    }

    setFilteredVideos(filtered);
    setDisplayedVideos(filtered?.slice(0, 8));
    setCurrentPage(1);
    setHasMore(filtered?.length > 8);
  }, [searchQuery, selectedAgeGroup, selectedCategory, selectedDuration]);

  // Update URL params when search changes
  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ q: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = nextPage * 8;
      const endIndex = startIndex + 8;
      const newVideos = filteredVideos?.slice(startIndex, endIndex);
      
      setDisplayedVideos(prev => [...prev, ...newVideos]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < filteredVideos?.length);
      setIsLoading(false);
    }, 1000);
  };

  const handleClearFilters = () => {
    setSelectedAgeGroup('all');
    setSelectedCategory('all');
    setSelectedDuration('all');
    setSearchQuery('');
  };

  const handleVideoSelect = (video) => {
    console.log('Selected video:', video);
  };

  const handleAuthToggle = (authState) => {
    setIsAuthenticated(authState);
  };

  const handleAgeSettingsClick = () => {
    navigate('/user-profile-settings');
  };

  const handleToggleParentalControls = () => {
    setIsParentalControlsActive(!isParentalControlsActive);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onAuthToggle={handleAuthToggle}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-soft-lg mb-4">
              <Icon name="Play" size={32} color="white" />
            </div>
            <h1 className="font-heading font-bold text-fluid-3xl text-foreground mb-2">
              Discover Safe Videos
            </h1>
            <p className="font-caption text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of educational and entertaining videos, 
              specially selected for children and approved by parents and educators.
            </p>
          </div>

          {/* Safety Indicator */}
          <SafetyIndicator
            isParentalControlsActive={isParentalControlsActive}
            currentAgeFilter={selectedAgeGroup === 'all' ? '3-12' : selectedAgeGroup}
            onToggleControls={handleToggleParentalControls}
            onAgeSettingsClick={handleAgeSettingsClick}
          />

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={handleSearch}
          />

          {/* Filter Toolbar */}
          <FilterToolbar
            selectedAgeGroup={selectedAgeGroup}
            selectedCategory={selectedCategory}
            selectedDuration={selectedDuration}
            onAgeGroupChange={setSelectedAgeGroup}
            onCategoryChange={setSelectedCategory}
            onDurationChange={setSelectedDuration}
            resultCount={filteredVideos?.length}
            onClearFilters={handleClearFilters}
          />

          {/* Video Grid */}
          <VideoGrid
            videos={displayedVideos}
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
            onVideoSelect={handleVideoSelect}
          />

          {/* Quick Actions */}
          <div className="mt-12 text-center">
            <div className="bg-card border border-border rounded-2xl shadow-soft p-6">
              <h3 className="font-heading font-semibold text-foreground mb-4">
                Can't find what you're looking for?
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  variant="default"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="animate-hover-lift"
                >
                  Request Content
                </Button>
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconPosition="left"
                  onClick={() => navigate('/video-upload')}
                  className="animate-hover-lift"
                >
                  Upload Safe Video
                </Button>
                <Button
                  variant="outline"
                  iconName="HelpCircle"
                  iconPosition="left"
                  className="animate-hover-lift"
                >
                  Get Help
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={16} color="white" />
              </div>
              <span className="font-heading font-bold text-foreground">KidsVidHub</span>
            </div>
            <p className="text-muted-foreground font-caption text-sm">
              Safe, educational, and fun videos for children. 
              Moderated content you can trust.
            </p>
            <p className="text-muted-foreground font-caption text-xs mt-2">
              © {new Date()?.getFullYear()} KidsVidHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VideoBrowse;