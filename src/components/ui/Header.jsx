import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const Header = ({ isAuthenticated = false, userRole = 'child', onAuthToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      onAuthToggle?.(false);
      navigate('/user-login');
    } else {
      navigate('/user-login');
    }
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('/video-browse')}>
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-soft">
        <Icon name="Play" size={24} color="white" />
      </div>
      <div className="flex flex-col">
        <span className="font-heading font-bold text-fluid-lg text-foreground">KidsVidHub</span>
        <span className="font-caption text-xs text-muted-foreground -mt-1">Safe Video Fun</span>
      </div>
    </div>
  );

  const NavigationItems = ({ isMobile = false }) => (
    <>
      {isAuthenticated && (
        <>
          <Button
            variant={isActivePath('/video-browse') ? 'default' : 'ghost'}
            onClick={() => handleNavigation('/video-browse')}
            iconName="Search"
            iconPosition="left"
            className={`${isMobile ? 'w-full justify-start' : ''} animate-hover-lift`}
          >
            Browse Videos
          </Button>
          
          <div className="relative group">
            <Button
              variant={isActivePath('/user-profile-settings') || isActivePath('/video-upload') ? 'default' : 'ghost'}
              iconName="User"
              iconPosition="left"
              className={`${isMobile ? 'w-full justify-start' : ''} animate-hover-lift`}
            >
              My Account
              <Icon name="ChevronDown" size={16} className="ml-1 transition-transform group-hover:rotate-180" />
            </Button>
            
            <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-soft-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-200">
              <div className="py-2">
                <button
                  onClick={() => handleNavigation('/user-profile-settings')}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center space-x-2 ${
                    isActivePath('/user-profile-settings') ? 'bg-muted text-primary' : 'text-foreground'
                  }`}
                >
                  <Icon name="Settings" size={16} />
                  <span>Profile Settings</span>
                </button>
                
                {(userRole === 'creator' || userRole === 'educator') && (
                  <button
                    onClick={() => handleNavigation('/video-upload')}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center space-x-2 ${
                      isActivePath('/video-upload') ? 'bg-muted text-primary' : 'text-foreground'
                    }`}
                  >
                    <Icon name="Upload" size={16} />
                    <span>Upload Video</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavigationItems />
          </nav>
          
          {/* Desktop Auth Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant={isAuthenticated ? 'outline' : 'default'}
              onClick={handleAuthAction}
              iconName={isAuthenticated ? 'LogOut' : 'LogIn'}
              iconPosition="left"
              className="animate-hover-lift"
            >
              {isAuthenticated ? 'Sign Out' : 'Sign In'}
            </Button>
            
            {!isAuthenticated && (
              <Button
                variant="secondary"
                onClick={() => handleNavigation('/user-registration')}
                iconName="UserPlus"
                iconPosition="left"
                className="animate-hover-lift"
              >
                Join Now
              </Button>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden animate-press"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
          </Button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="px-4 py-4 space-y-2">
              <NavigationItems isMobile />
              
              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant={isAuthenticated ? 'outline' : 'default'}
                  onClick={handleAuthAction}
                  iconName={isAuthenticated ? 'LogOut' : 'LogIn'}
                  iconPosition="left"
                  fullWidth
                >
                  {isAuthenticated ? 'Sign Out' : 'Sign In'}
                </Button>
                
                {!isAuthenticated && (
                  <Button
                    variant="secondary"
                    onClick={() => handleNavigation('/user-registration')}
                    iconName="UserPlus"
                    iconPosition="left"
                    fullWidth
                  >
                    Join Now
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;