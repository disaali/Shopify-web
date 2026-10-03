"use client";
import { useEffect, useState, Suspense } from "react";
import { api } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types";

function CompareContent() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ids) {
      setLoading(false);
      return;
    }
    const fetchCompare = async () => {
      try {
        const res = await api.get(`/compare?ids=${ids}`);
        setProducts(res.data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompare();
  }, [ids]);

  if (loading) return <div className="text-center py-20">Loading comparison...</div>;
  if (products.length === 0) return <div className="text-center py-20">No products selected for comparison.</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Compare Products</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-bold text-gray-900 w-48">Feature</th>
              {products.map(p => (
                <th key={p.id} className="p-4 border-l border-gray-200 min-w-[200px]">
                  <div className="text-center">
                    {p.image_url && <img src={p.image_url} alt={p.name} className="h-32 object-contain mx-auto mb-4" />}
                    <div className="font-bold text-lg">{p.name}</div>
                    <div className="text-blue-600 font-bold mt-2">Rs. {p.price.toLocaleString()}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="p-4 font-medium text-gray-700 bg-gray-50">Brand</td>
              {products.map(p => <td key={p.id} className="p-4 border-l border-gray-200 text-center">{p.brand}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-medium text-gray-700 bg-gray-50">Storage</td>
              {products.map(p => <td key={p.id} className="p-4 border-l border-gray-200 text-center">{p.storage || "Not available"}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-medium text-gray-700 bg-gray-50">RAM</td>
              {products.map(p => <td key={p.id} className="p-4 border-l border-gray-200 text-center">{p.ram || "Not available"}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-medium text-gray-700 bg-gray-50">Condition</td>
              {products.map(p => <td key={p.id} className="p-4 border-l border-gray-200 text-center">{p.condition}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-medium text-gray-700 bg-gray-50">Stock</td>
              {products.map(p => <td key={p.id} className="p-4 border-l border-gray-200 text-center">{p.in_stock ? "In Stock" : "Out of Stock"}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <CompareContent />
    </Suspense>
  )
}
