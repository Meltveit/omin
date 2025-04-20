// src/components/recipes/RecipeIngredients.tsx
import PrintButton from '@/components/ui/PrintButton';

interface RecipeIngredientsProps {
  ingredients: string[];
}

export default function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-5 sticky top-4">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Ingredients</h2>
      <ul className="space-y-3">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block w-2 h-2 rounded-full bg-red-600 mt-2 mr-3 flex-shrink-0"></span>
            <span className="text-gray-700">{ingredient}</span>
          </li>
        ))}
      </ul>
      
      {/* Separate client component for interactive behavior */}
      <PrintButton />
    </div>
  );
}