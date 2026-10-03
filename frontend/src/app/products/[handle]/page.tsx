import { notFound } from "next/navigation";
import { getProduct } from "@/lib/shopify";
import ProductDetail from "@/components/ProductDetail";

export const revalidate = 60;

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
