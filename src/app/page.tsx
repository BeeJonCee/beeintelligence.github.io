import Header from "@/src/components/Header";
import Hero from "@/src/components/Hero";
import TemplateGallery from "@/src/components/TemplateGallery";
import Features from "@/src/components/Features";
import Footer from "@/src/components/Footer";

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
