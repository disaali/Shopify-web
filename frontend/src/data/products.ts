export interface Product {
  id: number;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  category: string;
  inStock: boolean;
}

export const products: Product[] = [
  { id: 1, name: "Miss Rose Matte Lipstick", price: 599, compareAtPrice: 999, image: "/products/lipstick-1.jpg", rating: 4.5, reviewCount: 128, badge: "Sale", category: "lips", inStock: true },
  { id: 2, name: "Miss Rose Velvet Lip Tint", price: 499, compareAtPrice: 899, image: "/products/liptint-1.jpg", rating: 4.8, reviewCount: 85, badge: "Sale", category: "lips", inStock: true },
  { id: 3, name: "Miss Rose Liquid Foundation", price: 1299, compareAtPrice: 1599, image: "/products/foundation.jpg", rating: 4.2, reviewCount: 342, category: "face", inStock: true },
  { id: 4, name: "Miss Rose Eyeshadow Palette 18 Colors", price: 1499, compareAtPrice: 1999, image: "/products/palette.jpg", rating: 4.9, reviewCount: 512, badge: "Hot", category: "eyes", inStock: true },
  { id: 5, name: "Miss Rose Waterproof Eyeliner", price: 399, compareAtPrice: 599, image: "/products/eyeliner.jpg", rating: 4.1, reviewCount: 96, category: "eyes", inStock: true },
  { id: 6, name: "Miss Rose Makeup Brush Set (10 pcs)", price: 2199, compareAtPrice: 2999, image: "/products/brushes.jpg", rating: 4.7, reviewCount: 215, badge: "Sale", category: "brushes", inStock: true },
  { id: 7, name: "Miss Rose Pressed Powder", price: 699, compareAtPrice: 899, image: "/products/powder.jpg", rating: 4.4, reviewCount: 164, category: "face", inStock: true },
  { id: 8, name: "Miss Rose Lip Gloss", price: 349, compareAtPrice: 499, image: "/products/lipgloss.jpg", rating: 4.3, reviewCount: 78, category: "lips", inStock: true },
  { id: 9, name: "Miss Rose Mascara", price: 450, compareAtPrice: 650, image: "/products/mascara.jpg", rating: 4.6, reviewCount: 190, category: "eyes", inStock: true },
  { id: 10, name: "Miss Rose Blush Palette", price: 899, compareAtPrice: 1199, image: "/products/blush.jpg", rating: 4.5, reviewCount: 145, badge: "Sale", category: "face", inStock: true },
  { id: 11, name: "Miss Rose Makeup Fixer Setting Spray", price: 799, compareAtPrice: 999, image: "/products/spray.jpg", rating: 4.8, reviewCount: 275, category: "face", inStock: true },
  { id: 12, name: "Miss Rose 3D Contour Palette", price: 1199, compareAtPrice: 1499, image: "/products/contour.jpg", rating: 4.7, reviewCount: 132, badge: "New", category: "face", inStock: true },
];
