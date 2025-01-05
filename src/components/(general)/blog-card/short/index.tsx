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
}

export default function BlogCardShort({
  image,
  date,
  title,
  hashtags = ["hashtag", "hashtag"],
}: BlogCardProps) {
  return (
    <Card className="[height:fit-content] overflow-hidden min-w-[223px] max-w-[300px] rounded-[8px] p-3">
      <div className="relative aspect-[1.5] w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-md"
          quality={100}
        />
      </div>
      <p className="text-muted-foreground text-xs pt-2">{date}</p>
      <CardContent className="space-y-2 p-0 pt-1">
        <h5 className="font-bold tracking-tight mt-0 line-clamp-2">{title}</h5>
        <div className="flex gap-1 flex-wrap text-xs">
          {hashtags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-sm bg-pri-5 text-black hover:bg-[#FFF8EA]/80 font-light rounded-[50px]">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-0 pt-4">
        <Button
          variant="link"
          className="p-0 h-auto font-medium text-black hover:no-underline flex items-center gap-2">
          Read more
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
