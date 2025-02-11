"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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
import { GUEST_BLOG_URL } from "@/utils/constants/urls";

// Hàm chuẩn hóa chuỗi (bỏ dấu, viết thường)
const normalizeString = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

export default function BlogListPage() {
  const [blogCards, setBlogCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  // Hàm fetch dữ liệu từ API
  const fetchBlogs = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${GUEST_BLOG_URL}?page=${page}&limit=9`);

      const data = await res.json();

      if (data.status === 200 && data.success) {
        setBlogCards(data.data.articles);
        setMaxPage(data.data.maxPage);

        // Chọn 3 bài viết ngẫu nhiên từ danh sách dữ liệu
        const randomBlogs = data.data.articles
          .sort(() => 0.5 - Math.random())
          .slice(0, 3); // Lấy 3 bài viết
        setFeaturedBlogs(randomBlogs);
      } else {
        console.error("Failed to fetch articles:", data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  // Hàm xử lý tìm kiếm
  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Lọc bài viết theo từ khóa tìm kiếm
  const filteredBlogs = blogCards.filter((blog) =>
    normalizeString(blog.article_name).includes(normalizeString(searchQuery))
  );

  // Hàm xử lý chuyển trang
  const handlePageChange = (page: any) => {
    if (page > 0 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Danh sách bài viết */}
      <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg px-4 py-6">
        <div className="flex justify-between">
          <h1 className="font-bold mb-6">Bài viết</h1>

          {/* Thanh tìm kiếm */}
          <div className="relative mb-6 w-4/12">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full border border-gray-300 dark:border-none rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
          </div>
        </div>

        {isLoading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBlogs.map((blog, index) => (
              <Link
                key={index}
                href={`/blogs/${blog.article_slug}/${encodeURIComponent(
                  blog.article_id_hashed
                )}`}>
                <BlogCardFull
                  image={blog.article_avt}
                  date={`${blog.article_author_name} - ${new Date(
                    blog.article_published_date
                  ).toLocaleDateString()}`}
                  title={blog.article_name}
                  shortDescription={blog.article_short_description}
                  hashtags={blog.article_tags || []}
                />
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                />
              </PaginationItem>
              {Array.from({ length: maxPage }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === index + 1}
                    onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="bg-white dark:bg-gray-800 rounded-lg px-4 py-6">
        {/* Chủ đề hấp dẫn */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Chủ đề hấp dẫn</h2>
          <div className="flex flex-wrap gap-2">
            {["hashtag", "hashtag", "hashtag", "hashtag"].map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-pri-5 text-black rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bài viết nổi bật */}
        <div>
          <h2 className="text-xl font-bold mb-4">Bài viết nổi bật</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-1">
            {featuredBlogs.map((blog, index) => (
              <Link
                key={index}
                href={`/blogs/${blog.article_slug}/${encodeURIComponent(
                  blog.article_id_hashed
                )}`}
                className="block">
                <BlogCardShort
                  image={blog.article_avt}
                  date={`${blog.article_author_name} - ${new Date(
                    blog.article_published_date
                  ).toLocaleDateString()}`}
                  title={blog.article_name}
                  hashtags={blog.article_tags || []}
                />
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
