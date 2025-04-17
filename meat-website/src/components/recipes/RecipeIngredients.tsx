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
        
        {/* Print button for mobile */}
        <button 
          onClick={() => window.print()} 
          className="mt-6 w-full flex items-center justify-center text-gray-700 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Recipe
        </button>
      </div>
    );
  }