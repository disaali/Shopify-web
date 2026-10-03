import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/shopify";

export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="flex flex-col">
      <section className="w-full py-24 bg-gradient-to-r from-[#F4C0BB] to-pink-100 flex items-center justify-center text-center px-4">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-[#121212] uppercase tracking-wider leading-tight">Glow &amp; care</h1>
          <p className="text-gray-700 max-w-lg mx-auto text-sm md:text-base">Makeup and beauty essentials, picked for you.</p>
          <Link href="/collections/all" className="inline-block bg-black text-white px-8 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors">Shop Now</Link>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold uppercase tracking-widest mb-4">Our Products</h2>
          <div className="w-16 h-1 bg-[#E65A4D] mx-auto" />
        </div>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products to show right now.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
