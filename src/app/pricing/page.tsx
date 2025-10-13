import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-bee-yellow/5 via-transparent to-bee-yellow/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Simple, Transparent <span className="text-bee-yellow">Pricing</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-12">
              Choose the perfect plan for your website needs. All plans include our premium templates and professional support.
            </p>
          </div>
        </section>

        {/* Website Design Packages */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                🟡 Once-Off Website Design Fees
              </h2>
              <p className="text-text-secondary text-lg">
                Professional website design with modern templates and responsive layouts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Starter Page */}
              <div className="bg-card-background rounded-xl p-8 border border-border hover:border-bee-yellow transition-colors duration-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Starter Page</h3>
                  <div className="text-3xl font-bold text-bee-yellow mb-2">R1,500 – R2,500</div>
                  <p className="text-text-secondary">1 Page (Landing)</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Mobile-friendly design
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Contact form integration
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Basic SEO optimization
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Social media integration
                  </li>
                </ul>
                <button className="w-full py-3 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200">
                  Get Started
                </button>
              </div>

              {/* Business Lite */}
              <div className="bg-card-background rounded-xl p-8 border-2 border-bee-yellow relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-bee-yellow text-dark-charcoal px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Business Lite</h3>
                  <div className="text-3xl font-bold text-bee-yellow mb-2">R3,500 – R5,000</div>
                  <p className="text-text-secondary">Up to 3 Pages</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Home, About, Services pages
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Standard design template
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Contact forms & maps
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Google Analytics setup
                  </li>
                </ul>
                <button className="w-full py-3 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200">
                  Get Started
                </button>
              </div>

              {/* Professional Site */}
              <div className="bg-card-background rounded-xl p-8 border border-border hover:border-bee-yellow transition-colors duration-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Professional Site</h3>
                  <div className="text-3xl font-bold text-bee-yellow mb-2">R6,000 – R8,000</div>
                  <p className="text-text-secondary">5 Pages</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Custom design template
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Blog/Portfolio included
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Advanced SEO optimization
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Content management system
                  </li>
                </ul>
                <button className="w-full py-3 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200">
                  Get Started
                </button>
              </div>
            </div>

            {/* Additional Packages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
              {/* Business Stacks */}
              <div className="bg-card-background rounded-xl p-8 border border-border hover:border-bee-yellow transition-colors duration-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Business Stacks</h3>
                  <div className="text-3xl font-bold text-bee-yellow mb-2">R9,000 – R15,000</div>
                  <p className="text-text-secondary">6–10 Pages</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Premium UI/UX design
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    SEO + Forms + Gallery
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Advanced functionality
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Multi-language support
                  </li>
                </ul>
                <button className="w-full py-3 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200">
                  Get Started
                </button>
              </div>

              {/* E-commerce */}
              <div className="bg-card-background rounded-xl p-8 border border-border hover:border-bee-yellow transition-colors duration-200">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">E-commerce</h3>
                  <div className="text-3xl font-bold text-bee-yellow mb-2">R15,000 – R30,000</div>
                  <p className="text-text-secondary">Unlimited Pages</p>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Full online store
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Payment integration
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Product management
                  </li>
                  <li className="flex items-center text-text-secondary">
                    <span className="text-bee-yellow mr-2">✓</span>
                    Admin dashboard
                  </li>
                </ul>
                <button className="w-full py-3 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200">
                  Get Started
                </button>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-bee-yellow font-semibold text-lg">
                ✅ First month hosting & maintenance is FREE with any package!
              </p>
            </div>
          </div>
        </section>

        {/* Hosting & Maintenance */}
        <section className="py-20 bg-card-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                🟢 Monthly Hosting + Maintenance
              </h2>
              <p className="text-text-secondary text-lg">
                Starts at R200 per month with comprehensive support
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-background rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">What's Included:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="text-bee-yellow mr-3">✓</span>
                      <span className="text-text-secondary">Free updates (basic text/image changes)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-bee-yellow mr-3">✓</span>
                      <span className="text-text-secondary">Website monitoring</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-bee-yellow mr-3">✓</span>
                      <span className="text-text-secondary">Tech support via WhatsApp/Email</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="text-bee-yellow mr-3">✓</span>
                      <span className="text-text-secondary">Backup & security checks</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-bee-yellow mr-3">✓</span>
                      <span className="text-text-secondary">SSL certificate</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-bee-yellow mr-3">✓</span>
                      <span className="text-text-secondary">Performance optimization</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hosting Tiers */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Hosting Options</h3>
                <p className="text-text-secondary">Choose the hosting plan that fits your needs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-background rounded-lg p-6 border border-border">
                  <h4 className="font-bold text-foreground mb-2">Silver</h4>
                  <div className="text-bee-yellow font-bold text-xl mb-2">R279/month</div>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>2GB Storage</li>
                    <li>50 Email Accounts</li>
                    <li>1 Database</li>
                    <li>Free Domain</li>
                  </ul>
                </div>
                <div className="bg-background rounded-lg p-6 border border-border">
                  <h4 className="font-bold text-foreground mb-2">Gold</h4>
                  <div className="text-bee-yellow font-bold text-xl mb-2">R289/month</div>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>3GB Storage</li>
                    <li>75 Email Accounts</li>
                    <li>1 Database</li>
                    <li>Free Domain</li>
                  </ul>
                </div>
                <div className="bg-background rounded-lg p-6 border border-border">
                  <h4 className="font-bold text-foreground mb-2">Platinum</h4>
                  <div className="text-bee-yellow font-bold text-xl mb-2">R299/month</div>
                  <ul className="text-sm text-text-secondary space-y-1">
                    <li>4GB Storage</li>
                    <li>200 Email Accounts</li>
                    <li>5 Databases</li>
                    <li>Free Domain</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and custom quote for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200">
                Get Free Quote
              </button>
              <button className="px-8 py-4 border-2 border-bee-yellow text-bee-yellow font-semibold rounded-lg hover:bg-bee-yellow hover:text-dark-charcoal transition-colors duration-200">
                View Templates
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
