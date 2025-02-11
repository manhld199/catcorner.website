import { Metadata } from "next";
import { GUEST_DETAIL_BLOG_URL } from "@/utils/constants/urls";
import Image from "next/image";
import { notFound } from "next/navigation";

// Định nghĩa kiểu dữ liệu cho outline
interface OutlineItem {
  level: number;
  text: string;
  id: string;
}

// Metadata để hiển thị trên trình duyệt
export async function generateMetadata({
  params,
}: {
  params: { slug: string; id: string };
}): Promise<Metadata> {
  const { slug, id } = params;
  const res = await fetch(`${GUEST_DETAIL_BLOG_URL}/${slug}/${id}`);
  const data = await res.json();

  if (!data?.success) {
    return {
      title: "Không tìm thấy bài viết",
      description: "Bài viết bạn tìm kiếm không tồn tại",
    };
  }

  const article = data.data;

  return {
    title: article.article_name,
    description: article.article_short_description,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const { slug, id } = params;

  // Fetch dữ liệu bài viết
  const res = await fetch(`${GUEST_DETAIL_BLOG_URL}/${slug}/${id}`);
  const data = await res.json();

  if (!data?.success) {
    notFound();
  }

  const article = data.data;

  // Tạo danh sách outline từ nội dung bài viết
  const outline: OutlineItem[] =
    article.article_content
      .match(/<h[1-4].*?>.*?<\/h[1-4]>/g)
      ?.map((heading: string) => {
        const level = Number(heading.match(/<h([2-4])/)?.[1]); // Lấy cấp độ tiêu đề (h1, h2,...)
        const text = heading.replace(/<\/?h[1-4].*?>/g, "").trim(); // Xóa thẻ HTML để lấy text
        const id =
          heading.match(/id="(.*?)"/)?.[1] ||
          text.toLowerCase().replace(/\s+/g, "-"); // Tạo ID nếu thiếu
        return { level, text, id };
      }) || [];

  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Nội dung bài viết */}
      <article
        className="lg:col-span-3 bg-white dark:bg-gray-800 px-4 py-4 rounded-lg overflow-y-auto"
        style={{ height: "100vh" }} // Nội dung bên trái cuộn được
      >
        {/* Ảnh tiêu đề */}
        <Image
          src={article.article_avt}
          alt={article.article_name}
          width={1200}
          height={600}
          className="rounded-lg mb-6"
        />

        {/* Tiêu đề và meta */}
        <h1 className="text-3xl font-bold mb-2">{article.article_name}</h1>
        <p className="text-muted-foreground mb-4">
          {article.article_author_name} -{" "}
          {new Date(article.article_published_date).toLocaleDateString()}
        </p>

        {/* Hashtags */}
        <div className="flex gap-2 mb-6">
          {article.article_tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 text-sm bg-[#FFF1D0] text-black rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Nội dung bài viết */}
        <div
          className="prose lg:prose-lg"
          dangerouslySetInnerHTML={{ __html: article.article_content }}></div>

        {/* Bài viết liên quan */}
        {article.related_articles && (
          <section className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Bài viết liên quan</h3>
            <ul className="list-disc list-inside">
              {article.related_articles.map((related: any, index: number) => (
                <li key={index}>
                  <a
                    href={`/blog/${related.article_slug}/${encodeURIComponent(
                      related.article_id_hashed
                    )}`}
                    className="text-teal-600 dark:text-teal-400 hover:underline font-medium">
                    {related.article_name}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {/* Sidebar */}
      <aside
        className="bg-white dark:bg-gray-800 rounded-lg p-6 h-fit sticky top-6" // Sticky để cố định
        style={{ maxHeight: "calc(100vh - 2rem)", overflowY: "auto" }} // Cuộn nội dung bên phải
      >
        <h2 className="text-xl font-bold mb-4">Nội dung</h2>
        <ul className="list-inside text-gray-700 space-y-2">
          {outline.map(({ level, text, id }, index) => (
            <li
              key={index}
              style={{ marginLeft: `${(level - 2) * 1.5}rem` }}
              className="text-gray-600 text-sm">
              <a
                href={`#${id}`}
                className="text-teal-600 dark:text-teal-400 hover:underline font-medium">
                {text}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
