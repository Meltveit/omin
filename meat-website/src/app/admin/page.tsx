import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Admin Dashboard | MeatMaster',
  description: 'Manage content and settings for MeatMaster website',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recipe Management Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Recipe Management</h2>
          <p className="text-gray-600 mb-4">Add, edit, or delete recipes across all categories.</p>
          <div className="mt-auto">
            <Link 
              href="/admin/recipe-editor"
              className="block w-full bg-red-700 hover:bg-red-800 text-white text-center py-2 px-4 rounded-md transition-colors"
            >
              Manage Recipes
            </Link>
          </div>
        </div>
        
        {/* Categories Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Categories</h2>
          <p className="text-gray-600 mb-4">Organize and manage recipe categories.</p>
          <div className="mt-auto">
            <Link 
              href="#"
              className="block w-full bg-gray-800 hover:bg-gray-900 text-white text-center py-2 px-4 rounded-md transition-colors"
            >
              Coming Soon
            </Link>
          </div>
        </div>
        
        {/* Nutrition Database Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Nutrition Database</h2>
          <p className="text-gray-600 mb-4">Manage ingredients and nutrition information.</p>
          <div className="mt-auto">
            <Link 
              href="#"
              className="block w-full bg-gray-800 hover:bg-gray-900 text-white text-center py-2 px-4 rounded-md transition-colors"
            >
              Coming Soon
            </Link>
          </div>
        </div>
        
        {/* Analytics Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Analytics</h2>
          <p className="text-gray-600 mb-4">View website traffic and user engagement data.</p>
          <div className="mt-auto">
            <Link 
              href="#"
              className="block w-full bg-gray-800 hover:bg-gray-900 text-white text-center py-2 px-4 rounded-md transition-colors"
            >
              Coming Soon
            </Link>
          </div>
        </div>
        
        {/* Settings Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Settings</h2>
          <p className="text-gray-600 mb-4">Configure website settings and preferences.</p>
          <div className="mt-auto">
            <Link 
              href="#"
              className="block w-full bg-gray-800 hover:bg-gray-900 text-white text-center py-2 px-4 rounded-md transition-colors"
            >
              Coming Soon
            </Link>
          </div>
        </div>
        
        {/* User Management Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">User Management</h2>
          <p className="text-gray-600 mb-4">Manage admin users and permissions.</p>
          <div className="mt-auto">
            <Link 
              href="#"
              className="block w-full bg-gray-800 hover:bg-gray-900 text-white text-center py-2 px-4 rounded-md transition-colors"
            >
              Coming Soon
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}