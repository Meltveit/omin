// src/components/recipes/RecipeGrid.tsx
import { RecipeMetadata } from '@/types';
import RecipeCard from './RecipeCard';

interface RecipeGridProps {
  recipes: RecipeMetadata[];
  priority?: boolean;
}

export default function RecipeGrid({ recipes, priority = false }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-medium text-gray-600 mb-2">No recipes found</h3>
          <p className="text-gray-500">Check back soon for new recipes!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <RecipeCard 
          key={`${recipe.category}-${recipe.slug}`} 
          recipe={recipe} 
          priority={priority && index < 4} // Only prioritize loading for first 4 items if priority is true
        />
      ))}
    </div>
  );
}