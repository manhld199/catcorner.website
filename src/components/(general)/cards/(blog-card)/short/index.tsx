import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  image: string;
  date: string;
  title: string;
  hashtags: string[];
  isOdd?: boolean;
  className?: string; // Cho phép nhận className từ bên ngoài
}

export default function BlogCardShort({
  image,
  date,
  title,
  hashtags = ["hashtag", "hashtag"],
  isOdd,
  className = "", // Giá trị mặc định nếu không truyền
}: BlogCardProps) {
  return (
    <Card
      className={`flex flex-col h-full overflow-hidden rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 ${
        isOdd ? "mt-16" : ""
      } ${className}`} // Hợp nhất className truyền từ ngoài với các class mặc định
    >
      {/* Image */}
      <div className="relative aspect-[1.5] w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-t-md"
          quality={100}
        />
      </div>

      {/* Content */}
      <CardContent className="flex-1 px-2 py-0 mt-2">
        <p className="text-gray-500 text-xs">{date}</p>
        <p className="font-semibold tracking-tight line-clamp-2 text-base">
          {title}
        </p>
        <div className="flex gap-2 flex-wrap">
          {hashtags.slice(0, 3).map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-[#FFF1D0] text-black hover:bg-[#FFECB5] font-medium rounded-full">
              #{tag}
            </Badge>
          ))}
          {hashtags.length > 3 && (
            <Badge
              variant="secondary"
              className="text-xs bg-[#FFF1D0] text-black hover:bg-[#FFECB5] font-medium rounded-full">
              +{hashtags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="px-4 py-0 mt-2">
        <Button
          variant="link"
          className="flex items-center gap-1 text-teal-600 hover:text-teal-500 transition-colors text-sm font-medium p-0">
          Đọc thêm
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
