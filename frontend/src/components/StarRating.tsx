import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount: number;
}

export default function StarRating({ rating, reviewCount }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 my-1">
      <div className="flex text-[#FFD700]">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={14} fill="currentColor" strokeWidth={0} />
        ))}
        {hasHalfStar && <StarHalf size={14} fill="currentColor" strokeWidth={0} />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={14} strokeWidth={1} className="text-gray-300" />
        ))}
      </div>
      <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
    </div>
  );
}
