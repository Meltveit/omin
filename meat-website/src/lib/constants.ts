// Define the valid category keys as a type
export type CategoryKey = 'breakfast' | 'lunch' | 'dinner' | 'snacks';

export const CATEGORIES = [
  { name: 'Breakfast', slug: 'breakfast' },
  { name: 'Lunch', slug: 'lunch' },
  { name: 'Dinner', slug: 'dinner' },
  { name: 'Snacks', slug: 'snacks' }
];

// Use Record with the CategoryKey type to properly type the object
export const CATEGORY_INFO: Record<CategoryKey, {
  title: string;
  description: string;
  metaDescription: string;
}> = {
  breakfast: {
    title: 'High-Protein Breakfast Recipes',
    description: 'Start your day with these protein-packed breakfast recipes.',
    metaDescription: 'Discover high-protein breakfast recipes with meat. Start your day with energy-packed, delicious breakfast options that keep you full until lunch.'
  },
  lunch: {
    title: 'Quick & Easy Lunch Recipes',
    description: 'Perfect high-protein lunch ideas for busy days.',
    metaDescription: 'Find quick & easy high-protein lunch recipes. Delicious meat-based lunch ideas that are perfect for meal prep and busy weekdays.'
  },
  dinner: {
    title: 'Protein-Rich Dinner Recipes',
    description: 'Delicious meat-based dinner recipes for any occasion.',
    metaDescription: 'Explore our collection of protein-rich dinner recipes featuring high-quality meats. Perfect for family dinners or special occasions.'
  },
  snacks: {
    title: 'High-Protein Snack Ideas',
    description: 'Keep hunger at bay with these protein-packed snacks.',
    metaDescription: 'Discover high-protein meat snacks that keep hunger at bay. Perfect for on-the-go or between meals to maintain energy throughout the day.'
  }
};