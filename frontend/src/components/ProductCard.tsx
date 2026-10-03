"use client";

import Link from "next/link";
import StarRating from "./StarRating";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = isSale 
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Added ${product.name} to cart!`);
    // Add toast or cart logic here
  };

  return (
    <Link href={`/products/${product.id}`} className="group flex flex-col h-full relative">
      {/* Image Container */}
      <div className="relative aspect-square bg-[#f8f8f8] mb-3 overflow-hidden rounded-sm transition-transform duration-300 group-hover:shadow-md">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.badge && (
            <span className="bg-[#E65A4D] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
              -{discountPercent}%
            </span>
          )}
        </div>
        
        {/* Placeholder for image since we don't have actual images */}
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-[#F4C0BB] group-hover:scale-105 transition-transform duration-500">
           <span className="text-pink-300 font-medium text-sm">Product Image</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-[#121212] line-clamp-2 min-h-[40px] group-hover:text-[#E65A4D] transition-colors">
          {product.name}
        </h3>
        
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        
        <div className="mt-1 flex items-center gap-2 mb-3">
          {isSale && (
            <span className="text-sm text-gray-500 line-through">
              Rs.{product.compareAtPrice}
            </span>
          )}
          <span className="text-sm font-bold text-black">
            Rs.{product.price}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="mt-auto w-full border border-black py-2 text-sm font-medium bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
