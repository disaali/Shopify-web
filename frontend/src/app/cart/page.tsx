"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/shopify";

export default function CartPage() {
  const { cart, busy, update, remove } = useCart();
  const lines = cart?.lines ?? [];

  if (lines.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/collections/all" className="underline">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <div className="divide-y">
        {lines.map((l) => (
          <div key={l.id} className="flex gap-4 py-4 items-center">
            {l.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={l.image} alt={l.title} className="w-20 h-20 object-cover bg-[#f8f8f8]" />
            )}
            <div className="flex-1">
              <Link href={`/products/${l.handle}`} className="font-medium hover:underline">{l.title}</Link>
              {l.variantTitle && <p className="text-xs text-gray-500">{l.variantTitle}</p>}
              <p className="text-sm">{formatPrice(l.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button disabled={busy} onClick={() => (l.quantity > 1 ? update(l.id, l.quantity - 1) : remove(l.id))} className="w-8 h-8 border">−</button>
              <span className="w-6 text-center">{l.quantity}</span>
              <button disabled={busy} onClick={() => update(l.id, l.quantity + 1)} className="w-8 h-8 border">+</button>
            </div>
            <button disabled={busy} onClick={() => remove(l.id)} className="text-sm text-gray-500 hover:text-black">Remove</button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center border-t pt-6">
        <span className="font-medium">Subtotal</span>
        <span className="text-lg font-bold">{formatPrice(cart!.subtotal)}</span>
      </div>
      <p className="text-xs text-gray-500 mt-1">Shipping and taxes are calculated at checkout.</p>
      <a href={cart!.checkoutUrl} className="mt-6 block w-full bg-black text-white text-center py-3 font-semibold uppercase tracking-wider hover:bg-gray-800 transition-colors">Checkout</a>
    </div>
  );
}
