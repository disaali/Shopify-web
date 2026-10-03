"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartButton({ variantId, available, className = "" }: { variantId?: string; available: boolean; className?: string }) {
  const { add, busy } = useCart();
  const [done, setDone] = useState(false);
  const disabled = !available || !variantId || busy;

  return (
    <button
      disabled={disabled}
      onClick={async (e) => {
        e.preventDefault();
        try { await add(variantId!); setDone(true); setTimeout(() => setDone(false), 1500); } catch { alert("Could not add to cart. Please try again."); }
      }}
      className={`w-full border border-black py-2 text-sm font-medium bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {!available ? "Sold Out" : done ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
