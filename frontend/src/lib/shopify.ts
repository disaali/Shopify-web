const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const version = process.env.SHOPIFY_API_VERSION || "2026-07";

export type Variant = { id: string; title: string; price: number; compareAtPrice?: number; available: boolean };
export type Product = {
  id: string; handle: string; name: string; description: string;
  image?: string; images: string[]; price: number; compareAtPrice?: number;
  inStock: boolean; variants: Variant[];
};
export type CartLine = { id: string; quantity: number; title: string; variantTitle: string; price: number; image?: string; handle: string };
export type Cart = { id: string; checkoutUrl: string; totalQuantity: number; subtotal: number; lines: CartLine[] };

export const formatPrice = (n: number) => `Rs.${Math.round(n).toLocaleString("en-PK")}`;

export async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}, revalidate = 60): Promise<T> {
  if (!domain || !token) throw new Error("Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Storefront-Access-Token": token },
    body: JSON.stringify({ query, variables }),
    ...(revalidate ? { next: { revalidate } } : { cache: "no-store" as const }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(`Shopify error: ${JSON.stringify(json.errors ?? res.status)}`);
  return json.data as T;
}

const PRODUCT_FIELDS = `
  id handle title description availableForSale
  featuredImage { url }
  images(first: 6) { nodes { url } }
  variants(first: 20) { nodes { id title availableForSale price { amount } compareAtPrice { amount } } }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toProduct(n: any): Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const variants: Variant[] = n.variants.nodes.map((v: any) => ({
    id: v.id, title: v.title, available: v.availableForSale,
    price: parseFloat(v.price.amount),
    compareAtPrice: v.compareAtPrice ? parseFloat(v.compareAtPrice.amount) : undefined,
  }));
  const first = variants[0];
  return {
    id: n.id, handle: n.handle, name: n.title, description: n.description,
    image: n.featuredImage?.url,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: n.images.nodes.map((i: any) => i.url),
    price: first?.price ?? 0,
    compareAtPrice: first?.compareAtPrice && first.compareAtPrice > first.price ? first.compareAtPrice : undefined,
    inStock: n.availableForSale, variants,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const d = await shopifyFetch<{ products: { nodes: unknown[] } }>(`{ products(first: 50) { nodes { ${PRODUCT_FIELDS} } } }`);
    return d.products.nodes.map(toProduct);
  } catch (e) { console.error(e); return []; }
}

export async function getCollection(handle: string): Promise<{ title: string; products: Product[] } | null> {
  try {
    const d = await shopifyFetch<{ collection: { title: string; products: { nodes: unknown[] } } | null }>(
      `query($h: String!) { collection(handle: $h) { title products(first: 50) { nodes { ${PRODUCT_FIELDS} } } } }`, { h: handle });
    return d.collection ? { title: d.collection.title, products: d.collection.products.nodes.map(toProduct) } : null;
  } catch (e) { console.error(e); return null; }
}

export async function getProduct(handle: string): Promise<Product | null> {
  try {
    const d = await shopifyFetch<{ product: unknown | null }>(`query($h: String!) { product(handle: $h) { ${PRODUCT_FIELDS} } }`, { h: handle });
    return d.product ? toProduct(d.product) : null;
  } catch (e) { console.error(e); return null; }
}

/* ---------- Cart ---------- */
const CART_FIELDS = `
  id checkoutUrl totalQuantity
  cost { subtotalAmount { amount } }
  lines(first: 50) { nodes { id quantity merchandise { ... on ProductVariant {
    title image { url } product { title handle featuredImage { url } } price { amount } } } } }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toCart(c: any): Cart {
  return {
    id: c.id, checkoutUrl: c.checkoutUrl, totalQuantity: c.totalQuantity,
    subtotal: parseFloat(c.cost.subtotalAmount.amount),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lines: c.lines.nodes.map((l: any) => ({
      id: l.id, quantity: l.quantity, title: l.merchandise.product.title, handle: l.merchandise.product.handle,
      variantTitle: l.merchandise.title === "Default Title" ? "" : l.merchandise.title,
      price: parseFloat(l.merchandise.price.amount),
      image: l.merchandise.image?.url ?? l.merchandise.product.featuredImage?.url,
    })),
  };
}

export type CartAction =
  | { action: "get"; cartId: string }
  | { action: "add"; cartId?: string; variantId: string; quantity?: number }
  | { action: "update"; cartId: string; lineId: string; quantity: number }
  | { action: "remove"; cartId: string; lineId: string };

export async function runCartAction(a: CartAction): Promise<Cart | null> {
  const run = async <K extends string>(q: string, v: Record<string, unknown>, key: K) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = await shopifyFetch<Record<string, any>>(q, v, 0);
    return d[key]?.cart ?? d[key] ?? null;
  };
  switch (a.action) {
    case "get": {
      const c = await run(`query($id: ID!) { cart(id: $id) { ${CART_FIELDS} } }`, { id: a.cartId }, "cart");
      return c ? toCart(c) : null;
    }
    case "add": {
      const lines = [{ merchandiseId: a.variantId, quantity: a.quantity ?? 1 }];
      if (!a.cartId) {
        const c = await run(`mutation($lines: [CartLineInput!]) { cartCreate(input: { lines: $lines }) { cart { ${CART_FIELDS} } } }`, { lines }, "cartCreate");
        return toCart(c);
      }
      const c = await run(`mutation($id: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $id, lines: $lines) { cart { ${CART_FIELDS} } } }`, { id: a.cartId, lines }, "cartLinesAdd");
      return toCart(c);
    }
    case "update": {
      const c = await run(`mutation($id: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $id, lines: $lines) { cart { ${CART_FIELDS} } } }`,
        { id: a.cartId, lines: [{ id: a.lineId, quantity: a.quantity }] }, "cartLinesUpdate");
      return toCart(c);
    }
    case "remove": {
      const c = await run(`mutation($id: ID!, $ids: [ID!]!) { cartLinesRemove(cartId: $id, lineIds: $ids) { cart { ${CART_FIELDS} } } }`,
        { id: a.cartId, ids: [a.lineId] }, "cartLinesRemove");
      return toCart(c);
    }
  }
}
