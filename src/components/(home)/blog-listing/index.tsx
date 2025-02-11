"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { GUEST_BLOG_URL } from "@/utils/constants/urls";
import Link from "next/link";
import { BlogCardShort } from "@/components";

export default function BlogListing() {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Hàm fetch dữ liệu từ API
  const fetchBlogs = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${GUEST_BLOG_URL}?page=${page}&limit=100`); // Lấy toàn bộ bài viết
      const data = await res.json();

      if (data.status === 200 && data.success) {
        // Lấy tất cả bài viết từ API mà không cần chọn ngẫu nhiên
        setFeaturedBlogs(data.data.articles);
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
    fetchBlogs(1); // Fetch blogs once on component mount
  }, []); // Chỉ gọi 1 lần khi component mount

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval: NodeJS.Timeout; // Định nghĩa kiểu rõ ràng cho scrollInterval

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          if (
            scrollContainer.scrollLeft >=
            scrollContainer.scrollWidth - scrollContainer.clientWidth
          ) {
            scrollContainer.scrollLeft = 0; // Reset scroll to start
          } else {
            scrollContainer.scrollLeft += 1; // Scroll to the right
          }
        }
      }, 10); // Tăng tốc độ cuộn (20ms thay vì 30ms)
    };

    const stopScrolling = () => {
      clearInterval(scrollInterval);
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("mouseenter", stopScrolling);
      scrollContainer.addEventListener("mouseleave", startScrolling);
      startScrolling();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseenter", stopScrolling);
        scrollContainer.removeEventListener("mouseleave", startScrolling);
      }
      clearInterval(scrollInterval);
    };
  }, [featuredBlogs]); // Keep the scrolling effect based on featured blogs state

  return (
    <div className="container mx-auto w-full px-4 sm:w-[90%] md:w-[85%] lg:w-[80%] py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-12">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Khám phá thêm các chủ đề...
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-200">
            Đọc các lời khuyên chăm sóc cho mèo của bạn
          </p>
        </div>
        <Link href="/blogs">
          <Button className="bg-[#1B4242] hover:bg-[#1B4242]/90 text-white text-sm sm:text-base">
            Khám phá thêm
          </Button>
        </Link>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-3 pb-8 scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}>
        {featuredBlogs.map((blog, index) => (
          <Link
            key={index}
            href={`/blogs/${blog.article_slug}/${encodeURIComponent(blog.article_id_hashed)}`}
            className="flex-shrink-0">
            <BlogCardShort
              className="w-[223px] sm:w-[250px] md:w-[275px] lg:w-[300px] h-[285px] overflow-hidden p-3"
              image={blog.article_avt}
              date={`${blog.article_author_name} - ${new Date(blog.article_published_date).toLocaleDateString()}`}
              title={blog.article_name}
              hashtags={blog.article_tags || []}
              isOdd={index % 2 !== 0}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
