import { RecipeContent } from '@/types';

interface NutritionFactsProps {
  recipe: RecipeContent;
  showDetailed?: boolean;
}

const NutritionFacts = ({ recipe, showDetailed = false }: NutritionFactsProps) => {
  // Assuming recipe has additional nutrition data from your database
  // This would come from your extended recipe type that includes vitamin and mineral information
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-2 border-b border-gray-300 pb-1">Nutrition Facts</h3>
      <div className="text-sm text-gray-500 mb-2">Per serving</div>
      
      <div className="border-b border-gray-300 py-2 font-bold text-lg">
        Calories: {recipe.calories}
      </div>
      
      {/* Macronutrients - These would come from your extended recipe data */}
      <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-300">
        <div>
          <div className="text-gray-500 text-sm">Protein</div>
          <div className="font-bold">{recipe.protein}g</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Fat</div>
          <div className="font-bold">{recipe.fat || '0'}g</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm">Carbs</div>
          <div className="font-bold">{recipe.carbs || '0'}g</div>
        </div>
      </div>
      
      {/* Detailed nutrition info - This is where you'd add vitamin and mineral data */}
      {showDetailed && recipe.nutrition && (
        <div className="mt-4">
          <div className="font-bold mb-2 text-sm">Vitamins</div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            {recipe.nutrition.vitamins && Object.entries(recipe.nutrition.vitamins).map(([name, value]) => (
              <div key={name} className="flex justify-between">
                <div className="text-gray-600">{formatNutrientName(name)}</div>
                <div>{formatNutrientValue(value, name)}</div>
              </div>
            ))}
          </div>
          
          <div className="font-bold mb-2 mt-4 text-sm">Minerals</div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            {recipe.nutrition.minerals && Object.entries(recipe.nutrition.minerals).map(([name, value]) => (
              <div key={name} className="flex justify-between">
                <div className="text-gray-600">{formatNutrientName(name)}</div>
                <div>{formatNutrientValue(value, name)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {showDetailed && (
        <div className="mt-4 text-center">
          
            href="/nutrition-calculator"
            className="text-sm text-red-700 hover:text-red-900 font-medium"
          >
            Calculate full nutrition with our calculator →
          </a>
        </div>
      )}
    </div>
  );
};

// Helper function to format nutrient names for display
function formatNutrientName(name: string): string {
  // Convert camelCase to Title Case with spaces
  const formatted = name.replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
  
  // Special cases for vitamins
  if (name.startsWith('vitamin')) {
    return formatted.replace('Vitamin ', 'Vitamin ');
  }
  
  return formatted;
}

// Helper function to format nutrient values with appropriate units
function formatNutrientValue(value: number, name: string): string {
  // Define which nutrients use which units
  const microgramNutrients = ['vitaminA', 'vitaminB12', 'vitaminD', 'vitaminK', 'selenium'];
  const milligramNutrients = ['vitaminB1', 'vitaminB2', 'vitaminB3', 'vitaminB6', 'vitaminC', 'vitaminE', 
                              'calcium', 'iron', 'magnesium', 'phosphorus', 'potassium', 'sodium', 'zinc'];
  
  if (microgramNutrients.includes(name)) {
    return `${value.toFixed(1)}μg`;
  } else if (milligramNutrients.includes(name)) {
    return `${value.toFixed(1)}mg`;
  }
  
  // Default formatting for other nutrients
  return `${value.toFixed(1)}`;
}

export default NutritionFacts;