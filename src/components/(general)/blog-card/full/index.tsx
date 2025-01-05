import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  image: string;
  date: string;
  title: string;
  shortDescription: string;
  hashtags: string[];
}

export default function BlogCardFull({
  image = "/placeholder.svg",
  date = "Tên tác giả - 19/09/2003",
  title = "Tên bài viết Tên bài viết",
  shortDescription = "Short description Short description Short description Short description...",
  hashtags = ["hashtag", "hashtag", "hashtag"],
}: BlogCardProps) {
  return (
    <Card className="rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white">
      {/* Header */}
      <div className="bg-pri-4 px-4 py-2">
        <h3 className="text-lg font-bold">{title}</h3>
      </div>

      {/* Content */}
      <CardContent className="p-3">
        {/* Date */}
        <p className=" text-sm mb-2">{date}</p>
        {/* Short description */}
        <p className="text-gray-500 text-sm mb-4">{shortDescription}</p>
        {/* Hashtags */}
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-pri-5 text-black px-2 py-1 rounded-full font-light">
              #{tag}
            </Badge>
          ))}
        </div>
        {/* Image */}
        <div className="relative w-full aspect-video mt-4">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-lg"
            quality={100}
          />
        </div>
      </CardContent>
    </Card>
  );
}
