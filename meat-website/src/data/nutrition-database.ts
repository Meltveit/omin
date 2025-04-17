export interface NutritionItem {
    id: string;
    name: string;
    category: string;
    servingSize: number;
    servingUnit: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
    vitamins: {
      vitaminA: number; // in μg
      vitaminB1: number; // in mg
      vitaminB2: number; // in mg
      vitaminB3: number; // in mg
      vitaminB6: number; // in mg
      vitaminB12: number; // in μg
      vitaminC: number; // in mg
      vitaminD: number; // in μg
      vitaminE: number; // in mg
      vitaminK: number; // in μg
    };
    minerals: {
      calcium: number; // in mg
      iron: number; // in mg
      magnesium: number; // in mg
      phosphorus: number; // in mg
      potassium: number; // in mg
      sodium: number; // in mg
      zinc: number; // in mg
      selenium: number; // in μg
    };
  }
  
  // Eksempler på kjøttprodukter med full ernæringsinformasjon
  export const nutritionDatabase: NutritionItem[] = [
    {
      id: "beef-ribeye",
      name: "Beef Ribeye Steak",
      category: "red-meat",
      servingSize: 100,
      servingUnit: "g",
      calories: 291,
      protein: 24.6,
      fat: 21.2,
      carbs: 0,
      fiber: 0,
      vitamins: {
        vitaminA: 0,
        vitaminB1: 0.07,
        vitaminB2: 0.19,
        vitaminB3: 4.37,
        vitaminB6: 0.36,
        vitaminB12: 2.28,
        vitaminC: 0,
        vitaminD: 0.7,
        vitaminE: 0.48,
        vitaminK: 1.2,
      },
      minerals: {
        calcium: 5,
        iron: 2.3,
        magnesium: 21,
        phosphorus: 175,
        potassium: 288,
        sodium: 58,
        zinc: 4.3,
        selenium: 15.8,
      }
    },
    {
      id: "beef-ground",
      name: "Ground Beef (80% lean)",
      category: "red-meat",
      servingSize: 100,
      servingUnit: "g",
      calories: 254,
      protein: 26.1,
      fat: 17.1,
      carbs: 0,
      fiber: 0,
      vitamins: {
        vitaminA: 0,
        vitaminB1: 0.04,
        vitaminB2: 0.18,
        vitaminB3: 5.38,
        vitaminB6: 0.32,
        vitaminB12: 2.12,
        vitaminC: 0,
        vitaminD: 0.5,
        vitaminE: 0.35,
        vitaminK: 1.0,
      },
      minerals: {
        calcium: 12,
        iron: 2.4,
        magnesium: 19,
        phosphorus: 170,
        potassium: 305,
        sodium: 74,
        zinc: 5.8,
        selenium: 17.5,
      }
    },
    {
      id: "chicken-breast",
      name: "Chicken Breast (skinless)",
      category: "poultry",
      servingSize: 100,
      servingUnit: "g",
      calories: 165,
      protein: 31.0,
      fat: 3.6,
      carbs: 0,
      fiber: 0,
      vitamins: {
        vitaminA: 6,
        vitaminB1: 0.06,
        vitaminB2: 0.12,
        vitaminB3: 13.7,
        vitaminB6: 0.60,
        vitaminB12: 0.31,
        vitaminC: 0,
        vitaminD: 0.2,
        vitaminE: 0.29,
        vitaminK: 0,
      },
      minerals: {
        calcium: 15,
        iron: 1.0,
        magnesium: 28,
        phosphorus: 228,
        potassium: 256,
        sodium: 74,
        zinc: 1.0,
        selenium: 24.0,
      }
    },
    {
      id: "pork-chop",
      name: "Pork Chop",
      category: "red-meat",
      servingSize: 100,
      servingUnit: "g",
      calories: 232,
      protein: 25.7,
      fat: 14.0,
      carbs: 0,
      fiber: 0,
      vitamins: {
        vitaminA: 2,
        vitaminB1: 0.72,
        vitaminB2: 0.25,
        vitaminB3: 4.9,
        vitaminB6: 0.38,
        vitaminB12: 0.69,
        vitaminC: 0,
        vitaminD: 0.5,
        vitaminE: 0.22,
        vitaminK: 0,
      },
      minerals: {
        calcium: 8,
        iron: 0.9,
        magnesium: 22,
        phosphorus: 198,
        potassium: 340,
        sodium: 62,
        zinc: 2.0,
        selenium: 32.4,
      }
    },
    {
      id: "salmon-fillet",
      name: "Salmon Fillet",
      category: "fish",
      servingSize: 100,
      servingUnit: "g",
      calories: 208,
      protein: 20.4,
      fat: 13.4,
      carbs: 0,
      fiber: 0,
      vitamins: {
        vitaminA: 15,
        vitaminB1: 0.23,
        vitaminB2: 0.38,
        vitaminB3: 8.0,
        vitaminB6: 0.80,
        vitaminB12: 2.8,
        vitaminC: 3.9,
        vitaminD: 11.2,
        vitaminE: 1.1,
        vitaminK: 0.5,
      },
      minerals: {
        calcium: 12,
        iron: 0.8,
        magnesium: 29,
        phosphorus: 252,
        potassium: 384,
        sodium: 56,
        zinc: 0.6,
        selenium: 36.5,
      }
    },
    {
      id: "large-egg",
      name: "Large Egg",
      category: "dairy-eggs",
      servingSize: 50,
      servingUnit: "g",
      calories: 72,
      protein: 6.3,
      fat: 4.8,
      carbs: 0.4,
      fiber: 0,
      vitamins: {
        vitaminA: 98,
        vitaminB1: 0.04,
        vitaminB2: 0.46,
        vitaminB3: 0.1,
        vitaminB6: 0.09,
        vitaminB12: 0.56,
        vitaminC: 0,
        vitaminD: 1.1,
        vitaminE: 0.97,
        vitaminK: 0.3,
      },
      minerals: {
        calcium: 28,
        iron: 0.9,
        magnesium: 6,
        phosphorus: 99,
        potassium: 69,
        sodium: 71,
        zinc: 0.6,
        selenium: 15.8,
      }
    },
  ];
  
  // Få en ingrediens etter ID
  export function getIngredientById(id: string): NutritionItem | undefined {
    return nutritionDatabase.find(item => item.id === id);
  }
  
  // Søk etter ingredienser etter navn
  export function searchIngredients(query: string): NutritionItem[] {
    const lowercaseQuery = query.toLowerCase();
    return nutritionDatabase.filter(item => 
      item.name.toLowerCase().includes(lowercaseQuery)
    );
  }
  
  // Hent ingredienser etter kategori
  export function getIngredientsByCategory(category: string): NutritionItem[] {
    return nutritionDatabase.filter(item => item.category === category);
  }