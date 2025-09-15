import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterToolbar = ({ 
  selectedAgeGroup, 
  selectedCategory, 
  selectedDuration, 
  onAgeGroupChange, 
  onCategoryChange, 
  onDurationChange,
  resultCount = 0,
  onClearFilters
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const ageGroups = [
    { value: 'all', label: 'All Ages', count: 245 },
    { value: '3-5', label: '3-5 Years', count: 89, color: 'bg-green-100 text-green-700 border-green-200' },
    { value: '6-8', label: '6-8 Years', count: 102, color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { value: '9-12', label: '9-12 Years', count: 54, color: 'bg-purple-100 text-purple-700 border-purple-200' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: 'Grid3X3', count: 245 },
    { value: 'educational', label: 'Educational', icon: 'BookOpen', count: 98 },
    { value: 'entertainment', label: 'Entertainment', icon: 'Smile', count: 76 },
    { value: 'music', label: 'Music & Songs', icon: 'Music', count: 45 },
    { value: 'science', label: 'Science Fun', icon: 'Microscope', count: 26 },
    { value: 'art', label: 'Arts & Crafts', icon: 'Palette', count: 32 }
  ];

  const durations = [
    { value: 'all', label: 'Any Length', count: 245 },
    { value: 'short', label: 'Under 5 min', count: 123 },
    { value: 'medium', label: '5-15 min', count: 89 },
    { value: 'long', label: '15+ min', count: 33 }
  ];

  const hasActiveFilters = selectedAgeGroup !== 'all' || selectedCategory !== 'all' || selectedDuration !== 'all';

  return (
    <div className="bg-card border border-border rounded-2xl shadow-soft p-4 mb-6">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          iconPosition="right"
          fullWidth
        >
          Filters & Categories
        </Button>
      </div>
      {/* Filter Content */}
      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Results Count & Clear */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <span className="font-heading font-semibold text-foreground">
              {resultCount} Safe Videos Found
            </span>
          </div>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Age Groups */}
        <div>
          <h4 className="font-caption font-medium text-foreground mb-2 flex items-center space-x-2">
            <Icon name="Users" size={16} />
            <span>Age Groups</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {ageGroups?.map((age) => (
              <Button
                key={age?.value}
                variant={selectedAgeGroup === age?.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onAgeGroupChange(age?.value)}
                className={`animate-hover-lift ${age?.color || ''}`}
              >
                {age?.label}
                <span className="ml-2 text-xs opacity-75">({age?.count})</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-caption font-medium text-foreground mb-2 flex items-center space-x-2">
            <Icon name="Grid3X3" size={16} />
            <span>Categories</span>
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {categories?.map((category) => (
              <Button
                key={category?.value}
                variant={selectedCategory === category?.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategoryChange(category?.value)}
                iconName={category?.icon}
                iconPosition="left"
                className="animate-hover-lift justify-start"
              >
                <span className="truncate">{category?.label}</span>
                <span className="ml-auto text-xs opacity-75">({category?.count})</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h4 className="font-caption font-medium text-foreground mb-2 flex items-center space-x-2">
            <Icon name="Clock" size={16} />
            <span>Video Length</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {durations?.map((duration) => (
              <Button
                key={duration?.value}
                variant={selectedDuration === duration?.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => onDurationChange(duration?.value)}
                className="animate-hover-lift"
              >
                {duration?.label}
                <span className="ml-2 text-xs opacity-75">({duration?.count})</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Filter Presets */}
        <div className="pt-4 border-t border-border">
          <h4 className="font-caption font-medium text-foreground mb-2 flex items-center space-x-2">
            <Icon name="Zap" size={16} />
            <span>Quick Picks</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="sm"
              iconName="Star"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Most Popular
            </Button>
            <Button
              variant="secondary"
              size="sm"
              iconName="TrendingUp"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Trending Now
            </Button>
            <Button
              variant="secondary"
              size="sm"
              iconName="Award"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Editor's Choice
            </Button>
            <Button
              variant="secondary"
              size="sm"
              iconName="Clock"
              iconPosition="left"
              className="animate-hover-lift"
            >
              Recently Added
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;