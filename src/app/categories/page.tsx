'use client';

import { useState, useEffect } from 'react';
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import { getCategories, getIndustries } from '@/src/lib/api';
import { CategorySkeleton } from '@/src/components/SkeletonLoader';
import type { Category, Industry } from '../../../../shared/types/index';

// Icon map for categories and industries
const iconMap: { [key: string]: string } = {
  'business': '🏢',
  'ecommerce': '🛒',
  'portfolio': '🎨',
  'blog': '📝',
  'restaurant': '🍽️',
  'healthcare': '🏥',
  'construction': '🏗️',
  'technology': '💻',
  'fashion': '�',
  'creative': '🎨',
  'education': '🎓',
  'real-estate': '🏠',
  'fitness': '💪',
  'legal': '⚖️',
  'travel': '✈️',
  'finance': '💰'
};

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResult = await getCategories();
        if (Array.isArray(categoriesResult)) {
          setCategories(categoriesResult.slice(0, 6)); // Limit to 6 featured
        }
        setLoadingCategories(false);

        // Fetch industries
        const industriesResult = await getIndustries();
        if (Array.isArray(industriesResult)) {
          setIndustries(industriesResult);
        }
        setLoadingIndustries(false);
      } catch (err) {
        console.error('Error fetching categories/industries:', err);
        setError('Failed to load categories and industries');
        setLoadingCategories(false);
        setLoadingIndustries(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-bee-yellow/5 via-transparent to-bee-yellow/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Template <span className="text-bee-yellow">Categories</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
              Explore our carefully curated collection of website templates organized by industry and purpose. Find the perfect template for your project.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/templates?category=${category.slug}`}
                  className="group block"
                >
                  <div className="bg-card-background rounded-xl p-8 border border-border hover:border-bee-yellow transition-all duration-300 group-hover:shadow-lg group-hover:transform group-hover:scale-105">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-bee-yellow rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                        {iconMap[category.slug.toLowerCase()] || '📦'}
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{category.name}</h3>
                      <p className="text-text-secondary leading-relaxed">{category.description || 'No description available'}</p>
                    </div>
                    
                    <div className="mt-4 flex items-center text-bee-yellow group-hover:text-yellow-400 transition-colors duration-200">
                      <span className="text-sm font-medium">View Templates</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-20 bg-card-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Popular Industries
              </h2>
              <p className="text-lg text-text-secondary">
                Templates tailored for specific industries and use cases
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: "Construction", icon: "🏗️", slug: "construction" },
                { name: "Restaurant", icon: "🍽️", slug: "restaurant" },
                { name: "Technology", icon: "💻", slug: "technology" },
                { name: "Healthcare", icon: "🏥", slug: "healthcare" },
                { name: "Fashion", icon: "👗", slug: "fashion" },
                { name: "Creative", icon: "🎨", slug: "creative" },
                { name: "Education", icon: "🎓", slug: "education" },
                { name: "Real Estate", icon: "🏠", slug: "real-estate" },
                { name: "Fitness", icon: "💪", slug: "fitness" },
                { name: "Legal", icon: "⚖️", slug: "legal" },
                { name: "Travel", icon: "✈️", slug: "travel" },
                { name: "Finance", icon: "💰", slug: "finance" }
              ].map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/templates?industry=${industry.slug}`}
                  className="group block"
                >
                  <div className="bg-background rounded-lg p-6 text-center border border-border hover:border-bee-yellow transition-all duration-200 group-hover:shadow-md">
                    <div className="text-3xl mb-3">{industry.icon || iconMap[industry.slug.toLowerCase()] || '🏢'}</div>
                    <h4 className="font-semibold text-foreground text-sm group-hover:text-bee-yellow transition-colors duration-200">
                      {industry.name}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Template Styles */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Design Styles
              </h2>
              <p className="text-lg text-text-secondary">
                Choose from various design aesthetics to match your brand
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Modern",
                  description: "Clean, contemporary designs with bold typography",
                  color: "from-blue-500 to-purple-600"
                },
                {
                  name: "Minimal",
                  description: "Simple, elegant layouts with plenty of white space",
                  color: "from-gray-400 to-gray-600"
                },
                {
                  name: "Creative",
                  description: "Artistic and unique designs for creative professionals",
                  color: "from-pink-500 to-orange-500"
                },
                {
                  name: "Professional",
                  description: "Corporate and business-focused designs",
                  color: "from-green-500 to-teal-600"
                }
              ].map((style) => (
                <Link
                  key={style.name}
                  href={`/templates?style=${style.name.toLowerCase()}`}
                  className="group block"
                >
                  <div className="bg-card-background rounded-xl p-6 border border-border hover:border-bee-yellow transition-all duration-300 group-hover:shadow-lg">
                    <div className={`w-full h-32 bg-gradient-to-br ${style.color} rounded-lg mb-4`}></div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{style.name}</h3>
                    <p className="text-text-secondary text-sm">{style.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-card-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              We're constantly adding new templates. Contact us for custom template development or to request specific categories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200">
                Request Template
              </button>
              <button className="px-8 py-4 border-2 border-bee-yellow text-bee-yellow font-semibold rounded-lg hover:bg-bee-yellow hover:text-dark-charcoal transition-colors duration-200">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
