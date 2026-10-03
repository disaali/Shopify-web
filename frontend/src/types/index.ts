export type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  original_price: number;
  stock: number;
  rating: number;
  condition: string;
  storage: string;
  ram: string;
  in_stock: boolean;
  image_url?: string;
  product_url?: string;
};

export type CartItem = {
  id: string;
  name: string;
  brand: string;
  price: number;
  original_price: number;
  quantity: number;
  condition: string;
  storage?: string;
  ram?: string;
  color?: string;
};

export type CartResponse = {
  items: CartItem[];
  subtotal: number;
  shipping_fee: number;
  grand_total: number;
};
