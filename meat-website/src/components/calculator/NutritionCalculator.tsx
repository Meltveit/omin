'use client';

import { useState, useEffect } from 'react';
import { 
  NutritionItem, 
  searchIngredients 
} from '@/data/nutrition-database';

// Add viewport export separately
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

interface SelectedIngredient {
  item: NutritionItem;
  quantity: number; // in grams
}

const NutritionCalculator = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NutritionItem[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);
  const [activeTab, setActiveTab] = useState<'calculator' | 'nutrition'>('calculator');
  const [showAllNutrients, setShowAllNutrients] = useState(false);
  
  // Handle search
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const results = searchIngredients(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);
  
  // Add ingredient to selection
  const addIngredient = (ingredient: NutritionItem) => {
    setSelectedIngredients([
      ...selectedIngredients,
      { item: ingredient, quantity: 100 } // Default to 100g
    ]);
    setSearchQuery('');
    setSearchResults([]);
  };
  
  // Update quantity for an ingredient
  const updateQuantity = (index: number, newQuantity: number) => {
    const updated = [...selectedIngredients];
    updated[index].quantity = newQuantity;
    setSelectedIngredients(updated);
  };
  
  // Remove an ingredient
  const removeIngredient = (index: number) => {
    const updated = [...selectedIngredients];
    updated.splice(index, 1);
    setSelectedIngredients(updated);
  };
  
  // Calculate total nutrition
  const calculateTotalNutrition = () => {
    if (selectedIngredients.length === 0) return null;
    
    const totals = {
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      fiber: 0,
      vitamins: {
        vitaminA: 0,
        vitaminB1: 0,
        vitaminB2: 0,
        vitaminB3: 0,
        vitaminB6: 0,
        vitaminB12: 0,
        vitaminC: 0,
        vitaminD: 0,
        vitaminE: 0,
        vitaminK: 0,
      },
      minerals: {
        calcium: 0,
        iron: 0,
        magnesium: 0,
        phosphorus: 0,
        potassium: 0,
        sodium: 0,
        zinc: 0,
        selenium: 0,
      }
    };
    
    let totalWeight = 0;
    
    selectedIngredients.forEach(({ item, quantity }) => {
      const factor = quantity / item.servingSize;
      
      totals.calories += item.calories * factor;
      totals.protein += item.protein * factor;
      totals.fat += item.fat * factor;
      totals.carbs += item.carbs * factor;
      totals.fiber += item.fiber * factor;
      
      // Calculate vitamins
      for (const [key, value] of Object.entries(item.vitamins)) {
        totals.vitamins[key as keyof typeof totals.vitamins] += value * factor;
      }
      
      // Calculate minerals
      for (const [key, value] of Object.entries(item.minerals)) {
        totals.minerals[key as keyof typeof totals.minerals] += value * factor;
      }
      
      totalWeight += quantity;
    });
    
    return { ...totals, totalWeight };
  };
  
  // Calculate daily value percentages
  const calculateDailyValuePercent = (value: number, nutrient: string): number => {
    const dailyValues: {[key: string]: number} = {
      // Vitamins
      vitaminA: 900, // μg
      vitaminB1: 1.2, // mg
      vitaminB2: 1.3, // mg
      vitaminB3: 16, // mg
      vitaminB6: 1.7, // mg
      vitaminB12: 2.4, // μg
      vitaminC: 90, // mg
      vitaminD: 20, // μg
      vitaminE: 15, // mg
      vitaminK: 120, // μg
      
      // Minerals
      calcium: 1300, // mg
      iron: 18, // mg
      magnesium: 420, // mg
      phosphorus: 1250, // mg
      potassium: 4700, // mg
      sodium: 2300, // mg - upper limit
      zinc: 11, // mg
      selenium: 55, // μg
    };
    
    return Math.round((value / dailyValues[nutrient]) * 100);
  };
  
  const totalNutrition = calculateTotalNutrition();
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Nutrition Calculator</h2>
        <p className="text-gray-600">
          Calculate the complete nutritional profile of your meat-based meals, including vitamins and minerals.
        </p>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex -mb-px">
          <button
            className={`mr-4 py-2 px-1 font-medium text-sm ${
              activeTab === 'calculator'
                ? 'text-red-700 border-b-2 border-red-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('calculator')}
          >
            Calculator
          </button>
          <button
            className={`py-2 px-1 font-medium text-sm ${
              activeTab === 'nutrition'
                ? 'text-red-700 border-b-2 border-red-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('nutrition')}
            disabled={!totalNutrition}
          >
            Nutrition Facts
          </button>
        </div>
      </div>
      
      {activeTab === 'calculator' ? (
        <div>
          {/* Search Bar */}
          <div className="mb-6">
            <label htmlFor="ingredient-search" className="block text-sm font-medium text-gray-700 mb-1">
              Search for an ingredient:
            </label>
            <input
              type="text"
              id="ingredient-search"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="Type to search (e.g. 'beef', 'chicken')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-2 border border-gray-200 rounded-md shadow-sm max-h-60 overflow-auto">
                <ul className="divide-y divide-gray-200">
                  {searchResults.map((result) => (
                    <li key={result.id} className="p-2 hover:bg-gray-50 cursor-pointer" onClick={() => addIngredient(result)}>
                      <div className="font-medium">{result.name}</div>
                      <div className="text-sm text-gray-500">
                        {result.calories} kcal | {result.protein}g protein per {result.servingSize}{result.servingUnit}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Selected Ingredients */}
          <div>
            <h3 className="font-medium mb-3">Selected Ingredients:</h3>
            {selectedIngredients.length === 0 ? (
              <div className="text-gray-500 italic">No ingredients selected. Search and add ingredients above.</div>
            ) : (
              <div className="space-y-4">
                {selectedIngredients.map((selected, index) => (
                  <div key={`${selected.item.id}-${index}`} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md">
                    <div className="flex-grow">
                      <div className="font-medium">{selected.item.name}</div>
                      <div className="text-sm text-gray-500">
                        {Math.round(selected.item.calories * selected.quantity / 100)} kcal | 
                        {Math.round(selected.item.protein * selected.quantity / 100)}g protein
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="1"
                        className="w-20 p-1 border border-gray-300 rounded-md text-center"
                        value={selected.quantity}
                        onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 0)}
                      />
                      <span className="ml-1 text-sm text-gray-500">g</span>
                    </div>
                    
                    <button
                      className="p-1 text-red-600 hover:text-red-800"
                      onClick={() => removeIngredient(index)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Totals Summary */}
          {totalNutrition && (
            <div className="mt-6 bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold mb-2">Total Nutrition:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Calories</div>
                  <div className="font-bold text-lg">{Math.round(totalNutrition.calories)} kcal</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Protein</div>
                  <div className="font-bold text-lg">{Math.round(totalNutrition.protein)}g</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Fat</div>
                  <div className="font-bold text-lg">{Math.round(totalNutrition.fat)}g</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Carbs</div>
                  <div className="font-bold text-lg">{Math.round(totalNutrition.carbs)}g</div>
                </div>
              </div>
              <div className="mt-2 text-right">
                <button
                  onClick={() => setActiveTab('nutrition')}
                  className="text-sm text-red-700 hover:text-red-900 font-medium"
                >
                  View detailed nutrition →
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          {totalNutrition && (
            <div>
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h3 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2">Nutrition Facts</h3>
                <div className="text-sm mb-2">Total Weight: {Math.round(totalNutrition.totalWeight)}g</div>
                
                <div className="border-b border-gray-300 py-2 font-bold text-xl">
                  Calories: {Math.round(totalNutrition.calories)}
                </div>
                
                <div className="border-b border-gray-300 py-2">
                  <div className="flex justify-between">
                    <div>Total Fat</div>
                    <div className="font-bold">{Math.round(totalNutrition.fat)}g</div>
                  </div>
                </div>
                
                <div className="border-b border-gray-300 py-2">
                  <div className="flex justify-between">
                    <div>Total Carbohydrates</div>
                    <div className="font-bold">{Math.round(totalNutrition.carbs)}g</div>
                  </div>
                  <div className="flex justify-between pl-4 text-sm">
                    <div>Dietary Fiber</div>
                    <div>{Math.round(totalNutrition.fiber)}g</div>
                  </div>
                </div>
                
                <div className="border-b border-gray-300 py-2">
                  <div className="flex justify-between">
                    <div>Protein</div>
                    <div className="font-bold">{Math.round(totalNutrition.protein)}g</div>
                  </div>
                </div>
                
                {/* Vitamins */}
                <div className="py-2 mt-2">
                  <div className="font-bold mb-1">Vitamins</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-between">
                      <div>Vitamin A</div>
                      <div>{Math.round(totalNutrition.vitamins.vitaminA)}μg ({calculateDailyValuePercent(totalNutrition.vitamins.vitaminA, 'vitaminA')}%)</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Vitamin B12</div>
                      <div>{totalNutrition.vitamins.vitaminB12.toFixed(1)}μg ({calculateDailyValuePercent(totalNutrition.vitamins.vitaminB12, 'vitaminB12')}%)</div>
                    </div>
                    
                    {showAllNutrients && (
                      <>
                        <div className="flex justify-between">
                          <div>Vitamin B1</div>
                          <div>{totalNutrition.vitamins.vitaminB1.toFixed(2)}mg ({calculateDailyValuePercent(totalNutrition.vitamins.vitaminB1, 'vitaminB1')}%)</div>
                        </div>
                        <div className="flex justify-between">
                          <div>Vitamin B2</div>
                          <div>{totalNutrition.vitamins.vitaminB2.toFixed(2)}mg ({calculateDailyValuePercent(totalNutrition.vitamins.vitaminB2, 'vitaminB2')}%)</div>
                        </div>
                        <div className="flex justify-between">
                          <div>Vitamin B3</div>
                          <div>{totalNutrition.vitamins.vitaminB3.toFixed(1)}mg ({calculateDailyValuePercent(totalNutrition.vitamins.vitaminB3, 'vitaminB3')}%)</div>
                        </div>
                        <div className="flex justify-between">
                          <div>Vitamin B6</div>
                          <div>{totalNutrition.vitamins.vitaminB6.toFixed(2)}mg ({calculateDailyValuePercent(totalNutrition.vitamins.vitaminB6, 'vitaminB6')}%)</div>
                        </div>
                        <div className="flex justify-between">
                          <div>Vitamin C</div>
                          <div>{Math.round(totalNutrition.vitamins.vitaminC)}mg ({calculateDailyValuePercent(totalNutrition.vitamins.vitaminC, 'vitaminC')}%)</div>
                        </div>
                        <div className="flex justify-between">
                          <div>Vitamin D</div>
                          <div>{totalNutrition.vitamins.vitaminD.toFixed(1)}μg ({calculateDailyValuePercent(totalNutrition.vitamins.vitaminD, 'vitaminD')}%)</div>
                        </div>
                        <div className="flex justify-between">
                          <div>Vitamin E</div>
                          <div>{totalNutrition.vitamins.vitaminE.toFixed(1)}mg ({calculateDailyValuePercent(totalNutrition.vitamins.vitaminE, 'vitaminE')}%)</div>
                        </div>
                        <div className="flex justify-between">
                          <div>Vitamin K</div>
                          <div>{totalNutrition.vitamins.vitaminK.toFixed(1)}μg ({calculateDailyValuePercent(totalNutrition.vitamins.vitaminK, 'vitaminK')}%)</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Minerals */}
                <div className="py-2 mt-2">
                  <div className="font-bold mb-1">Minerals</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-between">
                      <div>Iron</div>
                      <div>{totalNutrition.minerals.iron.toFixed(1)}mg ({calculateDailyValuePercent(totalNutrition.minerals.iron, 'iron')}%)</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Zinc</div>
                      <div>{totalNutrition.minerals.zinc.toFixed(1)}mg ({calculateDailyValuePercent(totalNutrition.minerals.zinc, 'zinc')}%)</div>
                    </div>
                    
                    {showAllNutrients && (
                      <>
                        <div className="flex justify-between">
                          <div>Calcium</div>
                          <div>{Math.round(totalNutrition.minerals.calcium)}mg ({calculateDailyValuePercent(totalNutrition.minerals.calcium, 'calcium')}%)</div>
                        </div>
                        <div className="flex justify-between">
                          <div>Magnesium</div>
                          <div>{Math.round(totalNutrition.minerals.magnesium)}mg ({calculateDailyValuePercent(totalNutrition.minerals.magnesium, 'magnesium')}%)</div>
                        </div>
                        <div className="flex justify-between">
                          <div>Phosphorus</div>
                          <div>{Math.round(totalNutrition.minerals.phosphorus)}mg ({calculateDailyValuePercent(totalNutrition.minerals.phosphorus, 'phosphorus')}%)</div>
                        </div>
                        <div className="flex justify-between">
                          <div>Potassium</div>
                          <div>{Math.round(totalNutrition.minerals.potassium)}mg ({calculateDailyValuePercent(totalNutrition.minerals.potassium, 'potassium')}%)</div>
                        </div>
                        <div className="flex justify-between">
                          <div>Sodium</div>
                          <div>{Math.round(totalNutrition.minerals.sodium)}mg ({calculateDailyValuePercent(totalNutrition.minerals.sodium, 'sodium')}%)</div>
                        </div>
                        <div className="flex justify-between">
                          <div>Selenium</div>
                          <div>{totalNutrition.minerals.selenium.toFixed(1)}μg ({calculateDailyValuePercent(totalNutrition.minerals.selenium, 'selenium')}%)</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <button
                    onClick={() => setShowAllNutrients(!showAllNutrients)}
                    className="text-sm text-red-700 hover:text-red-900 font-medium"
                  >
                    {showAllNutrients ? 'Show less nutrients' : 'Show all nutrients'}
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                * Daily Value percentages are based on a 2,000 calorie diet.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NutritionCalculator;