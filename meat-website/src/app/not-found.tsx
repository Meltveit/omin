import Link from 'next/link';

// Add viewport export to fix the warning
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function NotFound() {
  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8">Sorry, the page you are looking for does not exist.</p>
      
      <div className="mb-8">
        <p className="text-gray-600">
          You might want to check out our recipe categories instead:
        </p>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Link
          href="/breakfast"
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Breakfast
        </Link>
        <Link
          href="/lunch"
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Lunch
        </Link>
        <Link
          href="/dinner"
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Dinner
        </Link>
        <Link
          href="/snacks"
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Snacks
        </Link>
      </div>
      
      <Link
        href="/"
        className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}