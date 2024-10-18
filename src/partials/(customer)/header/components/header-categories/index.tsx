import Image from "next/image";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function CustomerHeaderCategories() {
  const categories = [
    {
      image: "/imgs/test.jpg",
      name: "Thức ăn cho mèo",
      productCount: 120,
    },
    {
      image: "/imgs/test.jpg",
      name: "Đồ chơi cho mèo",
      productCount: 80,
    },
    {
      image: "/imgs/test.jpg",
      name: "Đồ nội thất cho mèo",
      productCount: 45,
    },
    {
      image: "/imgs/test.jpg",
      name: "Sản phẩm chăm sóc mèo",
      productCount: 30,
    },
    {
      image: "/imgs/test.jpg",
      name: "Cát vệ sinh cho mèo",
      productCount: 60,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DropdownMenuLabel className="phone:hidden laptop:flex py-0 text-base flex items-center text-pri-1 dark:text-white hover:text-teal-700 dark:hover:text-teal-300 focus:outline-none font-semibold group desktop:text-base laptop:text-base">
          Categories
          <ChevronDown className="laptop:text-sm ml-1 text-pri-1 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300" />
        </DropdownMenuLabel>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="laptop:w-[90vw] desktop:w-[80vw] absolute left-1/2 laptop:-translate-x-[30%] desktop:-translate-x-[45%] bg-white dark:bg-gray-800 dark:text-white shadow-lg dark:shadow-none mt-4 border border-transparent dark:border-none">
        <DropdownMenuGroup>
          {categories.map((category, index) => (
            <DropdownMenuItem
              key={index}
              className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                {/* Hình ảnh nhỏ bên trái */}
                <Image
                  src={category.image}
                  alt={category.name}
                  width={60}
                  height={60}
                  className="rounded mr-3 object-cover w-[60px] h-[60px]"
                />
                <div>
                  <span className="font-semibold dark:text-white">
                    {category.name}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.productCount} sản phẩm
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="dark:bg-gray-700" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
