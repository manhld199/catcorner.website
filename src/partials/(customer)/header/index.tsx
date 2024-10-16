import React from "react";
import { ShoppingBag, UserRound, Menu, Search } from "lucide-react";
import { CustomerHeaderCategories } from "./components";

export default async function CustomerHeader() {
  return (
    <header className="bg-white dark:bg-black shadow-sm w-screen">
      <div className="mx-auto flex justify-between items-center desktop:w-4/5 laptop:w-11/12 phone:block tablet:flex tablet:w-11/12">
        <div className="phone:px-4 phone:py-1 phone:bg-pri-1 tablet:bg-transparent phone:flex phone:justify-between tablet:px-0">
          <a href="#" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-teal-700 dark:text-teal-300">
              CATCORNER
            </span>
          </a>

          <div className="flex content-center space-x-4 phone:block tablet:hidden">
            <button
              className="text-gray-700 dark:text-white"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-8">
          <a
            href="#"
            className="phone:hidden tablet:block text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 font-semibold laptop:text-base desktop:block desktop:text-base tablet:text-sm"
          >
            Home
          </a>
          <a
            href="#"
            className="phone:hidden tablet:block text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 font-semibold tablet:hidden desktop:block"
          >
            Hot Products
          </a>
          <a
            href="#"
            className="phone:hidden tablet:block text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 font-semibold tablet:hidden desktop:block"
          >
            Hot Sales
          </a>
          <CustomerHeaderCategories></CustomerHeaderCategories>
        </nav>

        <div className="phone:px-4 phone:py-3 flex justify-between">
          {/* Search Bar */}
          <div className="flex items-center">
            <div className="relative w-full max-w-lg">
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
          {/* Cart-hidden */}
          <a
            href="#"
            className="tablet:hidden relative flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 items-center"
          >
            <div className="relative">
              <ShoppingBag />
              <span className="absolute top-3 left-4 bg-orange-500 text-white text-[8px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
                12
              </span>
            </div>
          </a>
        </div>

        {/* Sign In */}
        <div className="phone:hidden tablet:flex items-center space-x-4">
          <a
            href="#"
            className="flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300"
          >
            <UserRound />
            <span className="ml-1 font-semibold tablet:hidden laptop:block desktop:block">
              Sign in
            </span>
          </a>
          {/* Cart */}
          <a
            href="#"
            className="relative flex text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 items-center"
          >
            <div className="relative">
              <ShoppingBag />
              <span className="absolute top-3 left-4 bg-orange-500 text-white text-[8px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
                12
              </span>
            </div>
            <span className="ml-2 font-semibold tablet:hidden laptop:block desktop:block">
              Shopping bag
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
