import BlogCard from "../blog-card/index";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: 1,
    image: "/imgs/home/image-arti.png",
    date: "Tên tác giả - 13/05/2024",
    title: "Tên bài viết",
    hashtags: ["hashtag", "hashtag"],
  },
  {
    id: 2,
    image: "/imgs/home/image-arti.png",
    date: "Tên tác giả - 13/05/2024",
    title: "Tên bài viết",
    hashtags: ["hashtag", "hashtag"],
  },
  {
    id: 3,
    image: "/imgs/home/image-arti.png",
    date: "Tên tác giả - 13/05/2024",
    title: "Tên bài viết",
    hashtags: ["hashtag", "hashtag"],
  },
  {
    id: 4,
    image: "/imgs/home/image-arti.png",
    date: "Tên tác giả - 13/05/2024",
    title: "Tên bài viết",
    hashtags: ["hashtag", "hashtag"],
  },
  {
    id: 5,
    image: "/imgs/home/image-arti.png",
    date: "Tên tác giả - 13/05/2024",
    title: "Tên bài viết",
    hashtags: ["hashtag", "hashtag"],
  },
];

export default function BlogListing() {
  return (
    <div className="container mx-auto w-[80%] p-6">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Explore more topics...</h1>
          <p className="text-muted-foreground">
            Read the care recommendations for your cat
          </p>
        </div>
        <Button className="bg-[#1B4242] hover:bg-[#1B4242]/90 text-white">
          Explore more
        </Button>
      </div>

      <div className="flex overflow-x-auto space-x-3 pb-8">
        {articles.map((article, index) => (
          <BlogCard
            key={article.id}
            image={article.image}
            date={article.date}
            title={article.title}
            hashtags={article.hashtags}
            isOdd={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}
