import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-bee-yellow/5 via-transparent to-bee-yellow/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              About <span className="text-bee-yellow">Bee Intelly</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
              We're revolutionizing website creation with modern, responsive templates that combine speed, modularity, and developer-friendly architecture.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Bee Intelly Sites is a modern, template-based website building platform where users can browse, preview, and later customize responsive website templates. Inspired by tools like Zoho Sites, Wix, and Webflow, we focus on speed, modularity, and a clean developer-friendly architecture.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="w-16 h-16 bg-bee-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Speed</h3>
                  <p className="text-text-secondary">
                    Lightning-fast template loading and preview functionality for the best user experience.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-bee-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧩</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Modularity</h3>
                  <p className="text-text-secondary">
                    Clean, modular architecture that makes customization and maintenance effortless.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-bee-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👨‍💻</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Developer-Friendly</h3>
                  <p className="text-text-secondary">
                    Built with modern technologies and best practices for developers of all skill levels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="py-20 bg-card-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Technology Stack
              </h2>
              <p className="text-lg text-text-secondary">
                Built with cutting-edge technologies for optimal performance and scalability
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Frontend */}
                <div className="bg-background rounded-xl p-8 border border-border">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-bee-yellow rounded-lg flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-dark-charcoal">⚛️</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Frontend</h3>
                  </div>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• Next.js 15 with App Router</li>
                    <li>• React 19 with TypeScript</li>
                    <li>• TailwindCSS v4</li>
                    <li>• Poppins Typography</li>
                    <li>• Responsive Design</li>
                  </ul>
                </div>

                {/* Backend */}
                <div className="bg-background rounded-xl p-8 border border-border">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-bee-yellow rounded-lg flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-dark-charcoal">🚀</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Backend</h3>
                  </div>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• Node.js + Express</li>
                    <li>• RESTful API Design</li>
                    <li>• Joi Validation</li>
                    <li>• Helmet Security</li>
                    <li>• Rate Limiting</li>
                  </ul>
                </div>

                {/* Database */}
                <div className="bg-background rounded-xl p-8 border border-border">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-bee-yellow rounded-lg flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-dark-charcoal">🗄️</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Database</h3>
                  </div>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• Neon Serverless PostgreSQL</li>
                    <li>• Drizzle ORM</li>
                    <li>• Type-safe Schema</li>
                    <li>• Easy Migrations</li>
                    <li>• SQLite Development</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design System */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Design System
              </h2>
              <p className="text-lg text-text-secondary">
                A carefully crafted color palette and typography system for consistent, beautiful experiences
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Color Palette */}
                <div className="bg-card-background rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Color Palette</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-bee-yellow rounded-lg mr-4"></div>
                      <div>
                        <div className="font-semibold text-foreground">Bee Yellow</div>
                        <div className="text-text-secondary text-sm">#FFD600 - Primary brand color</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-dark-charcoal rounded-lg mr-4"></div>
                      <div>
                        <div className="font-semibold text-foreground">Dark Charcoal</div>
                        <div className="text-text-secondary text-sm">#121212 - Background</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-graphite-black rounded-lg mr-4"></div>
                      <div>
                        <div className="font-semibold text-foreground">Graphite Black</div>
                        <div className="text-text-secondary text-sm">#1A1A1A - Cards</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-off-white rounded-lg mr-4"></div>
                      <div>
                        <div className="font-semibold text-foreground">Off-White</div>
                        <div className="text-text-secondary text-sm">#E0E0E0 - Text</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Typography */}
                <div className="bg-card-background rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-6">Typography</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-2xl font-bold text-foreground mb-2">Poppins</div>
                      <div className="text-text-secondary text-sm">Primary font - Bold, geometric sans-serif</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-foreground mb-2">Geist Mono</div>
                      <div className="text-text-secondary text-sm">Code font - Clean monospace</div>
                    </div>
                    <div>
                      <div className="text-base text-foreground mb-2">Futuristic, energetic, clean</div>
                      <div className="text-text-secondary text-sm">Inspired by Spotify + Bumble + Tesla UI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-20 bg-card-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Development Roadmap
              </h2>
              <p className="text-lg text-text-secondary">
                Our journey from concept to comprehensive platform
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {/* Phase 1 */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-bee-yellow rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-dark-charcoal font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Phase 1 - Template Gallery (Current)</h3>
                    <ul className="text-text-secondary space-y-1">
                      <li>• View gallery of available templates</li>
                      <li>• Preview full templates live</li>
                      <li>• Read template details (industry, style, layout)</li>
                      <li>• Responsive design and filtering</li>
                    </ul>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent-grey rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-off-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Phase 2 - User System</h3>
                    <ul className="text-text-secondary space-y-1">
                      <li>• User authentication system</li>
                      <li>• User dashboards</li>
                      <li>• Template favorites and collections</li>
                      <li>• User preferences and settings</li>
                    </ul>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent-grey rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                    <span className="text-off-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Phase 3 - Editor & Publishing</h3>
                    <ul className="text-text-secondary space-y-1">
                      <li>• Drag-and-drop template editor</li>
                      <li>• Template duplication and customization</li>
                      <li>• Publishing and hosting options</li>
                      <li>• Export functionality</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Join Our Journey
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Be part of the future of website creation. Start exploring our templates today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-bee-yellow text-dark-charcoal font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200">
                Browse Templates
              </button>
              <button className="px-8 py-4 border-2 border-bee-yellow text-bee-yellow font-semibold rounded-lg hover:bg-bee-yellow hover:text-dark-charcoal transition-colors duration-200">
                View Pricing
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
