// src/components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORIES } from '@/lib/constants';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    // Call once to set initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="sr-only">MeatMaster</span>
            <Image 
              src="/images/logo.png" 
              alt="MeatMaster Logo" 
              width={40} 
              height={40} 
              className="h-10 w-auto"
              priority
            />
            <span className="ml-2 text-xl font-bold text-red-700 hidden sm:block">MeatMaster</span>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-700 hover:bg-gray-100 focus:outline-none md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {CATEGORIES.map((category) => (
              <Link 
                key={category.slug} 
                href={`/${category.slug}`}
                className="text-base font-medium text-gray-700 hover:text-red-700 transition-colors"
              >
                {category.name}
              </Link>
            ))}
            <Link 
              href="/nutrition-calculator" 
              className="text-base font-medium text-gray-700 hover:text-red-700 transition-colors"
            >
              Nutrition Calculator
            </Link>
            <Link 
              href="/about" 
              className="text-base font-medium text-gray-700 hover:text-red-700 transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
        
        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="py-2 space-y-1 border-t border-gray-200">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-700 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/nutrition-calculator"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Nutrition Calculator
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}