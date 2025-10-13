import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TemplateGallery from "@/components/TemplateGallery";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TemplateGallery />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
