import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ScreenTimePrompt = ({ 
  watchTime = 0, 
  onContinue, 
  onTakeBreak, 
  onFinish,
  isVisible = false 
}) => {
  const [countdown, setCountdown] = useState(30);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowPrompt(true);
      setCountdown(30);
    }
  }, [isVisible]);

  useEffect(() => {
    if (showPrompt && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      handleTakeBreak();
    }
  }, [showPrompt, countdown]);

  const handleContinue = () => {
    setShowPrompt(false);
    onContinue?.();
  };

  const handleTakeBreak = () => {
    setShowPrompt(false);
    onTakeBreak?.();
  };

  const handleFinish = () => {
    setShowPrompt(false);
    onFinish?.();
  };

  const getPromptMessage = () => {
    if (watchTime >= 120) {
      return {
        title: "Time for a Long Break! 🌟",
        message: "You've been watching for 2 hours. Let's take a break and do something fun offline!",
        icon: "Moon",
        color: "warning"
      };
    } else if (watchTime >= 60) {
      return {
        title: "Break Time! 🎈",
        message: "You've been watching for 1 hour. How about stretching or getting a snack?",
        icon: "Coffee",
        color: "accent"
      };
    } else {
      return {
        title: "Quick Break? 🌈",
        message: "You've been watching for a while. Want to take a quick break?",
        icon: "Pause",
        color: "primary"
      };
    }
  };

  if (!showPrompt) return null;

  const prompt = getPromptMessage();

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-400 p-4">
      <div className="bg-card border border-border rounded-3xl shadow-soft-xl p-8 w-full max-w-md text-center animate-gentle-bounce">
        {/* Icon */}
        <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-${prompt?.color} to-${prompt?.color}/70`}>
          <Icon name={prompt?.icon} size={40} color="white" />
        </div>

        {/* Title */}
        <h2 className="font-heading font-bold text-fluid-xl text-foreground mb-4">
          {prompt?.title}
        </h2>

        {/* Message */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {prompt?.message}
        </p>

        {/* Watch Time Display */}
        <div className="bg-muted/50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Clock" size={20} className="text-muted-foreground" />
            <span className="font-heading font-semibold text-foreground">
              Total Watch Time Today
            </span>
          </div>
          <div className="text-3xl font-bold text-primary mb-2">
            {Math.floor(watchTime / 60)}h {watchTime % 60}m
          </div>
          <div className="w-full bg-border rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all bg-gradient-to-r ${
                watchTime >= 120 ? 'from-warning to-error' :
                watchTime >= 60 ? 'from-accent to-warning': 'from-success to-primary'
              }`}
              style={{ width: `${Math.min((watchTime / 120) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Recommended daily limit: 2 hours
          </p>
        </div>

        {/* Auto-break countdown */}
        {countdown > 0 && (
          <div className="mb-6 p-3 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="text-sm text-accent font-caption">
              Auto-break in {countdown} seconds
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {watchTime < 120 && (
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={handleContinue}
              iconName="Play"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Continue Watching (5 more minutes)
            </Button>
          )}

          <Button
            variant="secondary"
            size="lg"
            fullWidth
            onClick={handleTakeBreak}
            iconName="Coffee"
            iconPosition="left"
            className="animate-hover-lift"
          >
            Take a Break (15 minutes)
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleFinish}
            iconName="LogOut"
            iconPosition="left"
            className="animate-hover-lift"
          >
            Finish Watching for Today
          </Button>
        </div>

        {/* Fun Break Suggestions */}
        <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
          <h4 className="font-caption font-medium text-success text-sm mb-2">
            Fun Break Ideas! 🎯
          </h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Stretch your arms and legs</p>
            <p>• Get a healthy snack and water</p>
            <p>• Look out the window</p>
            <p>• Draw or color something</p>
            <p>• Play with toys or games</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenTimePrompt;