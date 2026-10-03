import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getCollection, getProducts } from "@/lib/shopify";

export const revalidate = 60;

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let title = "All Products";
  let products;
  if (slug === "all") {
    products = await getProducts();
  } else {
    const c = await getCollection(slug);
    if (!c) notFound();
    title = c.title;
    products = c.products;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold uppercase tracking-widest text-center mb-10">{title}</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
