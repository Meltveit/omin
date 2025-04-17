import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { RecipeMetadata, RecipeContent } from '@/types';
import { CATEGORIES } from './constants';

const contentDirectory = path.join(process.cwd(), 'src/content');

export function getAllCategories(): string[] {
  return CATEGORIES.map(category => category.slug);
}

export function getAllRecipes(category: string): RecipeMetadata[] {
  try {
    const categoryPath = path.join(contentDirectory, 'recipes', category);
    
    // Check if directory exists
    if (!fs.existsSync(categoryPath)) {
      return [];
    }
    
    const fileNames = fs.readdirSync(categoryPath);
    
    return fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(fileName => {
        const fullPath = path.join(categoryPath, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        return {
          slug: fileName.replace(/\.mdx$/, ''),
          category,
          ...data as Omit<RecipeMetadata, 'slug' | 'category'>,
        };
      });
  } catch (error) {
    console.error(`Error getting recipes for ${category}:`, error);
    return [];
  }
}

export function getRecipeBySlug(category: string, slug: string): RecipeContent | null {
  try {
    const fullPath = path.join(contentDirectory, 'recipes', category, `${slug}.mdx`);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      category,
      content,
      ...data as Omit<RecipeMetadata, 'slug' | 'category'>,
    };
  } catch (error) {
    console.error(`Error getting recipe ${slug} in ${category}:`, error);
    return null;
  }
}