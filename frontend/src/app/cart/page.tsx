"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CartResponse } from "@/types";

export default function CartPage() {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) setTimeout(() => fetchCart(), 0);
  }, [user]);

  const updateQuantity = async (itemId: string, qty: number) => {
    if (qty < 1) return;
    try {
      const res = await api.put(`/cart/items/${itemId}`, { quantity: qty });
      setCart(res.data.cart);
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const res = await api.delete(`/cart/items/${itemId}`);
      setCart(res.data.cart);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-20">Loading cart...</div>;
  
  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
        <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/chat" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
        {cart.items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.storage} • {item.ram} • {item.color || "Standard"}</p>
              <div className="text-blue-600 font-bold mt-2">Rs. {item.price.toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium">-</button>
                <div className="px-4 py-1 font-medium">{item.quantity}</div>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium">+</button>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-600 transition">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="w-full lg:w-80 h-fit bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
        <div className="space-y-3 text-sm text-gray-600 mb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">Rs. {cart.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-medium text-gray-900">Calculated at checkout</span>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between items-center">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-bold text-xl text-blue-600">Rs. {cart.subtotal.toLocaleString()}</span>
        </div>
        <Link href="/checkout" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition">
          Proceed to Checkout <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
