"use client";

import { useState } from "react";
import { formatPrice, type Product } from "@/lib/shopify";
import AddToCartButton from "./AddToCartButton";

export default function ProductDetail({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [img, setImg] = useState(product.image ?? product.images[0]);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const multi = product.variants.length > 1;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
      <div>
        <div className="aspect-square bg-[#f8f8f8] overflow-hidden rounded-sm">
          {img && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={product.name} className="w-full h-full object-cover" />
          )}
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {product.images.map((u) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={u} src={u} alt="" onClick={() => setImg(u)} className={`w-16 h-16 object-cover cursor-pointer border ${u === img ? "border-black" : "border-transparent"}`} />
            ))}
          </div>
        )}
      </div>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <div className="flex items-center gap-3">
          {variant?.compareAtPrice && variant.compareAtPrice > variant.price && (
            <span className="text-gray-500 line-through">{formatPrice(variant.compareAtPrice)}</span>
          )}
          <span className="text-xl font-bold">{formatPrice(variant?.price ?? product.price)}</span>
        </div>
        {multi && (
          <select value={variantId} onChange={(e) => setVariantId(e.target.value)} className="border border-gray-300 px-3 py-2 w-full">
            {product.variants.map((v) => <option key={v.id} value={v.id}>{v.title}{v.available ? "" : " (sold out)"}</option>)}
          </select>
        )}
        <AddToCartButton variantId={variant?.id} available={!!variant?.available} className="py-3" />
        <p className="text-sm text-gray-700 whitespace-pre-line">{product.description}</p>
      </div>
    </div>
  );
}
