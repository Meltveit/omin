import Image from 'next/image';
import Link from 'next/link';
import { RecipeMetadata } from '@/types';

interface RecipeCardProps {
  recipe: RecipeMetadata;
  priority?: boolean;
}

export default function RecipeCard({ recipe, priority = false }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
      {/* Image container with fixed aspect ratio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover hover-scale"
          loading={priority ? "eager" : "lazy"}
          quality={75}
        />
        <div className="absolute top-3 right-3">
          <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded-full uppercase font-medium tracking-wide">
            {recipe.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{recipe.title}</h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{recipe.totalTime} min</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{recipe.servings}</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{recipe.protein}g protein</span>
          </div>
        </div>
        
        <Link 
          href={`/${recipe.category}/${recipe.slug}`}
          className="block w-full text-center bg-red-700 hover:bg-red-800 text-white text-sm font-medium py-2 px-4 rounded transition duration-150"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}