// ProductDetailsPage component (page.tsx)

"use client";

import { useState } from "react";
import {
  CustomerProductSlider,
  CustomerProductInformation,
  CustomerProductBuyForm,
  CustomerProductReview,
} from "./partials";

// Demo data for product variants
const demoVariants = [
  {
    name: "Variant 1",
    url: "/product/variant-1",
    image: {
      url: "/imgs/test.jpg",
      alt: "Variant 1 Image",
    },
    quantity: 5,
  },
  {
    name: "Variant 2",
    url: "/product/variant-2",
    image: {
      url: "/imgs/test.jpg",
      alt: "Variant 2 Image",
    },
    quantity: 10,
  },
  {
    name: "Variant 3",
    url: "/product/variant-3",
    image: {
      url: "/imgs/test.jpg",
      alt: "Variant 3 Image",
    },
    quantity: 20,
  },
];

// Demo data for customer reviews
const demoReviews = [
  {
    id: 1,
    user: "Phan Nguyễn Hải Yến",
    date: "19/9/2024",
    rating: 4,
    title: "Cat and kitten love it!",
    content:
      "As my cat got older, I noticed he was becoming less active and pickier about his food. After consulting with my vet, I switched to this senior cat formula. It's designed with his aging needs in mind, and it's made a noticeable difference. His coat looks healthier, and he seems more lively than before. I appreciate that it's easy for him to chew and digest. This cat food is a lifesaver for my senior feline companion.",
  },
  {
    id: 2,
    user: "Nguyễn Văn A",
    date: "15/8/2024",
    rating: 5,
    title: "Best food for my senior cat!",
    content:
      "I've tried so many brands for my cat, but nothing works as well as this one. His energy levels are better, and he loves the taste!",
  },
  {
    id: 3,
    user: "Lê Thị B",
    date: "3/7/2024",
    rating: 3,
    title: "Good but a bit expensive",
    content:
      "My cat likes it, but I find it a bit on the expensive side compared to other brands. Still, I see some improvement in his coat and energy.",
  },
];

// Dữ liệu demo
const productImgs = [
  { link: "/imgs/test.jpg", alt: "Product Image 1" },
  { link: "/imgs/test-1.jpg", alt: "Product Image 2" },
  { link: "/imgs/test.jpg", alt: "Product Image 3" },
  { link: "/imgs/test.jpg", alt: "Product Image 4" },
  { link: "/imgs/test-1.jpg", alt: "Product Image 5" },
];

export default function ProductDetailsPage() {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [inputQuantity, setInputQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("info");

  const handleVariantSelect = (index: number) => setSelectedVariantIndex(index);
  const handleQuantityChange = (newQuantity: number) =>
    setInputQuantity(newQuantity);

  return (
    <div className="container mx-auto my-6 w-4/5">
      <section className="flex flex-col laptop:flex-row gap-12">
        <div className="laptop:w-1/2">
          <CustomerProductSlider SliderImgs={productImgs} />
        </div>

        <div className="laptop:w-2/3">
          <CustomerProductBuyForm
            pid="12345"
            demoVariants={demoVariants}
            selectedVariantIndex={selectedVariantIndex}
            inputQuantity={inputQuantity}
            onVariantSelect={handleVariantSelect}
            onQuantityChange={handleQuantityChange}
          />
        </div>
      </section>
      <section className="mt-8">
        <div className="flex gap-4 border-b pb-2">
          <button
            className={`font-medium ${
              activeTab === "info"
                ? "border-b-2 border-teal-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("info")}>
            Thông tin
          </button>
          <button
            className={`font-medium ${
              activeTab === "reviews"
                ? "border-b-2 border-teal-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("reviews")}>
            Đánh giá
          </button>
        </div>
        {activeTab === "info" ? (
          <CustomerProductInformation />
        ) : (
          <CustomerProductReview demoReviews={demoReviews} />
        )}
      </section>
    </div>
  );
}
