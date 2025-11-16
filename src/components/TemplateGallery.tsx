'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getTemplates, ApiError, incrementTemplateViews } from '../lib/api';
import { Pagination } from './Pagination';
import { TemplateGallerySkeleton } from './SkeletonLoader';
import { ApiErrorBoundary } from './ErrorBoundary';
import { formatCount, formatPrice, getPlaceholderImageUrl } from '../lib/utils';
import type { Template, PaginatedResponse } from '../../../shared/types/index.js';

interface TemplateGalleryState {
  templates: Template[];
  loading: boolean;
  error: ApiError | null;
  currentPage: number;
  totalPages: number;
  selectedCategory: string;
  selectedIndustry: string;
}

const TEMPLATES_PER_PAGE = 6;
const PAGINATION_TIMEOUT = 300; // ms

export default function TemplateGallery() {
  const [state, setState] = useState<TemplateGalleryState>({
    templates: [],
    loading: true,
    error: null,
    currentPage: 1,
    totalPages: 1,
    selectedCategory: 'all',
    selectedIndustry: 'all',
  });

  // Fetch templates from API
  const fetchTemplates = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const filters = {
        page: state.currentPage,
        limit: TEMPLATES_PER_PAGE,
        ...(state.selectedCategory !== 'all' && { category: state.selectedCategory }),
        ...(state.selectedIndustry !== 'all' && { industry: state.selectedIndustry }),
      };

      const response = await getTemplates(filters);
      setState(prev => ({
        ...prev,
        templates: response.data,
        totalPages: response.pagination.totalPages,
        loading: false,
      }));
    } catch (error) {
      const apiError = error instanceof ApiError ? error : new ApiError(500, 'Failed to fetch templates');
      setState(prev => ({
        ...prev,
        error: apiError,
        loading: false,
      }));
    }
  }, [state.currentPage, state.selectedCategory, state.selectedIndustry]);

  // Load templates on mount and when filters change
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Handle category filter change
  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(prev => ({
      ...prev,
      selectedCategory: e.target.value,
      currentPage: 1, // Reset to first page
    }));
  }, []);

  // Handle industry filter change
  const handleIndustryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(prev => ({
      ...prev,
      selectedIndustry: e.target.value,
      currentPage: 1, // Reset to first page
    }));
  }, []);

  // Handle pagination
  const handlePageChange = useCallback((newPage: number) => {
    setState(prev => ({ ...prev, currentPage: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get available categories and industries from templates
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'business', label: 'Business' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'portfolio', label: 'Portfolio' },
  ];

  const industries = [
    { value: 'all', label: 'All Industries' },
    { value: 'construction', label: 'Construction' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'technology', label: 'Technology' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'creative', label: 'Creative' },
    { value: 'healthcare', label: 'Healthcare' },
  ];

  if (state.loading) {
    return (
      <section className="py-20 bg-card-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Featured Templates
            </h2>
            <p className="text-text-secondary text-lg">
              Discover our collection of professionally designed website templates
            </p>
          </div>
          <TemplateGallerySkeleton count={TEMPLATES_PER_PAGE} />
        </div>
      </section>
    );
  }

  if (state.error) {
    return (
      <ApiErrorBoundary onError={fetchTemplates}>
        <section className="py-20 bg-card-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
                Unable to Load Templates
              </h3>
              <p className="text-red-500 dark:text-red-300 mb-4">
                {state.error.message}
              </p>
              <button
                onClick={fetchTemplates}
                className="px-4 py-2 bg-bee-yellow text-dark-charcoal rounded-lg hover:bg-yellow-400 transition-colors duration-200 font-semibold"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </ApiErrorBoundary>
    );
  }

  return (
    <section className="py-20 bg-card-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Templates
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Discover our collection of professionally designed website templates. 
            Each template is crafted with modern design principles and optimized for performance.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
          <select
            value={state.selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-bee-yellow"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          
          <select
            value={state.selectedIndustry}
            onChange={handleIndustryChange}
            className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-bee-yellow"
          >
            {industries.map(industry => (
              <option key={industry.value} value={industry.value}>
                {industry.label}
              </option>
            ))}
          </select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {state.templates.length > 0 ? (
            state.templates.map((template: Template) => (
              <div key={template.id} className="bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                {/* Template Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={template.screenshotUrl || getPlaceholderImageUrl(600, 400, template.name)}
                    alt={template.name}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {template.isPremium && (
                    <div className="absolute top-4 right-4 bg-bee-yellow text-dark-charcoal px-2 py-1 rounded-full text-xs font-semibold">
                      Premium
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <Link
                      href={`/templates/${template.slug}`}
                      onClick={() => incrementTemplateViews(template.id).catch(() => {})}
                      className="opacity-0 group-hover:opacity-100 bg-bee-yellow text-dark-charcoal px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                    >
                      Preview
                    </Link>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{template.name}</h3>
                    {template.isPremium ? (
                      <span className="text-bee-yellow font-bold">{formatPrice(template.price)}</span>
                    ) : (
                      <span className="text-green-500 font-bold">Free</span>
                    )}
                  </div>
                  
                  <p className="text-text-secondary mb-4 line-clamp-2">{template.description}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M15 8a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633z" clipRule="evenodd" />
                      </svg>
                      {formatCount(template.viewCount)}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.657 6.243A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                      </svg>
                      {formatCount(template.downloadCount)}
                    </span>
                  </div>

                  {/* Category & Industry Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-accent-grey text-text-secondary text-xs rounded-full">
                      {template.category}
                    </span>
                    <span className="px-2 py-1 bg-accent-grey text-text-secondary text-xs rounded-full">
                      {template.industry}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/templates/${template.slug}`}
                      onClick={() => incrementTemplateViews(template.id).catch(() => {})}
                      className="flex-1 text-center py-2 border border-bee-yellow text-bee-yellow rounded-lg hover:bg-bee-yellow hover:text-dark-charcoal transition-colors duration-200"
                    >
                      Preview
                    </Link>
                    <Link
                      href="/pricing"
                      className="flex-1 text-center py-2 bg-bee-yellow text-dark-charcoal rounded-lg hover:bg-yellow-400 transition-colors duration-200 font-semibold"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-text-secondary text-lg">No templates found matching your filters.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {state.totalPages > 1 && (
          <Pagination
            currentPage={state.currentPage}
            totalPages={state.totalPages}
            onPageChange={handlePageChange}
            loading={state.loading}
          />
        )}
      </div>
    </section>
  );
}
