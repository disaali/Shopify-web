"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Cart } from "@/lib/shopify";

type Ctx = {
  cart: Cart | null; count: number; busy: boolean;
  add: (variantId: string, quantity?: number) => Promise<void>;
  update: (lineId: string, quantity: number) => Promise<void>;
  remove: (lineId: string) => Promise<void>;
};
const CartContext = createContext<Ctx | null>(null);
const KEY = "shopify_cart_id";

async function call(body: object): Promise<Cart | null> {
  const res = await fetch("/api/cart", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error("Cart request failed");
  return (await res.json()).cart as Cart | null;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [busy, setBusy] = useState(false);

  const save = (c: Cart | null) => {
    setCart(c);
    try { c ? localStorage.setItem(KEY, c.id) : localStorage.removeItem(KEY); } catch {}
  };

  useEffect(() => {
    let id: string | null = null;
    try { id = localStorage.getItem(KEY); } catch {}
    if (id) call({ action: "get", cartId: id }).then(save).catch(() => save(null));
  }, []);

  const run = useCallback(async (body: object) => {
    setBusy(true);
    try { save(await call(body)); } finally { setBusy(false); }
  }, []);

  const value: Ctx = {
    cart, busy, count: cart?.totalQuantity ?? 0,
    add: (variantId, quantity = 1) => run({ action: "add", cartId: cart?.id, variantId, quantity }),
    update: (lineId, quantity) => run({ action: "update", cartId: cart!.id, lineId, quantity }),
    remove: (lineId) => run({ action: "remove", cartId: cart!.id, lineId }),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};
