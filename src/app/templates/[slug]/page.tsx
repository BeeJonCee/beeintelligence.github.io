import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import TemplateDetailsClient from "./template-details-client";

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

// Generate static params for all templates
export async function generateStaticParams() {
  try {
    const response = await fetch('http://localhost:3001/api/templates?limit=1000', {
      cache: 'force-cache',
    });
    if (!response.ok) return [];
    const data = await response.json();
    return (data.data || []).map((template: Template) => ({
      slug: template.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default function TemplateDetailsPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <TemplateDetailsClient slug={params.slug} />
      </main>
      <Footer />
    </div>
  );
}
