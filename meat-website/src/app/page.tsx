// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getAllRecipes } from '@/lib/contentUtils';
import RecipeGrid from '@/components/recipes/RecipeGrid';
import { CATEGORIES } from '@/lib/constants';

export default function Home() {
  // Get 4 featured recipes (at most 1 from each category)
  const featuredRecipes = CATEGORIES.flatMap(category => {
    const recipes = getAllRecipes(category.slug);
    return recipes.filter(recipe => recipe.featured).slice(0, 1);
  });
  
  return (
    <>
      {/* Hero Section - Optimized for mobile */}
      <section className="relative">
        {/* Hero Image with Overlay */}
        <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] max-h-[600px] w-full">
          <Image
            src="/images/hero.jpg"
            alt="Delicious steak with herbs"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                Delicious Meat-Based Recipes
              </h1>
              <p className="text-lg sm:text-xl text-white mb-6 max-w-md">
                High-protein recipes for every meal of the day
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/dinner"
                  className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  Explore Recipes
                </Link>
                <Link
                  href="/about"
                  className="bg-white text-red-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Explore Recipe Categories
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.map((category) => (
              <Link 
                key={category.slug} 
                href={`/${category.slug}`}
                className="group block relative rounded-lg overflow-hidden shadow-md h-48 sm:h-64"
              >
                <Image
                  src={`/images/${category.slug}.jpg`}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Recipes */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Featured Recipes
          </h2>
          <RecipeGrid recipes={featuredRecipes} />
          
          <div className="mt-8 text-center">
            <Link 
              href="/dinner" 
              className="inline-block bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View All Recipes
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-12 sm:py-16 bg-red-700 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Benefits of Meat-Based Nutrition
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-red-800/40 rounded-lg p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-white text-red-700 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">High Protein Content</h3>
              <p className="text-red-100">Complete proteins with all essential amino acids your body needs for muscle growth and repair.</p>
            </div>
            
            <div className="bg-red-800/40 rounded-lg p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-white text-red-700 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Essential Nutrients</h3>
              <p className="text-red-100">Rich in bioavailable iron, zinc, B vitamins and other nutrients that are difficult to obtain from plants.</p>
            </div>
            
            <div className="bg-red-800/40 rounded-lg p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-white text-red-700 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustained Energy</h3>
              <p className="text-red-100">Provides long-lasting energy without blood sugar spikes, keeping you fuller for longer periods.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Try Our Recipes?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our collection of delicious, high-protein meat-based recipes designed for optimal nutrition and amazing taste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/breakfast"
              className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Breakfast Recipes
            </Link>
            <Link
              href="/dinner"
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Dinner Ideas
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}