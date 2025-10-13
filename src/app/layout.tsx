import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bee Intelly Sites - Modern Website Templates",
  description: "Build stunning websites with our collection of modern, responsive templates. Fast, beautiful, and developer-friendly website building platform.",
  keywords: ["website templates", "website builder", "responsive design", "modern websites", "web development"],
  authors: [{ name: "Bee Intelly" }],
  creator: "Bee Intelly",
  publisher: "Bee Intelly",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://beeintelly.com",
    title: "Bee Intelly Sites - Modern Website Templates",
    description: "Build stunning websites with our collection of modern, responsive templates.",
    siteName: "Bee Intelly Sites",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bee Intelly Sites - Modern Website Templates",
    description: "Build stunning websites with our collection of modern, responsive templates.",
    creator: "@beeintelly",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFD600" },
    { media: "(prefers-color-scheme: dark)", color: "#FFD600" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
