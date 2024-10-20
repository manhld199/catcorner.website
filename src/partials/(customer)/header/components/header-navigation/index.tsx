import React from "react";

export default function CustomerHeaderNavigation() {
  return (
    <>
      {/* Navigation Links */}
      <nav className="flex space-x-8">
        <a
          href="#"
          className="phone:hidden laptop:block text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 font-semibold laptop:text-base desktop:block desktop:text-base tablet:text-sm"
        >
          Home
        </a>
        <a
          href="#"
          className="phone:hidden desktop:block text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 font-semibold tablet:hidden desktop:block"
        >
          Hot Products
        </a>
        <a
          href="#"
          className="phone:hidden desktop:block text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 font-semibold tablet:hidden desktop:block"
        >
          Hot Sales
        </a>
      </nav>
    </>
  );
}
