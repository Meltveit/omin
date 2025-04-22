import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { getRecipeBySlug, getAllRecipes } from '@/lib/contentUtils';
import RecipeHeader from '@/components/recipes/RecipeHeader';
import RecipeIngredients from '@/components/recipes/RecipeIngredients';
import RecipeInstructions from '@/components/recipes/RecipeInstructions';
import RecipeSchema from '@/components/seo/RecipeSchema';
import RelatedRecipes from '@/components/recipes/RelatedRecipes';
import NutritionFacts from '@/components/calculator/NutritionFacts';

// Define the return type for generateStaticParams
type StaticParams = Array<{
  category: string;
  slug: string;
}>;

// Generate static paths for all recipes
export async function generateStaticParams(): Promise<StaticParams> {
  const categories = ['breakfast', 'lunch', 'dinner', 'snacks'] as const;
  const params: StaticParams = [];
  
  for (const category of categories) {
    const recipes = getAllRecipes(category);
    recipes.forEach(recipe => {
      params.push({ category, slug: recipe.slug });
    });
  }
  
  return params;
}

// Generate metadata for each recipe
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  
  const recipe = getRecipeBySlug(category, slug);
  
  if (!recipe) {
    return {
      title: 'Recipe Not Found',
      description: 'The requested recipe could not be found.',
    };
  }
  
  // Create a description that includes key recipe details
  const metaDescription = `${recipe.title} - A delicious ${category} recipe with ${recipe.protein}g of protein per serving. Ready in just ${recipe.totalTime} minutes. Perfect for ${category === 'breakfast' ? 'starting your day' : category === 'lunch' ? 'midday meals' : category === 'dinner' ? 'evening meals' : 'a protein-packed snack'}.`;
  
  return {
    title: `${recipe.title} (${recipe.totalTime} min) | High-Protein Recipe`,
    description: metaDescription,
    openGraph: {
      title: recipe.title,
      description: metaDescription,
      type: 'article',
      url: `https://meatmaster.com/${category}/${slug}`,
      images: [
        {
          url: recipe.image,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
      publishedTime: recipe.date,
      section: category,
      tags: ['meat recipes', 'high protein', category, recipe.title.toLowerCase()],
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: metaDescription,
      images: [recipe.image],
    },
    alternates: {
      canonical: `https://meatmaster.com/${category}/${slug}`,
    },
  };
}

// Main page component
export default async function RecipePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  
  const recipe = getRecipeBySlug(category, slug);
  
  if (!recipe) {
    return notFound();
  }
  
  // Get 3 related recipes from the same category
  const allCategoryRecipes = getAllRecipes(category);
  const relatedRecipes = allCategoryRecipes
    .filter(r => r.slug !== slug)
    .slice(0, 3);
  
  return (
    <article className="pb-12">
      {/* Add structured data for recipe */}
      <RecipeSchema recipe={recipe} />
      
      {/* Hero Image */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={85}
        />
      </div>
      
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {/* Recipe Header with Title and Meta Info */}
          <RecipeHeader recipe={recipe} />
          
          {/* Two Column Layout for Desktop */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ingredients Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <RecipeIngredients ingredients={recipe.ingredients} />
              
              {/* Add Nutrition Facts */}
              <div className="mt-8">
                <NutritionFacts recipe={recipe} showDetailed={true} />
                
                <div className="mt-6 text-center">
                  <Link 
                    href="/nutrition-calculator" 
                    className="inline-block text-sm text-white bg-red-700 hover:bg-red-800 rounded-md py-2 px-4 font-medium transition-colors"
                  >
                    Customize nutrition with calculator
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Main Content - Instructions and Body */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <RecipeInstructions instructions={recipe.instructions} />
              
              {/* Recipe Content */}
              <div className="mt-8 prose prose-red max-w-none">
                <MDXRemote source={recipe.content} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="mt-16 container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <RelatedRecipes recipes={relatedRecipes} />
        </section>
      )}
    </article>
  );
}