import { NextResponse } from 'next/server';
import { getAllRecipes } from '@/lib/contentUtils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  
  if (!category) {
    return NextResponse.json(
      { error: 'Category parameter is required' },
      { status: 400 }
    );
  }
  
  try {
    const recipes = getAllRecipes(category);
    return NextResponse.json({ recipes });
  } catch (error) {
    console.error(`Error fetching recipes for ${category}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}