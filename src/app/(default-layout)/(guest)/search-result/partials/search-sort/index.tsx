"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSearchParams, useRouter } from "next/navigation";

export default function SearchSort() {
  const [sortValue, setSortValue] = React.useState("recent");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (value: string) => {
    setSortValue(value);

    // Cập nhật query string
    const currentParams = new URLSearchParams(searchParams.toString());
    if (value) {
      currentParams.set("sortBy", value);
    } else {
      currentParams.delete("sortBy");
    }
    router.push(`/search-result?${currentParams.toString()}`);
  };

  return (
    <div className="flex items-center justify-end gap-4 mb-6">
      <p className="text-lg font-semibold">Sắp xếp theo:</p>
      <Select value={sortValue} onValueChange={handleChange}>
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Chọn sắp xếp" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="recent">Gần đây nhất</SelectItem>
            <SelectItem value="low-to-high">Giá thấp đến cao</SelectItem>
            <SelectItem value="high-to-low">Giá cao đến thấp</SelectItem>
            <SelectItem value="best-rating">Đánh giá cao</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
