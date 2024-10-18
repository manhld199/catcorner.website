import React from "react";
import { Search } from "lucide-react";

export default function CustomerHeaderSearch() {
  return (
    <>
      {/* Search Bar */}
      <div className="flex items-center w-full phone:w-10/12 tablet:w-8/12 laptop:w-auto">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-4 pr-14 py-3 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600 dark:focus:ring-teal-300"
          />
          <button
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-pri-1 dark:bg-teal-700 p-2 rounded-full hover:bg-teal-700 dark:hover:bg-teal-500"
            type="submit"
          >
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </>
  );
}
