'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { searchTemplates } from '@/src/lib/api';
import type { Template } from '../../../shared/types/index';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  showSuggestions?: boolean;
}

export default function SearchBar({ 
  placeholder = "Search templates...", 
  className = "",
  showSuggestions = true
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Template[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Initialize search term from URL
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  // Debounced search for suggestions
  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);
    setError('');

    try {
      const result = await searchTemplates(query, { limit: 5 });
      setSuggestions(result.data || []);
    } catch (err) {
      setError('Failed to load suggestions');
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  }, []);

  // Handle search input with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(true);

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      if (showSuggestions && value.trim()) {
        fetchSuggestions(value.trim());
      }
    }, 300); // 300ms debounce delay
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm);
  };

  const performSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term.trim()) {
      params.set('search', term.trim());
    } else {
      params.delete('search');
    }
    
    // Reset to first page when searching
    params.delete('page');
    
    setShowDropdown(false);
    router.push(`/templates?${params.toString()}`);
  };

  const handleSuggestionClick = (suggestion: Template) => {
    setSearchTerm(suggestion.name);
    performSearch(suggestion.name);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowDropdown(false);
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    params.delete('page');
    router.push(`/templates?${params.toString()}`);
  };

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
            className="w-full px-4 py-3 pl-12 pr-12 bg-background border border-border rounded-lg focus:outline-none focus:border-bee-yellow transition-colors duration-200"
          />
          
          {/* Search Icon */}
          <svg 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          
          {/* Clear Button or Loading Spinner */}
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            {loadingSuggestions ? (
              <svg 
                className="w-5 h-5 text-bee-yellow animate-spin" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
                />
              </svg>
            ) : searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="w-5 h-5 text-text-muted hover:text-foreground transition-colors duration-200"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {/* Search Button */}
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-bee-yellow text-dark-charcoal font-semibold rounded-md hover:bg-yellow-400 transition-colors duration-200"
        >
          Search
        </button>
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && showDropdown && (suggestions.length > 0 || loadingSuggestions || error) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 max-w-full">
          {error && (
            <div className="px-4 py-3 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          {loadingSuggestions && !error && (
            <div className="px-4 py-3 text-text-muted text-sm">
              Loading suggestions...
            </div>
          )}
          
          {!loadingSuggestions && suggestions.length > 0 && (
            <ul className="max-h-64 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li key={`${suggestion.id}-${index}`}>
                  <button
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-foreground/5 transition-colors duration-150 border-b border-border last:border-b-0"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{suggestion.name}</span>
                      <span className="text-sm text-text-muted truncate">{suggestion.category}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
          
          {!loadingSuggestions && suggestions.length === 0 && !error && searchTerm.length >= 2 && (
            <div className="px-4 py-3 text-text-muted text-sm">
              No templates found matching "{searchTerm}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
