import { Metadata } from 'next';
import { getAllRecipes, getAllCategories } from '@/lib/contentUtils';
import RecipeGrid from '@/components/recipes/RecipeGrid';
import CategoryBanner from '@/components/ui/CategoryBanner';
import { notFound } from 'next/navigation';
import { CATEGORY_INFO, type CategoryKey } from '@/lib/constants';

// Add viewport export to fix the warning
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// This generates the static paths for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map(category => ({ category }));
}

// Helper function to check if the category is valid
function isValidCategory(category: string): category is CategoryKey {
  return category in CATEGORY_INFO;
}

// Generate metadata for the category page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params; // Await params to get category
  
  // Check if category exists
  if (!isValidCategory(category)) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }
  
  const info = CATEGORY_INFO[category];
  
  return {
    title: info.title,
    description: info.metaDescription,
    openGraph: {
      title: info.title,
      description: info.metaDescription,
      type: 'website',
      url: `https://meatmaster.com/${category}`,
      images: [
        {
          url: `/images/${category}.jpg`,
          width: 1200,
          height: 630,
          alt: `${info.title} - MeatMaster`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: info.title,
      description: info.metaDescription,
      images: [`/images/${category}.jpg`],
    },
    alternates: {
      canonical: `https://meatmaster.com/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params; // Await params to get category
  
  // Check if category exists
  if (!isValidCategory(category)) {
    return notFound();
  }
  
  const recipes = getAllRecipes(category);
  const info = CATEGORY_INFO[category];
  
  return (
    <>
      <CategoryBanner 
        title={info.title}
        description={info.description}
        imageUrl={`/images/${category}.jpg`}
      />
      
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-700 mb-4 sm:mb-0">
              <span className="font-semibold">{recipes.length}</span> recipes found
            </p>
          </div>
          
          <RecipeGrid recipes={recipes} />
        </div>
      </section>
    </>
  );
}