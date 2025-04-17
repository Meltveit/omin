// src/types/index.ts
export interface NutritionVitamins {
    vitaminA?: number; // in μg
    vitaminB1?: number; // in mg (thiamin)
    vitaminB2?: number; // in mg (riboflavin)
    vitaminB3?: number; // in mg (niacin)
    vitaminB6?: number; // in mg
    vitaminB12?: number; // in μg
    vitaminC?: number; // in mg
    vitaminD?: number; // in μg
    vitaminE?: number; // in mg
    vitaminK?: number; // in μg
  }
  
  export interface NutritionMinerals {
    calcium?: number; // in mg
    iron?: number; // in mg
    magnesium?: number; // in mg
    phosphorus?: number; // in mg
    potassium?: number; // in mg
    sodium?: number; // in mg
    zinc?: number; // in mg
    selenium?: number; // in μg
  }
  
  export interface NutritionInformation {
    calories: number;
    protein: number;
    fat?: number;
    carbs?: number;
    fiber?: number;
    vitamins?: NutritionVitamins;
    minerals?: NutritionMinerals;
  }
  
  export interface RecipeMetadata {
    title: string;
    slug: string;
    category: string;
    description: string;
    date: string;
    image: string;
    prepTime: number;
    cookTime: number;
    totalTime: number;
    servings: string;
    calories: number;
    protein: number;
    fat?: number;
    carbs?: number;
    featured?: boolean;
    nutrition?: NutritionInformation;
  }
  
  export interface RecipeContent extends RecipeMetadata {
    content: string;
    ingredients: string[];
    instructions: string[];
  }