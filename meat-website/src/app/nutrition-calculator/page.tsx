import { Metadata } from 'next';
import NutritionCalculator from '@/components/calculator/NutritionCalculator';

export const metadata: Metadata = {
  title: 'Meat Nutrition Calculator | MeatMaster',
  description: 'Calculate the complete nutritional profile of your meat-based meals, including protein, calories, vitamins, and minerals.',
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
        
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Why Meat Nutrition Matters</h2>
          
          <div className="prose max-w-none">
            <p>
              Meat is one of the most nutrient-dense foods available, providing high-quality protein and essential 
              nutrients that are difficult to obtain from plant sources alone. Understanding the nutritional profile 
              of different meats can help you make informed choices for your diet.
            </p>
            
            <h3>Key Nutrients in Meat</h3>
            
            <ul>
              <li>
                <strong>Complete Protein</strong> – Meat contains all nine essential amino acids in the ratios your body needs.
              </li>
              <li>
                <strong>Vitamin B12</strong> – Essential for nerve function and DNA synthesis, found almost exclusively in animal foods.
              </li>
              <li>
                <strong>Heme Iron</strong> – The most bioavailable form of iron, crucial for oxygen transport in the blood.
              </li>
              <li>
                <strong>Zinc</strong> – Important for immune function and wound healing, more bioavailable in meat than plant sources.
              </li>
              <li>
                <strong>Creatine</strong> – Supports energy metabolism during high-intensity exercise, found naturally in meat.
              </li>
              <li>
                <strong>Carnosine</strong> – An antioxidant that helps reduce muscle fatigue during exercise.
              </li>
            </ul>
            
            <p>
              Our calculator helps you track these important nutrients and optimize your meat-based diet for both 
              performance and overall health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}