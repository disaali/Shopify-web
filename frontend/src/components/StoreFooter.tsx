import Link from "next/link";

export default function StoreFooter() {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col sm:flex-row justify-between gap-4 text-sm">
        <div>
          <p className="font-bold uppercase tracking-widest">Glow &amp; care</p>
          <p className="text-gray-400 mt-1">Makeup and beauty essentials.</p>
        </div>
        <div className="flex gap-6 text-gray-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/collections/all" className="hover:text-white">Shop All</Link>
          <Link href="/cart" className="hover:text-white">Cart</Link>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center text-xs text-gray-500 py-4">© 2026 Glow &amp; care. All rights reserved.</div>
    </footer>
  );
}
