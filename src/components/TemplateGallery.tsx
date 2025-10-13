'use client';

import { useState, useEffect } from 'react';
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
  viewCount: number;
  downloadCount: number;
  features: string[];
  tags: string[];
}

export default function TemplateGallery() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  // Mock data for now - will be replaced with API calls
  const mockTemplates: Template[] = [
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
      viewCount: 1250,
      downloadCount: 89,
      features: ["Responsive", "Booking System", "Gallery", "Contact Form"],
      tags: ["construction", "business", "modern", "booking"]
    },
    {
      id: 2,
      name: "Restaurant Elegant",
      slug: "restaurant-elegant",
      description: "Elegant restaurant template with menu showcase and reservation system",
      category: "business",
      industry: "restaurant",
      style: "elegant",
      layout: "multi-page",
      screenshotUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      previewUrl: "/preview/restaurant",
      isPremium: true,
      price: 49,
      viewCount: 2100,
      downloadCount: 156,
      features: ["Menu Showcase", "Reservations", "Gallery", "Reviews"],
      tags: ["restaurant", "food", "elegant", "menu"]
    },
    {
      id: 3,
      name: "Tech Startup",
      slug: "tech-startup",
      description: "Modern tech startup template with clean design and feature highlights",
      category: "business",
      industry: "technology",
      style: "minimal",
      layout: "single-page",
      screenshotUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      previewUrl: "/preview/tech-startup",
      isPremium: false,
      price: 0,
      viewCount: 3200,
      downloadCount: 234,
      features: ["Clean Design", "Feature Showcase", "Team Section", "Contact"],
      tags: ["tech", "startup", "minimal", "modern"]
    },
    {
      id: 4,
      name: "Fashion Store",
      slug: "fashion-store",
      description: "Stylish fashion e-commerce template with product showcase",
      category: "ecommerce",
      industry: "fashion",
      style: "stylish",
      layout: "multi-page",
      screenshotUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      previewUrl: "/preview/fashion-store",
      isPremium: true,
      price: 79,
      viewCount: 1800,
      downloadCount: 98,
      features: ["Product Showcase", "Shopping Cart", "Checkout", "Reviews"],
      tags: ["fashion", "ecommerce", "stylish", "products"]
    },
    {
      id: 5,
      name: "Portfolio Creative",
      slug: "portfolio-creative",
      description: "Creative portfolio template for designers and artists",
      category: "portfolio",
      industry: "creative",
      style: "creative",
      layout: "single-page",
      screenshotUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      previewUrl: "/preview/portfolio-creative",
      isPremium: false,
      price: 0,
      viewCount: 2800,
      downloadCount: 187,
      features: ["Portfolio Gallery", "About Section", "Contact", "Blog"],
      tags: ["portfolio", "creative", "design", "art"]
    },
    {
      id: 6,
      name: "Medical Clinic",
      slug: "medical-clinic",
      description: "Professional medical clinic template with appointment booking",
      category: "business",
      industry: "healthcare",
      style: "professional",
      layout: "multi-page",
      screenshotUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      previewUrl: "/preview/medical-clinic",
      isPremium: true,
      price: 59,
      viewCount: 1500,
      downloadCount: 76,
      features: ["Appointment Booking", "Services", "Team", "Contact"],
      tags: ["medical", "healthcare", "professional", "booking"]
    }
  ];

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

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTemplates(mockTemplates);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredTemplates = templates.filter(template => {
    const categoryMatch = selectedCategory === 'all' || template.category === selectedCategory;
    const industryMatch = selectedIndustry === 'all' || template.industry === selectedIndustry;
    return categoryMatch && industryMatch;
  });

  if (loading) {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-background rounded-xl p-6 animate-pulse">
                <div className="w-full h-48 bg-accent-grey rounded-lg mb-4"></div>
                <div className="h-4 bg-accent-grey rounded mb-2"></div>
                <div className="h-3 bg-accent-grey rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-bee-yellow"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
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
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-background rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
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
                  <div className="absolute top-4 right-4 bg-bee-yellow text-dark-charcoal px-2 py-1 rounded-full text-xs font-semibold">
                    Premium
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Link
                    href={template.previewUrl}
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
                    <span className="text-bee-yellow font-bold">${template.price}</span>
                  ) : (
                    <span className="text-green-500 font-bold">Free</span>
                  )}
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

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                  <span>👁️ {template.viewCount.toLocaleString()} views</span>
                  <span>⬇️ {template.downloadCount} downloads</span>
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
                    {template.isPremium ? 'Buy Now' : 'Get Free'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/templates"
            className="inline-flex items-center px-8 py-3 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200 bee-shadow"
          >
            View All Templates
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
