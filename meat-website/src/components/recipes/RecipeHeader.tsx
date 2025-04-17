import { RecipeContent } from '@/types';

interface RecipeHeaderProps {
  recipe: RecipeContent;
}

export default function RecipeHeader({ recipe }: RecipeHeaderProps) {
  // Format date for display
  const formattedDate = new Date(recipe.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-2 text-xs font-medium">
        <span className="bg-red-100 text-red-800 rounded-full px-3 py-1 uppercase tracking-wide">
          {recipe.category}
        </span>
        <time dateTime={recipe.date} className="text-gray-500">
          {formattedDate}
        </time>
      </div>
      
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        {recipe.title}
      </h1>
      
      <p className="text-gray-600 text-lg mb-6">
        {recipe.description}
      </p>
      
      <div className="flex flex-wrap gap-2 sm:gap-4">
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-medium">
            <span className="text-gray-900">{recipe.prepTime} min</span>
            <span className="text-gray-500 mx-1">prep</span>
          </span>
        </div>
        
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-xs font-medium">
            <span className="text-gray-900">{recipe.cookTime} min</span>
            <span className="text-gray-500 mx-1">cook</span>
          </span>
        </div>
        
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs font-medium">
            <span className="text-gray-900">{recipe.servings}</span>
            <span className="text-gray-500 mx-1">servings</span>
          </span>
        </div>
        
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs font-medium">
            <span className="text-gray-900">{recipe.calories}</span>
            <span className="text-gray-500 mx-1">calories</span>
          </span>
        </div>
        
        <div className="flex items-center bg-red-100 rounded-full px-3 py-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-xs font-medium">
            <span className="text-red-800">{recipe.protein}g</span>
            <span className="text-red-700 mx-1">protein</span>
          </span>
        </div>
      </div>
    </div>
  );
}