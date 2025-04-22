import { Metadata } from 'next';
import { Suspense } from 'react';
import RecipeEditorClient from '@/components/admin/RecipeEditorClient';

// Define viewport separately to fix the build error
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Recipe Editor | MeatMaster Admin',
  description: 'Create and edit recipes for the MeatMaster website',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RecipeEditorPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
      </div>
    }>
      <RecipeEditorClient />
    </Suspense>
  );
}