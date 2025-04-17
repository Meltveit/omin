'use client';

import { useState } from 'react';
import { NutritionInformation } from '@/types';

interface NutritionEditorProps {
  initialData: NutritionInformation;
  onSave: (data: NutritionInformation) => void;
}

const NutritionEditor = ({ initialData, onSave }: NutritionEditorProps) => {
  const [nutritionData, setNutritionData] = useState<NutritionInformation>(initialData);
  const [activeTab, setActiveTab] = useState<'macros' | 'vitamins' | 'minerals'>('macros');
  
  const handleChange = (
    category: 'main' | 'vitamins' | 'minerals',
    field: string,
    value: string
  ) => {
    const numValue = parseFloat(value);
    
    if (category === 'main') {
      setNutritionData({
        ...nutritionData,
        [field]: isNaN(numValue) ? 0 : numValue
      });
    } else if (category === 'vitamins') {
      setNutritionData({
        ...nutritionData,
        vitamins: {
          ...nutritionData.vitamins,
          [field]: isNaN(numValue) ? 0 : numValue
        }
      });
    } else if (category === 'minerals') {
      setNutritionData({
        ...nutritionData,
        minerals: {
          ...nutritionData.minerals,
          [field]: isNaN(numValue) ? 0 : numValue
        }
      });
    }
  };
  
  const handleSave = () => {
    onSave(nutritionData);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Nutrition Information</h2>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('macros')}
            className={`${
              activeTab === 'macros'
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Macronutrients
          </button>
          <button
            onClick={() => setActiveTab('vitamins')}
            className={`${
              activeTab === 'vitamins'
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Vitamins
          </button>
          <button
            onClick={() => setActiveTab('minerals')}
            className={`${
              activeTab === 'minerals'
                ? 'border-red-700 text-red-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
          >
            Minerals
          </button>
        </nav>
      </div>
      
      {/* Macronutrients Form */}
      {activeTab === 'macros' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calories (per serving)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={nutritionData.calories || ''}
              onChange={(e) => handleChange('main', 'calories', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Protein (g)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.protein || ''}
              onChange={(e) => handleChange('main', 'protein', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fat (g)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.fat || ''}
              onChange={(e) => handleChange('main', 'fat', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Carbs (g)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.carbs || ''}
              onChange={(e) => handleChange('main', 'carbs', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fiber (g)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.fiber || ''}
              onChange={(e) => handleChange('main', 'fiber', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      )}
      
      {/* Vitamins Form */}
      {activeTab === 'vitamins' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vitamin A (μg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.vitamins?.vitaminA || ''}
              onChange={(e) => handleChange('vitamins', 'vitaminA', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vitamin B1/Thiamin (mg)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={nutritionData.vitamins?.vitaminB1 || ''}
              onChange={(e) => handleChange('vitamins', 'vitaminB1', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vitamin B2/Riboflavin (mg)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={nutritionData.vitamins?.vitaminB2 || ''}
              onChange={(e) => handleChange('vitamins', 'vitaminB2', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vitamin B3/Niacin (mg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.vitamins?.vitaminB3 || ''}
              onChange={(e) => handleChange('vitamins', 'vitaminB3', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vitamin B6 (mg)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={nutritionData.vitamins?.vitaminB6 || ''}
              onChange={(e) => handleChange('vitamins', 'vitaminB6', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vitamin B12 (μg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.vitamins?.vitaminB12 || ''}
              onChange={(e) => handleChange('vitamins', 'vitaminB12', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vitamin C (mg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.vitamins?.vitaminC || ''}
              onChange={(e) => handleChange('vitamins', 'vitaminC', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vitamin D (μg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.vitamins?.vitaminD || ''}
              onChange={(e) => handleChange('vitamins', 'vitaminD', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vitamin E (mg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.vitamins?.vitaminE || ''}
              onChange={(e) => handleChange('vitamins', 'vitaminE', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vitamin K (μg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.vitamins?.vitaminK || ''}
              onChange={(e) => handleChange('vitamins', 'vitaminK', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      )}
      
      {/* Minerals Form */}
      {activeTab === 'minerals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calcium (mg)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={nutritionData.minerals?.calcium || ''}
              onChange={(e) => handleChange('minerals', 'calcium', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Iron (mg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.minerals?.iron || ''}
              onChange={(e) => handleChange('minerals', 'iron', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Magnesium (mg)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={nutritionData.minerals?.magnesium || ''}
              onChange={(e) => handleChange('minerals', 'magnesium', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phosphorus (mg)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={nutritionData.minerals?.phosphorus || ''}
              onChange={(e) => handleChange('minerals', 'phosphorus', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Potassium (mg)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={nutritionData.minerals?.potassium || ''}
              onChange={(e) => handleChange('minerals', 'potassium', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sodium (mg)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={nutritionData.minerals?.sodium || ''}
              onChange={(e) => handleChange('minerals', 'sodium', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zinc (mg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.minerals?.zinc || ''}
              onChange={(e) => handleChange('minerals', 'zinc', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Selenium (μg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={nutritionData.minerals?.selenium || ''}
              onChange={(e) => handleChange('minerals', 'selenium', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      )}
      
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none"
        >
          Save Nutrition Data
        </button>
      </div>
    </div>
  );
};

export default NutritionEditor;