import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: true,
  variable: '--font-inter',
});

// Define metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://meatmaster.com'),
  title: {
    default: 'MeatMaster | High-Protein Meat-Based Recipes',
    template: '%s | MeatMaster'
  },
  description: 'Discover delicious meat-based recipes with high protein content. Perfect for keto, carnivore, and protein-focused diets.',
  keywords: ['meat recipes', 'high protein', 'keto', 'carnivore diet', 'protein recipes', 'meat-based recipes'],
  authors: [{ name: 'MeatMaster Team' }],
  creator: 'MeatMaster',
  publisher: 'MeatMaster',
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://meatmaster.com',
    siteName: 'MeatMaster',
    title: 'MeatMaster | High-Protein Meat-Based Recipes',
    description: 'Discover delicious meat-based recipes with high protein content. Perfect for keto, carnivore, and protein-focused diets.',
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'MeatMaster - High-Protein Meat-Based Recipes'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MeatMaster | High-Protein Meat-Based Recipes',
    description: 'Discover delicious meat-based recipes with high protein content.',
    images: ['/images/twitter-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Inline critical CSS */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Critical CSS for above-the-fold content */
          body {
            margin: 0;
            padding: 0;
            font-family: var(--font-inter), system-ui, sans-serif;
            text-rendering: optimizeSpeed;
            background: #ffffff;
            color: #111827;
          }
          .container {
            width: 100%;
            padding-left: 1rem;
            padding-right: 1rem;
            margin-left: auto;
            margin-right: auto;
          }
          header {
            position: sticky;
            top: 0;
            z-index: 50;
            background-color: rgba(255, 255, 255, 0.95);
          }
          @media (min-width: 640px) {
            .container {
              padding-left: 2rem;
              padding-right: 2rem;
            }
          }
          /* Critical header and hero styles */
        `}} />
        
        {/* Preload hero image for homepage */}
        <link 
          rel="preload" 
          href="/images/hero.jpg" 
          as="image" 
          media="(min-width: 640px)" 
        />
      </head>
      <body className="flex flex-col min-h-screen bg-white text-gray-900 antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}