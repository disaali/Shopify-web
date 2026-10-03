import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Truck, ShieldCheck, Heart } from "lucide-react";

export default function Home() {
  // Get 4 featured products
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[70vh] bg-gradient-to-r from-[#F4C0BB] to-pink-100 flex items-center justify-center text-center px-4">
        <div className="max-w-3xl z-10 space-y-6">
          <h2 className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-gray-800">New Collection</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-[#121212] uppercase tracking-wider leading-tight">
            Discover Your <br /> True Beauty
          </h1>
          <p className="text-gray-700 max-w-lg mx-auto text-sm md:text-base">
            High-quality, affordable cosmetics designed to empower and inspire. Shop the latest trends in makeup.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/collections/all" 
              className="bg-black text-white px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Shop Now
            </Link>
            <Link 
              href="/collections/deals" 
              className="bg-transparent border border-black text-black px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              View Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Truck size={32} className="text-[#E65A4D]" strokeWidth={1.5} />
              <h3 className="font-semibold text-sm uppercase tracking-wide">Free Shipping</h3>
              <p className="text-xs text-gray-500">On all orders over Rs.2000</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck size={32} className="text-[#E65A4D]" strokeWidth={1.5} />
              <h3 className="font-semibold text-sm uppercase tracking-wide">100% Genuine</h3>
              <p className="text-xs text-gray-500">Authentic Miss Rose products</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Heart size={32} className="text-[#E65A4D]" strokeWidth={1.5} />
              <h3 className="font-semibold text-sm uppercase tracking-wide">Cruelty Free</h3>
              <p className="text-xs text-gray-500">We love our furry friends</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold uppercase tracking-widest mb-4">Best Sellers</h2>
          <div className="w-16 h-1 bg-[#E65A4D] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/collections/all" 
            className="inline-block border-b-2 border-black pb-1 text-sm font-semibold uppercase tracking-wider hover:text-[#E65A4D] hover:border-[#E65A4D] transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-8 w-full bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          <Link href="/collections/lips" className="group relative h-[40vh] sm:h-[50vh] overflow-hidden bg-gradient-to-br from-pink-200 to-pink-100 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10" />
            <div className="relative z-20 text-center bg-white/90 p-6 m-4 w-3/4 max-w-xs mx-auto group-hover:scale-105 transition-transform duration-500">
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-2">Lips</h3>
              <span className="text-sm border-b border-black pb-1">Shop Now</span>
            </div>
          </Link>
          
          <Link href="/collections/face" className="group relative h-[40vh] sm:h-[50vh] overflow-hidden bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10" />
            <div className="relative z-20 text-center bg-white/90 p-6 m-4 w-3/4 max-w-xs mx-auto group-hover:scale-105 transition-transform duration-500">
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-2">Face</h3>
              <span className="text-sm border-b border-black pb-1">Shop Now</span>
            </div>
          </Link>
          
          <Link href="/collections/eyes" className="group relative h-[40vh] sm:h-[50vh] overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center md:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10" />
            <div className="relative z-20 text-center bg-white/90 p-6 m-4 w-3/4 max-w-xs mx-auto group-hover:scale-105 transition-transform duration-500">
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-2">Eyes</h3>
              <span className="text-sm border-b border-black pb-1">Shop Now</span>
            </div>
          </Link>
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold uppercase tracking-widest mb-4">New Arrivals</h2>
          <div className="w-16 h-1 bg-[#E65A4D] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
