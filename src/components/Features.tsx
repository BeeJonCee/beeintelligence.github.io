export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized for speed with modern web technologies and best practices for performance."
    },
    {
      icon: "📱",
      title: "Fully Responsive",
      description: "All templates are mobile-first and look perfect on any device, from phones to desktops."
    },
    {
      icon: "🎨",
      title: "Modern Design",
      description: "Clean, contemporary designs that follow current web design trends and user experience principles."
    },
    {
      icon: "🔧",
      title: "Easy Customization",
      description: "Well-structured code that's easy to modify and customize to match your brand and needs."
    },
    {
      icon: "🚀",
      title: "SEO Optimized",
      description: "Built with SEO best practices to help your website rank better in search engine results."
    },
    {
      icon: "💻",
      title: "Developer Friendly",
      description: "Clean, commented code that's easy to understand and extend for developers of all skill levels."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Bee Intelly?
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            We provide everything you need to create a professional website that stands out from the competition.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card-background rounded-xl p-8 hover:shadow-lg transition-all duration-300 group hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-bee-yellow/10 to-yellow-400/10 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-bee-yellow mb-2">50+</div>
              <div className="text-text-secondary font-medium">Premium Templates</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-bee-yellow mb-2">10K+</div>
              <div className="text-text-secondary font-medium">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-bee-yellow mb-2">99.9%</div>
              <div className="text-text-secondary font-medium">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-bee-yellow mb-2">24/7</div>
              <div className="text-text-secondary font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
