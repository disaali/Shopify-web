import Link from "next/link";
import { formatPrice, type Product } from "@/lib/shopify";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const discount = product.compareAtPrice ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) : 0;
  return (
    <div className="group flex flex-col h-full relative">
      <Link href={`/products/${product.handle}`} className="flex flex-col flex-grow">
        <div className="relative aspect-square bg-[#f8f8f8] mb-3 overflow-hidden rounded-sm">
          {discount > 0 && (
            <span className="absolute top-2 left-2 z-10 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">-{discount}%</span>
          )}
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-pink-50 to-[#F4C0BB]" />
          )}
        </div>
        <h3 className="text-sm font-medium text-[#121212] line-clamp-2 min-h-[40px] group-hover:text-[#E65A4D] transition-colors">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2 mb-3">
          {product.compareAtPrice && <span className="text-sm text-gray-500 line-through">{formatPrice(product.compareAtPrice)}</span>}
          <span className="text-sm font-bold text-black">{formatPrice(product.price)}</span>
        </div>
      </Link>
      <AddToCartButton variantId={product.variants[0]?.id} available={product.inStock} className="mt-auto" />
    </div>
  );
}
