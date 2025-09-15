import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, searchQuery, onSearchChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const popularSearches = [
    "ABC learning songs",
    "Fun science experiments",
    "Animal adventures",
    "Math games for kids",
    "Story time videos",
    "Art and craft tutorials",
    "Music and dance",
    "Educational cartoons"
  ];

  const recentSearches = [
    "dinosaur facts",
    "counting songs",
    "space exploration"
  ];

  useEffect(() => {
    if (searchQuery?.length > 0) {
      const filtered = popularSearches?.filter(search =>
        search?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleInputFocus = () => {
    setIsExpanded(true);
    if (searchQuery?.length === 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
      if (searchQuery?.length === 0) {
        setIsExpanded(false);
      }
    }, 200);
  };

  const clearSearch = () => {
    onSearchChange('');
    onSearch('');
    setShowSuggestions(false);
    searchRef?.current?.focus();
  };

  return (
    <div className="relative mb-6">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className={`bg-card border-2 rounded-2xl shadow-soft transition-all duration-300 ${
          isExpanded ? 'border-primary shadow-soft-lg' : 'border-border'
        }`}>
          <div className="flex items-center p-4">
            <Icon name="Search" size={24} className="text-primary mr-3" />
            
            <Input
              ref={searchRef}
              type="search"
              placeholder="Search for fun, safe videos..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="flex-1 border-0 bg-transparent text-lg placeholder:text-muted-foreground focus:ring-0"
            />
            
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="mr-2 animate-hover-lift"
              >
                <Icon name="X" size={20} />
              </Button>
            )}
            
            <Button
              type="submit"
              variant="default"
              size="lg"
              iconName="Search"
              className="animate-hover-lift"
            >
              Search
            </Button>
          </div>
        </div>
      </form>
      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-soft-xl z-200 overflow-hidden">
          {searchQuery?.length === 0 ? (
            <div className="p-4">
              {/* Recent Searches */}
              {recentSearches?.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-caption font-medium text-foreground mb-2 flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span>Recent Searches</span>
                  </h4>
                  <div className="space-y-1">
                    {recentSearches?.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center space-x-2"
                      >
                        <Icon name="RotateCcw" size={14} className="text-muted-foreground" />
                        <span className="text-sm">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <h4 className="font-caption font-medium text-foreground mb-2 flex items-center space-x-2">
                  <Icon name="TrendingUp" size={16} />
                  <span>Popular Searches</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {popularSearches?.slice(0, 6)?.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center space-x-2"
                    >
                      <Icon name="Search" size={14} className="text-muted-foreground" />
                      <span className="text-sm">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-2">
              {suggestions?.length > 0 ? (
                suggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors flex items-center space-x-2"
                  >
                    <Icon name="Search" size={14} className="text-muted-foreground" />
                    <span className="text-sm">{suggestion}</span>
                  </button>
                ))
              ) : (
                <div className="px-3 py-4 text-center text-muted-foreground">
                  <Icon name="Search" size={24} className="mx-auto mb-2" />
                  <p className="text-sm">No suggestions found</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;