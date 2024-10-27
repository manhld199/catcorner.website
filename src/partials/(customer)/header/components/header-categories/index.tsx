import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CustomerHeaderCategories() {
  const [selectedCategory, setSelectedCategory] = useState("Hạt dinh dưỡng");

  const categories = [
    {
      id: 1,
      name: "Hạt dinh dưỡng",
      products: ["Product 1", "Product 2"],
      image: "/imgs/test.jpg",
    },
    {
      id: 2,
      name: "Pate",
      products: ["Product 3", "Product 4"],
      image: "/imgs/test.jpg",
    },
    {
      id: 3,
      name: "Cỏ mèo",
      products: ["Product 5", "Product 6"],
      image: "/imgs/test.jpg",
    },
    {
      id: 4,
      name: "Cát vệ sinh",
      products: ["Product 7", "Product 8"],
      image: "/imgs/test.jpg",
    },
    {
      id: 5,
      name: "Nhà vệ sinh",
      products: ["Product 9", "Product 10"],
      image: "/imgs/test.jpg",
    },
  ];

  const products = [
    {
      category: "Hạt dinh dưỡng",
      items: [
        {
          name: "Product 1",
          price: "₫100.000",
          image: "/imgs/test.jpg",
        },
        {
          name: "Product 2",
          price: "₫200.000",
          image: "/imgs/test.jpg",
        },
      ],
    },
    {
      category: "Pate",
      items: [
        {
          name: "Product 3",
          price: "₫150.000",
          image: "/imgs/test.jpg",
        },
        {
          name: "Product 4",
          price: "₫250.000",
          image: "/imgs/test.jpg",
        },
      ],
    },
  ];

  const filteredProducts = products.find(
    (p) => p.category === selectedCategory
  );

  return (
    <div className="relative group">
      {/* Trigger */}
      <div className="hidden laptop:flex cursor-pointer relative text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 items-center">
        <span className="ml-2 font-semibold tablet:block laptop:block desktop:block">
          Categories
        </span>
        <ChevronDown />
      </div>

      {/* Dropdown */}
      <div className="z-50 absolute left-1/2 transform laptop:-translate-x-[27%] desktop:-translate-x-[45%] mt-4 laptop:w-[90vw] desktop:w-[80vw] bg-white dark:bg-black border border-gray-200 dark:border-gray-600 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300">
        {/* Tam giác trên dropdown */}
        <div className="absolute top-[-6px] laptop:left-[26%] desktop:left-[45%] transform desktop:-translate-x-1/2 w-3 h-3 bg-white dark:bg-black rotate-45 transform border-t border-l border-gray-200 dark:border-gray-600"></div>

        <div className="flex">
          {/* Danh mục bên trái */}
          <div className="w-1/4 bg-teal-50 dark:bg-gray-800 py-4">
            <ul>
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`px-4 py-2 hover:bg-teal-300/10 dark:hover:bg-gray-700 cursor-pointer flex items-center ${
                    selectedCategory === category.name
                      ? "bg-teal-300/10 dark:bg-gray-700"
                      : ""
                  }`}
                  onMouseEnter={() => setSelectedCategory(category.name)}
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={40}
                    height={40}
                    className="object-cover rounded w-[40px] h-[40px] mr-3"
                  />
                  {category.name} ({category.products.length})
                </li>
              ))}
            </ul>
          </div>

          {/* Sản phẩm tương ứng bên phải */}
          <div className="w-2/3 p-4">
            <h3 className="font-bold mb-4">
              Sản phẩm bán chạy nhất trong {selectedCategory}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {filteredProducts?.items.map((product, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="object-cover rounded"
                  />
                  <h4 className="mt-2 text-sm font-medium">{product.name}</h4>
                  <p className="text-red-500">{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
