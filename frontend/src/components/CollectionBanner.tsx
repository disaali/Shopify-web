interface CollectionBannerProps {
  title: string;
  description?: string;
}

export default function CollectionBanner({ title, description }: CollectionBannerProps) {
  return (
    <div className="w-full bg-gradient-to-r from-[#F4C0BB] to-pink-100 py-12 px-4 sm:px-6 lg:px-8 text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-widest mb-4">
        {title}
      </h1>
      {description && (
        <p className="max-w-2xl mx-auto text-gray-700 text-sm md:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
