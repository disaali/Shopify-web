"use client";
import { useEffect, useState, use } from "react";
import { api } from "@/lib/api";
import { Product } from "@/types";
import { ShoppingCart, Check, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  
  const { id } = use(params);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await api.post("/cart/items", { product_id: product.id, quantity: 1 });
      setAdded(true);
      setTimeout(() => router.push("/cart"), 500);
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading product...</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 rounded-2xl p-10 min-h-[300px]">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="max-w-full h-auto object-contain" />
          ) : (
            <div className="text-gray-400 flex flex-col items-center">
              <Info className="w-16 h-16 mb-2" />
              <span>No image available</span>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <div>
            <div className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">{product.brand}</div>
            <h1 className="text-3xl font-extrabold text-gray-900">{product.name}</h1>
          </div>
          
          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-black text-gray-900">Rs. {product.price.toLocaleString()}</span>
            {product.original_price && product.original_price > product.price && (
              <span className="text-xl text-gray-400 line-through">Rs. {product.original_price.toLocaleString()}</span>
            )}
          </div>
          
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Storage</span>
              <span className="font-bold text-gray-900">{product.storage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">RAM</span>
              <span className="font-bold text-gray-900">{product.ram}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Condition</span>
              <span className="font-bold text-gray-900">{product.condition}</span>
            </div>
          </div>
          
          <div className="pt-6">
            <button
              onClick={addToCart}
              disabled={adding || added || !product.in_stock}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                !product.in_stock ? "bg-gray-200 text-gray-500 cursor-not-allowed" :
                added ? "bg-green-500 text-white" :
                "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {!product.in_stock ? "Out of Stock" : 
                added ? <><Check className="w-5 h-5" /> Added to Cart</> : 
                <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
