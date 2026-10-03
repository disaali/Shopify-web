"use client";

import { useState, use } from "react";
import Link from "next/link";
import { SlidersHorizontal, ChevronRight, ChevronDown, X } from "lucide-react";
import CollectionBanner from "@/components/CollectionBanner";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("best-selling");

  // In a real app, we would fetch based on slug. Here we just filter the dummy data.
  const isAll = slug === "all";
  const collectionProducts = isAll 
    ? products 
    : products.filter(p => p.category.toLowerCase() === slug.toLowerCase());

  const title = isAll ? "All Products" : slug;

  return (
    <div className="min-h-screen bg-white">
      <CollectionBanner 
        title={title} 
        description="Discover our amazing collection of cosmetics designed to enhance your natural beauty."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Breadcrumb */}
        <nav className="flex text-xs text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight size={14} className="mx-1" />
                <Link href="/collections" className="hover:text-gray-900 transition-colors">Collections</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight size={14} className="mx-1" />
                <span className="text-gray-900 font-medium capitalize">{title}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-200 mb-8 gap-4">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-black transition-colors"
          >
            <SlidersHorizontal size={18} className="mr-2" />
            Filter
          </button>
          
          <div className="flex items-center justify-between w-full sm:w-auto text-sm text-gray-500">
            <span className="mr-6 hidden sm:inline-block">{collectionProducts.length} products</span>
            
            <div className="flex items-center">
              <span className="mr-2">Sort by:</span>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent pr-8 py-1 focus:outline-none cursor-pointer font-medium text-black"
                >
                  <option value="best-selling">Best Selling</option>
                  <option value="title-ascending">Alphabetically, A-Z</option>
                  <option value="title-descending">Alphabetically, Z-A</option>
                  <option value="price-ascending">Price, low to high</option>
                  <option value="price-descending">Price, high to low</option>
                </select>
                <ChevronDown size={14} className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none text-black" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar (hidden on mobile unless open) */}
          <div className={`md:w-1/4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Filters</h3>
                {isFilterOpen && (
                  <button className="md:hidden" onClick={() => setIsFilterOpen(false)}>
                    <X size={20} />
                  </button>
                )}
              </div>
              <h4 className="font-medium mb-3">Availability</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox text-black focus:ring-black accent-black" />
                  <span className="ml-2 text-sm text-gray-600">In stock</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox text-black focus:ring-black accent-black" />
                  <span className="ml-2 text-sm text-gray-600">Out of stock</span>
                </label>
              </div>
            </div>
            
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h4 className="font-medium mb-3">Price</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Rs.</span>
                <input type="number" placeholder="From" className="w-full border border-gray-300 p-2 text-sm" />
                <span className="text-sm text-gray-500">-</span>
                <span className="text-sm text-gray-500">Rs.</span>
                <input type="number" placeholder="To" className="w-full border border-gray-300 p-2 text-sm" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full md:w-3/4">
            {collectionProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
                {collectionProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 mb-4">No products found in this collection.</p>
                <Link href="/collections/all" className="text-black underline hover:text-[#E65A4D]">
                  View all products
                </Link>
              </div>
            )}
            
            {/* Pagination Placeholder */}
            {collectionProducts.length > 0 && (
              <div className="mt-16 flex justify-center">
                <button className="border border-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors">
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
