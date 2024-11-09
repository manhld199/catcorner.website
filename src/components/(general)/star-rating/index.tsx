// CustomerStarRating.tsx

import { Star } from "lucide-react";

interface CustomerStarRatingProps {
  product_avg_rating: number;
  product_sold_quantity: number;
}

export default function CustomerStarRating({
  product_avg_rating,
  product_sold_quantity,
}: CustomerStarRatingProps) {
  return (
    <div className="flex items-center mb-2 gap-1">
      {[...Array(Math.round(product_avg_rating))].map((_, i) => (
        <Star key={i} fill="currentColor" className="text-yellow-500 w-4 h-4" />
      ))}
      {[...Array(5 - Math.round(product_avg_rating))].map((_, i) => (
        <Star key={i} className="text-gray-300 w-4 h-4 dark:text-gray-500" />
      ))}
      <span className="text-gray-500 dark:text-gray-200 text-xs ml-2">
        ({product_sold_quantity} sold)
      </span>
    </div>
  );
}
