import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationFooter = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/user-login');
  };

  const handleBrowseClick = () => {
    navigate('/video-browse');
  };

  return (
    <div className="space-y-6">
      {/* Already Have Account */}
      <div className="text-center p-6 bg-muted/30 rounded-xl border border-border">
        <p className="text-muted-foreground text-sm mb-3">
          Already have a KidsVidHub account?
        </p>
        <Button
          variant="outline"
          onClick={handleSignInClick}
          iconName="LogIn"
          iconPosition="left"
          className="animate-hover-lift"
        >
          Sign In Instead
        </Button>
      </div>
      {/* Browse Without Account */}
      <div className="text-center">
        <p className="text-muted-foreground text-sm mb-3">
          Want to explore first?
        </p>
        <Button
          variant="ghost"
          onClick={handleBrowseClick}
          iconName="Eye"
          iconPosition="left"
          className="animate-hover-lift"
        >
          Browse Safe Videos
        </Button>
      </div>
      {/* Help and Support */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="HelpCircle" size={20} className="text-primary" />
            <span className="font-caption font-medium text-foreground">Need Help?</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Live Chat Support
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Mail"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Email Support
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Our family-friendly support team is here 24/7 to help you get started safely
          </p>
        </div>
      </div>
      {/* Footer Links */}
      <div className="text-center space-y-2">
        <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <button className="hover:text-primary transition-colors">Privacy Policy</button>
          <span>•</span>
          <button className="hover:text-primary transition-colors">Terms of Service</button>
          <span>•</span>
          <button className="hover:text-primary transition-colors">Child Safety</button>
          <span>•</span>
          <button className="hover:text-primary transition-colors">Contact Us</button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} KidsVidHub. Keeping families safe online.
        </p>
      </div>
    </div>
  );
};

export default RegistrationFooter;