import { RecipeContent } from '@/types';

interface RecipeSchemaProps {
  recipe: RecipeContent;
}

export default function RecipeSchema({ recipe }: RecipeSchemaProps) {
  // Format dates for schema
  const datePublished = new Date(recipe.date).toISOString();
  
  // Create the schema data object
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    author: {
      '@type': 'Organization',
      name: 'MeatMaster'
    },
    datePublished: datePublished,
    image: [
      `https://meatmaster.com${recipe.image}`
    ],
    recipeCategory: recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1),
    recipeCuisine: 'Meat-based',
    keywords: `${recipe.category}, high protein, meat recipe, ${recipe.title.toLowerCase()}`,
    recipeYield: `${recipe.servings} serving${recipe.servings > 1 ? 's' : ''}`,
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${recipe.totalTime}M`,
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${recipe.calories} calories`,
      proteinContent: `${recipe.protein}g`
    },
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((step, index) => ({
      '@type': 'HowToStep',
      name: `Step ${index + 1}`,
      text: step,
      position: index + 1
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '25'
    },
    suitableForDiet: 'HighProteinDiet'
  };

  // Return the schema as a script tag
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}