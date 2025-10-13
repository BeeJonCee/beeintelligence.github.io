import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-bee-yellow/5 via-transparent to-bee-yellow/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,214,0,0.1),transparent_50%)]"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-bee-yellow/10 border border-bee-yellow/20 rounded-full text-bee-yellow font-medium mb-8 fade-in">
            <span className="w-2 h-2 bg-bee-yellow rounded-full mr-2 animate-pulse"></span>
            New templates added weekly
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Build Stunning Websites with{' '}
            <span className="bg-gradient-to-r from-bee-yellow to-yellow-400 bg-clip-text text-transparent">
              Bee Intelly
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl lg:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Choose from our collection of modern, responsive website templates. 
            Fast, beautiful, and developer-friendly platform for creating professional websites.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/templates"
              className="w-full sm:w-auto px-8 py-4 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-200 bee-shadow hover:bee-glow transform hover:scale-105"
            >
              Browse Templates
            </Link>
            <Link
              href="/preview/construction"
              className="w-full sm:w-auto px-8 py-4 border-2 border-bee-yellow text-bee-yellow font-semibold rounded-lg hover:bg-bee-yellow hover:text-dark-charcoal transition-all duration-200"
            >
              View Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-bee-yellow mb-2">50+</div>
              <div className="text-text-secondary">Premium Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-bee-yellow mb-2">100%</div>
              <div className="text-text-secondary">Responsive Design</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-bee-yellow mb-2">24/7</div>
              <div className="text-text-secondary">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-bee-yellow rounded-full flex justify-center">
          <div className="w-1 h-3 bg-bee-yellow rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
