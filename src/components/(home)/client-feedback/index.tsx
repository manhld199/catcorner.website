"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    text: "Mèo của tôi rất kén ăn, nhưng loại thức ăn này đã trở thành món yêu thích của cô ấy. Cô ấy ăn rất ngon miệng!",
    author: "Thùy Trinh",
    details: "Mèo Lucky, 5 tuổi",
    rating: 5,
    avatar: "/imgs/home/avt.jpg",
  },
  {
    id: 2,
    text: "Chất lượng của sản phẩm này vượt quá mong đợi của tôi. Rất khuyến khích cho tất cả các chủ nuôi thú cưng!",
    author: "Hải Yến",
    details: "Whiskers, 3 tuổi",
    rating: 5,
    avatar: "/imgs/home/avt.jpg",
  },
  {
    id: 3,
    text: "Mèo của tôi đã không thích ăn trong một thời gian dài, nhưng từ khi thử loại thức ăn này, cô ấy ăn rất ngon miệng. Tôi thật sự hài lòng và sẽ mua lại!",
    author: "Đức Mạnh",
    details: "Mèo Simba, 4 tuổi",
    rating: 5,
    avatar: "/imgs/home/avt.jpg",
  },
];

export default function ClientFeedback() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 w-[75%]">
          <h2 className="text-4xl font-bold tracking-tight text-black">
            Phản hồi từ khách hàng
          </h2>
          <p className="text-xl text-muted-foreground dark:text-gray-600">
            Hơn 2000 đánh giá chân thực. Chúng tôi không chỉnh sửa hoặc can
            thiệp vào đánh giá của khách hàng.
          </p>
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="relative w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                <Image
                  src={`/imgs/home/avt.jpg`}
                  alt={`Reviewer ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-yellow-400">★</div>
            <span className="text-xl font-semibold text-black">4.8</span>
            <span className="text-muted-foreground dark:text-gray-600">
              (2000+ đánh giá)
            </span>
          </div>
        </div>

        <div className="relative">
          <Card className="relative bg-background h-[290px] dark:bg-pri-6 border-none">
            <CardContent className="p-9 h-full">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-4 top-4"
                    aria-label="Expand review">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Quote className="h-8 w-8 text-yellow-300 mb-4" />
                  <p className="text-xl mb-6 text-gray-800 dark:text-gray-200 h-[80px]">
                    {testimonials[currentIndex].text}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">
                        {testimonials[currentIndex].author}
                      </h4>
                      <p className="text-base text-muted-foreground dark:text-gray-300">
                        {testimonials[currentIndex].details}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <Button
              size="icon"
              variant="secondary"
              className={`pointer-events-auto -translate-x-1/2 rounded-[32px] w-12 h-12 transition-colors 
      ${currentIndex > 0 ? "bg-pri-1 hover:bg-pri-1/90" : "bg-white hover:bg-gray-100"}`}
              onClick={prevTestimonial}
              aria-label="Previous review">
              <ChevronLeft
                style={{ height: "24px", width: "24px" }}
                className={`h-8 w-8 font-bold ${currentIndex > 0 ? "text-white" : "text-gray-500"}`}
              />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className={`pointer-events-auto translate-x-1/2 rounded-[32px] w-12 h-12 transition-colors 
      ${currentIndex < testimonials.length - 1 ? "bg-pri-1 hover:bg-pri-1/90" : "bg-white hover:bg-gray-100"}`}
              onClick={nextTestimonial}
              aria-label="Next review">
              <ChevronRight
                style={{ height: "24px", width: "24px" }}
                className={`h-8 w-8 font-bold ${currentIndex < testimonials.length - 1 ? "text-white" : "text-gray-500"}`}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
