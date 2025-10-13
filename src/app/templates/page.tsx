'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import SearchBar from "@/src/components/SearchBar";
import FilterDropdown from "@/src/components/FilterDropdown";
import Link from 'next/link';
import Image from 'next/image';

interface Template {
  id: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  industry: string;
  style: string;
  layout: string;
  screenshotUrl: string;
  previewUrl: string;
  isPremium: boolean;
  price: number;
  features: string[];
  tags: string[];
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // Build query parameters from URL
        const params = new URLSearchParams();
        const page = searchParams.get('page') || '1';
        const limit = searchParams.get('limit') || '12';
        const category = searchParams.get('category');
        const industry = searchParams.get('industry');
        const search = searchParams.get('search');
        const sortBy = searchParams.get('sortBy') || 'createdAt';
        const sortOrder = searchParams.get('sortOrder') || 'desc';

        params.set('page', page);
        params.set('limit', limit);
        params.set('sortBy', sortBy);
        params.set('sortOrder', sortOrder);

        if (category && category !== 'all') params.set('category', category);
        if (industry && industry !== 'all') params.set('industry', industry);
        if (search) params.set('search', search);

        const response = await fetch(`http://localhost:3001/api/templates?${params.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setTemplates(data.templates);
          setPagination(data.pagination);
        } else {
          // Fallback to mock data
          setTemplates([
            {
              id: 1,
              name: "Construction Pro",
              slug: "construction-pro",
              description: "Professional construction company template with modern design and booking system",
              category: "business",
              industry: "construction",
              style: "modern",
              layout: "single-page",
              screenshotUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
              previewUrl: "/preview/construction",
              isPremium: false,
              price: 0,
              features: ["Responsive", "Booking System", "Gallery", "Contact Form"],
              tags: ["construction", "business", "modern", "booking"]
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [searchParams]);

  // Remove the local filtering since we're now using server-side filtering

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'business', label: 'Business' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'portfolio', label: 'Portfolio' },
    { value: 'blog', label: 'Blog' }
  ];

  const industries = [
    { value: 'all', label: 'All Industries' },
    { value: 'construction', label: 'Construction' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'technology', label: 'Technology' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'creative', label: 'Creative' },
    { value: 'healthcare', label: 'Healthcare' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="w-16 h-16 border-4 border-bee-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading templates...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-bee-yellow/5 via-transparent to-bee-yellow/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Website <span className="text-bee-yellow">Templates</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-12">
              Choose from our collection of professionally designed, responsive website templates. 
              Perfect for any business or personal project.
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-12 bg-card-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <SearchBar placeholder="Search templates..." />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <FilterDropdown
                  options={categories}
                  paramName="category"
                  placeholder="All Categories"
                  className="w-full sm:w-48"
                />

                <FilterDropdown
                  options={industries}
                  paramName="industry"
                  placeholder="All Industries"
                  className="w-full sm:w-48"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                {pagination.total} Template{pagination.total !== 1 ? 's' : ''} Found
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-text-secondary">Sort by:</span>
                <FilterDropdown
                  options={[
                    { value: 'createdAt', label: 'Newest' },
                    { value: 'viewCount', label: 'Most Popular' },
                    { value: 'name', label: 'Name A-Z' }
                  ]}
                  paramName="sortBy"
                  placeholder="Sort by"
                  className="w-40"
                />
              </div>
            </div>

            {templates.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">No templates found</h3>
                <p className="text-text-secondary mb-6">Try adjusting your search or filter criteria</p>
                <Link
                  href="/templates"
                  className="px-6 py-3 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
                >
                  Clear Filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((template) => (
                  <div key={template.id} className="bg-card-background rounded-xl overflow-hidden border border-border hover:border-bee-yellow transition-all duration-300 group hover:shadow-lg">
                    {/* Template Image */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={template.screenshotUrl}
                        alt={template.name}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {template.isPremium && (
                        <div className="absolute top-4 right-4 bg-bee-yellow text-dark-charcoal px-3 py-1 rounded-full text-sm font-semibold">
                          Premium
                        </div>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-foreground">{template.name}</h3>
                        <span className="text-bee-yellow font-bold">
                          {template.isPremium ? `R${template.price}` : 'Free'}
                        </span>
                      </div>

                      <p className="text-text-secondary mb-4 line-clamp-2">{template.description}</p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {template.features.slice(0, 3).map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-accent-grey text-text-secondary text-xs rounded-full">
                            {feature}
                          </span>
                        ))}
                        {template.features.length > 3 && (
                          <span className="px-2 py-1 bg-accent-grey text-text-secondary text-xs rounded-full">
                            +{template.features.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Template Info */}
                      <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                        <span className="px-2 py-1 bg-accent-grey rounded-full text-xs">
                          {template.category}
                        </span>
                        <span className="px-2 py-1 bg-accent-grey rounded-full text-xs">
                          {template.industry}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link
                          href={template.previewUrl}
                          className="flex-1 text-center py-2 border border-bee-yellow text-bee-yellow rounded-lg hover:bg-bee-yellow hover:text-dark-charcoal transition-colors duration-200"
                        >
                          Preview
                        </Link>
                        <Link
                          href={`/templates/${template.slug}`}
                          className="flex-1 text-center py-2 bg-bee-yellow text-dark-charcoal rounded-lg hover:bg-yellow-400 transition-colors duration-200 font-semibold"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <Link
                  href={`/templates?${new URLSearchParams({
                    ...Object.fromEntries(searchParams.entries()),
                    page: (pagination.page - 1).toString()
                  }).toString()}`}
                  className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    !pagination.hasPrev
                      ? 'border-border text-text-muted cursor-not-allowed'
                      : 'border-bee-yellow text-bee-yellow hover:bg-bee-yellow hover:text-dark-charcoal'
                  }`}
                >
                  Previous
                </Link>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    const isActive = pageNum === pagination.page;
                    
                    return (
                      <Link
                        key={pageNum}
                        href={`/templates?${new URLSearchParams({
                          ...Object.fromEntries(searchParams.entries()),
                          page: pageNum.toString()
                        }).toString()}`}
                        className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                          isActive
                            ? 'bg-bee-yellow text-dark-charcoal'
                            : 'border border-border text-foreground hover:border-bee-yellow hover:text-bee-yellow'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  })}
                </div>

                <Link
                  href={`/templates?${new URLSearchParams({
                    ...Object.fromEntries(searchParams.entries()),
                    page: (pagination.page + 1).toString()
                  }).toString()}`}
                  className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    !pagination.hasNext
                      ? 'border-border text-text-muted cursor-not-allowed'
                      : 'border-bee-yellow text-bee-yellow hover:bg-bee-yellow hover:text-dark-charcoal'
                  }`}
                >
                  Next
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-card-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              We're constantly adding new templates. Contact us for custom template development or to request specific designs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="px-8 py-4 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
              >
                Request Custom Template
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-bee-yellow text-bee-yellow font-semibold rounded-lg hover:bg-bee-yellow hover:text-dark-charcoal transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
