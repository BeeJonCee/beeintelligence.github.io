'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  paramName: string;
  placeholder: string;
  className?: string;
}

export default function FilterDropdown({ 
  options, 
  paramName, 
  placeholder, 
  className = "" 
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentValue = searchParams.get(paramName) || 'all';
  const currentLabel = options.find(option => option.value === currentValue)?.label || placeholder;

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value === 'all') {
      params.delete(paramName);
    } else {
      params.set(paramName, value);
    }
    
    // Reset to first page when filtering
    params.delete('page');
    
    router.push(`/templates?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-bee-yellow transition-colors duration-200 flex items-center justify-between"
      >
        <span className="text-foreground">{currentLabel}</span>
        <svg 
          className={`w-5 h-5 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full px-4 py-3 text-left hover:bg-accent-grey transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                currentValue === option.value 
                  ? 'bg-bee-yellow/20 text-bee-yellow' 
                  : 'text-foreground'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
