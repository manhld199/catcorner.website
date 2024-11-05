"use client";

export default function SearchFilter() {
  return (
    <aside className="w-1/4">
      <h2 className="font-bold mb-4 text-lg">Filter:</h2>
      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categories:</h3>
        <div className="flex flex-wrap gap-2">
          {["Food", "Toys", "Clothes", "Balo"].map((category, index) => (
            <button
              key={index}
              className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
              {category} +
            </button>
          ))}
        </div>
      </div>
      {/* Ratings */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Ratings:</h3>
        <div className="flex flex-col space-y-2">
          {new Array(5).fill(null).map((_, index) => (
            <div key={index} className="flex items-center space-x-1">
              <span className="text-yellow-500">{"★".repeat(5 - index)}</span>
              <span className="text-gray-400 dark:text-gray-500">
                {"☆".repeat(index)}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Budget */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Budget:</h3>
        <div className="flex gap-2">
          <input
            className="w-1/2 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder="Min"
          />
          <input
            className="w-1/2 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder="Max"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {["100-500K", "500K-1tr", "1tr-2tr", ">2tr"].map((range, index) => (
            <button
              key={index}
              className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
              {range}
            </button>
          ))}
        </div>
      </div>
      {/* Sale */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Sale:</h3>
        <div className="flex gap-2">
          {["New", "Hot sale", "None"].map((sale, index) => (
            <button
              key={index}
              className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
              {sale}
            </button>
          ))}
        </div>
      </div>
      {/* Filter buttons */}
      <div className="flex gap-4">
        <button className="flex-1 px-4 py-2 border rounded-md dark:border-gray-600">
          Cancel
        </button>
        <button className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
          Show
        </button>
      </div>
    </aside>
  );
}
