import React from "react";
import { ShoppingBag, UserRound, ChevronDown, Search } from "lucide-react";

export default async function CustomerHeader() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center">
          {/* <img src="" alt="Logo" className="h-10 mr-2" /> */}
          <span className="text-2xl font-bold text-teal-700">CATCORNER</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-pri-1 hover:text-teal-700 font-semibold">
            Home
          </a>
          <a href="#" className="text-pri-1 hover:text-teal-700 font-semibold">
            Hot Products
          </a>
          <a href="#" className="text-pri-1 hover:text-teal-700 font-semibold">
            Hot Sales
          </a>
          <div className="relative group">
            <button className="flex items-center text-pri-1 hover:text-teal-700 focus:outline-none font-semibold">
              Categories
              <ChevronDown className="text-pri-1" />
            </button>
            {/* Dropdown Menu */}
            <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded-md w-48 z-1000">
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Category 1
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Category 2
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Category 3
              </a>
            </div>
          </div>
        </nav>

        {/* Search Bar */}
        <div className="flex items-center">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 pr-14 py-3 text-gray-700 placeholder-gray-400 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-pri-1 p-2 rounded-full hover:bg-teal-700"
              type="submit"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Icons for Sign In and Shopping Bag */}
        <div className="flex items-center space-x-4">
          <a href="#" className="flex text-pri-1 hover:text-teal-700">
            <UserRound />
            <span className="ml-1 font-semibold">Sign in</span>
          </a>
          <a
            href="#"
            className="relative flex text-pri-1 hover:text-teal-700 items-center"
          >
            <div className="relative">
              <ShoppingBag />
              {/* Badge - Huy hiệu hiển thị số lượng */}
              <span className="absolute top-3 left-4 bg-orange-500 text-white text-[8px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
                12
              </span>
            </div>
            <span className="ml-2 font-semibold">Shopping bag</span>
          </a>
        </div>
      </div>
      {/* </div> */}
    </header>
  );
}
