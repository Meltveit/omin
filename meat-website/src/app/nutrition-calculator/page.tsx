import { Metadata } from 'next';
import NutritionCalculator from '@/components/calculator/NutritionCalculator';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Meat Nutrition Calculator | MeatMaster',
  description: 'Calculate the complete nutritional profile of your meat-based meals, including protein, calories, vitamins, and minerals.'
};

export default function NutritionCalculatorPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Meat Nutrition Calculator</h1>
        
        <div className="prose max-w-none mb-8">
          <p>
            Use our comprehensive nutrition calculator to determine the exact nutritional content of your meat-based meals. 
            Get detailed information including macronutrients, vitamins, and minerals.
          </p>
        </div>
        
        <NutritionCalculator />
      </div>
    </div>
  );
}