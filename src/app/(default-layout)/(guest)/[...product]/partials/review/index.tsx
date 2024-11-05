// partials/review/index.tsx

"use client";

interface Review {
  id: number;
  user: string;
  date: string;
  rating: number;
  title: string;
  content: string;
}

interface ReviewProps {
  demoReviews: Review[];
}

export default function CustomerReview({ demoReviews }: ReviewProps) {
  return (
    <div className="mt-4 dark:text-gray-200">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        Đánh giá của khách hàng
      </h2>
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-yellow-500">★★★★☆</span>
        <span className="text-lg font-semibold dark:text-white">4.1</span>
        <span className="text-gray-500 dark:text-gray-400">
          Dựa trên đánh giá của 131 khách hàng
        </span>
      </div>
      {/* Các thành phần đánh giá khách hàng */}
      {demoReviews.map((review) => (
        <div key={review.id} className="border-b pb-4">
          <div className="flex items-center mb-1">
            <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {review.user} - {review.date}
            </span>
          </div>
          <h3 className="font-semibold dark:text-white">{review.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mt-1">
            {review.content}
          </p>
        </div>
      ))}
    </div>
  );
}
