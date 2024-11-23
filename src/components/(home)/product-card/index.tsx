import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";

interface ProductCardProps {
  name: string;
  image: string;
  rating: number;
  weights: string[];
  originalPrice: string;
  salePrice: string;
}

export default function ProductCard({
  name,
  image,
  rating,
  weights,
  originalPrice,
  salePrice,
}: ProductCardProps) {
  return (
    <Card className="relative w-[300px]">
      <Badge variant="secondary" className="absolute left-3 top-3 bg-slate-100">
        Food
      </Badge>
      <CardHeader className="p-4">
        <div className="relative">
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2 mb-3">
          {weights.map((weight) => (
            <Badge
              key={weight}
              variant="outline"
              className="rounded-sm text-xs">
              {weight}
            </Badge>
          ))}
        </div>
        <h3 className="font-medium mb-4 line-clamp-2">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground line-through">
            {originalPrice}
          </span>
          <span className="text-lg font-bold text-red-500">{salePrice}</span>
        </div>
      </CardContent>
    </Card>
  );
}
