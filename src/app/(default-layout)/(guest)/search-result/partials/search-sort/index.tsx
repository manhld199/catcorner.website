"use client";

export default function SearchSort() {
  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-lg font-semibold">Sắp xếp theo:</p>
      <select className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
        <option>Gần đây nhất</option>
        <option>Giá thấp đến cao</option>
        <option>Giá cao đến thấp</option>
        <option>Đánh giá cao</option>
      </select>
    </div>
  );
}
