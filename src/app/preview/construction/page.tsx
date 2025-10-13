'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ConstructionPreview() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading the template
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-bee-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading template preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Preview Header */}
      <div className="bg-graphite-black text-pure-white py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-off-white hover:text-bee-yellow transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Gallery</span>
            </button>
            <div className="h-6 w-px bg-accent-grey"></div>
            <h1 className="text-lg font-semibold">Construction Pro Template</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-off-white/80">
              <span>📱</span>
              <span>Responsive Preview</span>
            </div>
            <div className="flex bg-accent-grey rounded-lg p-1">
              <button className="px-3 py-1 bg-bee-yellow text-dark-charcoal rounded text-sm font-medium">
                Desktop
              </button>
              <button className="px-3 py-1 text-off-white/80 hover:text-pure-white transition-colors duration-200 text-sm">
                Tablet
              </button>
              <button className="px-3 py-1 text-off-white/80 hover:text-pure-white transition-colors duration-200 text-sm">
                Mobile
              </button>
            </div>
            <Link
              href="/templates/construction-pro"
              className="px-4 py-2 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
            >
              Get This Template
            </Link>
          </div>
        </div>
      </div>

      {/* Template Preview Frame */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-pure-white rounded-lg shadow-2xl overflow-hidden">
            <iframe
              src="/templates/construction/index.html"
              className="w-full h-screen border-0"
              title="Construction Template Preview"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      </div>

      {/* Template Info Overlay */}
      <div className="fixed bottom-4 right-4 bg-graphite-black/90 backdrop-blur-sm text-pure-white p-4 rounded-lg max-w-sm">
        <h3 className="font-semibold mb-2">Construction Pro</h3>
        <p className="text-sm text-off-white/80 mb-3">
          Professional construction company template with modern design and booking system.
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2 py-1 bg-bee-yellow/20 text-bee-yellow text-xs rounded-full">Responsive</span>
          <span className="px-2 py-1 bg-bee-yellow/20 text-bee-yellow text-xs rounded-full">Booking System</span>
          <span className="px-2 py-1 bg-bee-yellow/20 text-bee-yellow text-xs rounded-full">Gallery</span>
          <span className="px-2 py-1 bg-bee-yellow/20 text-bee-yellow text-xs rounded-full">Contact Form</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-bee-yellow font-bold">Free</span>
          <Link
            href="/templates/construction-pro"
            className="text-sm bg-bee-yellow text-dark-charcoal px-3 py-1 rounded hover:bg-yellow-400 transition-colors duration-200"
          >
            Get Template
          </Link>
        </div>
      </div>
    </div>
  );
}
