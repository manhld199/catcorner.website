import BlogCard from "../blog-card/index";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { GUEST_BLOG_URL } from "@/utils/constants/urls";
import Link from "next/link";
import { BlogCardShort } from "@/components";

export default function BlogListing() {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Hàm fetch dữ liệu từ API
  const fetchBlogs = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${GUEST_BLOG_URL}?page=${page}&limit=9`);

      const data = await res.json();

      if (data.status === 200 && data.success) {
        // Chọn 5 bài viết ngẫu nhiên từ danh sách dữ liệu
        const randomBlogs = data.data.articles
          .sort(() => 0.5 - Math.random())
          .slice(0, 5); // Lấy 5 bài viết

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
    fetchBlogs(1);
  }, []);
  return (
    <div className="container mx-auto w-[80%] p-6">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Khám phá thêm các chủ đề...
          </h1>
          <p className="text-muted-foreground dark:text-gray-200">
            Đọc các lời khuyên chăm sóc cho mèo của bạn
          </p>
        </div>
        <Link href="/blogs">
          <Button className="bg-[#1B4242] hover:bg-[#1B4242]/90 text-white">
            Khám phá thêm
          </Button>
        </Link>
      </div>

      <div className="flex overflow-x-auto space-x-3 pb-8">
        {featuredBlogs.map((blog, index) => (
          <Link
            key={index}
            href={`/blogs/${blog.article_slug}/${encodeURIComponent(
              blog.article_id_hashed
            )}`}
            className="block">
            <BlogCardShort
              className="min-w-[223px] max-w-[300px] h-[285px] overflow-hidden p-3"
              image={blog.article_avt}
              date={`${blog.article_author_name} - ${new Date(
                blog.article_published_date
              ).toLocaleDateString()}`}
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
