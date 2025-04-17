'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import NutritionEditor from '@/components/admin/NutritionEditor';
import { RecipeContent, NutritionInformation } from '@/types';

export default function RecipeEditorPage() {
  const searchParams = useSearchParams();
  const recipeId = searchParams.get('id');
  const categoryId = searchParams.get('category');
  
  const [recipe, setRecipe] = useState<RecipeContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Dette ville fetche oppskriftsdata fra API-et ditt
  useEffect(() => {
    const fetchRecipe = async () => {
      if (recipeId && categoryId) {
        try {
          // I en virkelig app ville du hente data fra API
          const response = await fetch(`/api/recipes/${categoryId}/${recipeId}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch recipe');
          }
          
          const data = await response.json();
          setRecipe(data.recipe);
        } catch (error) {
          console.error('Error fetching recipe:', error);
        } finally {
          setLoading(false);
        }
      } else {
        // Ny oppskrift
        setRecipe({
          title: '',
          slug: '',
          category: categoryId || 'breakfast',
          description: '',
          date: new Date().toISOString().split('T')[0],
          image: '',
          prepTime: 0,
          cookTime: 0,
          totalTime: 0,
          servings: '',
          calories: 0,
          protein: 0,
          fat: 0,
          carbs: 0,
          ingredients: [],
          instructions: [],
          content: '',
          nutrition: {
            calories: 0,
            protein: 0,
            fat: 0,
            carbs: 0,
            fiber: 0,
            vitamins: {},
            minerals: {}
          }
        });
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [recipeId, categoryId]);
  
  const handleNutritionSave = (nutritionData: NutritionInformation) => {
    if (recipe) {
      setRecipe({
        ...recipe,
        calories: nutritionData.calories,
        protein: nutritionData.protein,
        fat: nutritionData.fat,
        carbs: nutritionData.carbs,
        nutrition: nutritionData
      });
    }
  };
  
  const handleSaveRecipe = async () => {
    // Here you would implement saving the recipe
    // You could use the router to navigate after saving
    try {
      if (!recipe) return;
      
      // Example API call:
      // const response = await fetch('/api/recipes', {
      //   method: recipeId ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(recipe)
      // });
      
      // if (response.ok) {
      //   // Success - you could use router.push() here to navigate
      //   router.push(`/${recipe.category}`);
      // }
      
      // For now, just show an alert
      alert('Recipe saved successfully! (This is just a mock implementation)');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
      </div>
    );
  }
  
  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          Recipe not found. Please try again or create a new recipe.
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {recipeId ? `Edit Recipe: ${recipe.title}` : 'Create New Recipe'}
      </h1>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('basic')}
            className={`${
              activeTab === 'basic'
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Basic Info
          </button>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`${
              activeTab === 'ingredients'
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Ingredients & Instructions
          </button>
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`${
              activeTab === 'nutrition'
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Nutrition
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`${
              activeTab === 'content'
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Content
          </button>
        </nav>
      </div>
      
      {/* Basic Info Tab */}
      {activeTab === 'basic' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Her ville du ha form-feltene for grunnleggende oppskriftsinformasjon */}
          <p className="text-gray-500 italic">Form for basic recipe information would go here</p>
        </div>
      )}
      
      {/* Ingredients Tab */}
      {activeTab === 'ingredients' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Her ville du ha form-feltene for ingredienser og instruksjoner */}
          <p className="text-gray-500 italic">Form for ingredients and instructions would go here</p>
        </div>
      )}
      
      {/* Nutrition Tab */}
      {activeTab === 'nutrition' && (
        <NutritionEditor 
          initialData={recipe.nutrition || {
            calories: recipe.calories,
            protein: recipe.protein,
            fat: recipe.fat || 0,
            carbs: recipe.carbs || 0,
            fiber: 0,
            vitamins: {},
            minerals: {}
          }} 
          onSave={handleNutritionSave} 
        />
      )}
      
      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Her ville du ha innholdsredigeringen, kanskje en markdown-editor */}
          <p className="text-gray-500 italic">Markdown editor for recipe content would go here</p>
        </div>
      )}
      
      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleSaveRecipe}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none"
        >
          Save Recipe
        </button>
      </div>
    </div>
  );
}