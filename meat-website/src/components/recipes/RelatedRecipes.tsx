import Link from 'next/link';
import Image from 'next/image';
import { RecipeMetadata } from '@/types';

interface RelatedRecipesProps {
  recipes: RecipeMetadata[];
}

export default function RelatedRecipes({ recipes }: RelatedRecipesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Link 
          key={`${recipe.category}-${recipe.slug}`} 
          href={`/${recipe.category}/${recipe.slug}`}
          className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow duration-300"
        >
          <div className="relative aspect-[16/9]">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-1 group-hover:text-red-700 transition-colors">
              {recipe.title}
            </h3>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{recipe.totalTime} min</span>
              <span>{recipe.protein}g protein</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}