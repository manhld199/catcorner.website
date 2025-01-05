"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { BlogCardFull, BlogCardShort } from "@/components";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function BlogListPage() {
  // Demo data
  const allBlogCards = Array(12).fill({
    image: "/imgs/test.jpg",
    date: "Tên tác giả - 19/09/2003",
    title: "Tên bài viết Tên bài viết",
    shortDescription:
      "Short description Short dsad description Short description Short...",
    hashtags: ["hashtag", "hashtag", "hashtag"],
  });

  // State cho danh sách bài viết và từ khóa tìm kiếm
  const [blogCards, setBlogCards] = useState(allBlogCards);
  const [searchQuery, setSearchQuery] = useState("");

  // Hàm xử lý tìm kiếm
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredBlogs = allBlogCards.filter((blog) =>
      blog.title.toLowerCase().includes(query)
    );
    setBlogCards(filteredBlogs);
  };

  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Danh sách bài viết */}
      <div className="lg:col-span-3 bg-white rounded-lg px-4 py-6">
        <div className="flex justify-between">
          <h1 className="font-bold mb-6">Bài viết</h1>

          {/* Thanh tìm kiếm */}
          <div className="relative mb-6 w-4/12">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogCards.map((blog, index) => (
            <BlogCardFull
              key={index}
              image={blog.image}
              date={blog.date}
              title={blog.title}
              shortDescription={blog.shortDescription}
              hashtags={blog.hashtags}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="bg-white rounded-lg px-4 py-6">
        {/* Chủ đề hấp dẫn */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Chủ đề hấp dẫn</h2>
          <div className="flex flex-wrap gap-2">
            {["hashtag", "hashtag", "hashtag", "hashtag"].map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-[#FFF1D0] text-black rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bài viết nổi bật */}
        <div>
          <h2 className="text-xl font-bold mb-4">Bài viết nổi bật</h2>
          <div className="space-y-4">
            {Array(3)
              .fill({
                image: "/imgs/test.jpg",
                date: "Tên tác giả - 13/05/2024",
                title: "Tên bài viết",
                hashtags: ["hashtag", "hashtag"],
              })
              .map((blog, index) => (
                <BlogCardShort
                  key={index}
                  image={blog.image}
                  date={blog.date}
                  title={blog.title}
                  hashtags={blog.hashtags}
                />
              ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
