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

export default function SearchSort() {
  const [sortValue, setSortValue] = React.useState("recent");

  const handleChange = (value: string) => {
    setSortValue(value);
    console.log("Selected sort option:", value);
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
