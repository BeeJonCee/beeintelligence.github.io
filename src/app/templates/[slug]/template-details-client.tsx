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
  createdAt: string;
  updatedAt: string;
}

export default function TemplateDetailsClient({ slug }: { slug: string }) {
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/templates/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setTemplate(data);
        } else {
          setError('Template not found');
        }
      } catch (error) {
        console.error('Error fetching template:', error);
        setError('Failed to load template');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTemplate();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 border-4 border-bee-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-text-secondary">Loading template details...</p>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😞</div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Template Not Found</h1>
        <p className="text-text-secondary mb-8">The template you're looking for doesn't exist or has been removed.</p>
        <Link
          href="/templates"
          className="px-6 py-3 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
        >
          Browse All Templates
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-bee-yellow/5 via-transparent to-bee-yellow/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Template Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src={template.screenshotUrl}
                  alt={template.name}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                {template.isPremium && (
                  <div className="absolute top-4 right-4 bg-bee-yellow text-dark-charcoal px-4 py-2 rounded-full text-sm font-bold">
                    Premium Template
                  </div>
                )}
              </div>
            </div>

            {/* Template Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  {template.name}
                </h1>
                <p className="text-lg text-text-secondary mb-6">
                  {template.description}
                </p>
              </div>

              {/* Template Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card-background p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-bee-yellow">{template.viewCount.toLocaleString()}</div>
                  <div className="text-sm text-text-secondary">Views</div>
                </div>
                <div className="bg-card-background p-4 rounded-lg border border-border">
                  <div className="text-2xl font-bold text-bee-yellow">{template.downloadCount.toLocaleString()}</div>
                  <div className="text-sm text-text-secondary">Downloads</div>
                </div>
              </div>

              {/* Template Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-accent-grey text-text-secondary text-sm rounded-full">
                    {template.category}
                  </span>
                  <span className="px-3 py-1 bg-accent-grey text-text-secondary text-sm rounded-full">
                    {template.industry}
                  </span>
                  <span className="px-3 py-1 bg-accent-grey text-text-secondary text-sm rounded-full">
                    {template.style}
                  </span>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="text-3xl font-bold text-foreground">
                  {template.isPremium ? `R${template.price}` : 'Free'}
                </div>
                <div className="flex gap-3">
                  <Link
                    href={template.previewUrl}
                    className="flex-1 text-center py-3 border border-bee-yellow text-bee-yellow rounded-lg hover:bg-bee-yellow hover:text-dark-charcoal transition-colors duration-200 font-semibold"
                  >
                    Live Preview
                  </Link>
                  <Link
                    href="/pricing"
                    className="flex-1 text-center py-3 bg-bee-yellow text-dark-charcoal rounded-lg hover:bg-yellow-400 transition-colors duration-200 font-semibold"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Template Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {template.features.map((feature, index) => (
              <div key={index} className="bg-card-background p-6 rounded-lg border border-border hover:border-bee-yellow transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-bee-yellow/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-bee-yellow" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tags Section */}
      <section className="py-20 bg-card-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Template Tags
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {template.tags.map((tag, index) => (
              <span key={index} className="px-4 py-2 bg-background border border-border text-text-secondary rounded-full hover:border-bee-yellow hover:text-bee-yellow transition-colors duration-200">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Templates */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Related Templates
          </h2>
          <div className="text-center">
            <p className="text-text-secondary mb-8">
              Explore more templates in the {template.industry} industry
            </p>
            <Link
              href={`/templates?industry=${template.industry}`}
              className="px-8 py-4 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
            >
              View {template.industry} Templates
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bee-yellow/10 to-bee-yellow/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Get a custom quote for this template or explore our other professional designs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="px-8 py-4 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
            >
              Get Custom Quote
            </Link>
            <Link
              href="/templates"
              className="px-8 py-4 border-2 border-bee-yellow text-bee-yellow font-semibold rounded-lg hover:bg-bee-yellow hover:text-dark-charcoal transition-colors duration-200"
            >
              Browse All Templates
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
