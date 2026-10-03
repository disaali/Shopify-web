import Link from "next/link";
import CollectionBanner from "@/components/CollectionBanner";

const collections = [
  { name: "Lips", slug: "lips", image: "lips-bg" },
  { name: "Face", slug: "face", image: "face-bg" },
  { name: "Eyes", slug: "eyes", image: "eyes-bg" },
  { name: "Brushes", slug: "brushes", image: "brushes-bg" },
];

export default function CollectionsIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <CollectionBanner title="All Collections" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <Link 
              key={collection.slug} 
              href={`/collections/${collection.slug}`}
              className="group relative h-80 overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#F4C0BB] to-pink-50 rounded-sm"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300 z-10" />
              <h2 className="relative z-20 text-3xl font-bold text-white uppercase tracking-widest drop-shadow-md group-hover:scale-110 transition-transform duration-500">
                {collection.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
