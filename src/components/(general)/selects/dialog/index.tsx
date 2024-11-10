"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { SELECT_DATA } from "@/data/components";
import { PLACEHOLDER_DATA } from "@/data/placeholder";
import { normalizeVietnameseStr } from "@/utils/functions/format";
import RenderTrigger from "./render-trigger";
import RenderSearch from "./render-search";
import RenderLayout from "./render-layout";

// Component nhận đầu vào: name, isMultiChoice, options
const SelectDialog: React.FC<{
  name: string;
  isMultiChoice: boolean;
  options: ({ value: string } | any)[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}> = ({
  name,
  isMultiChoice,
  options,
  value,
  onChange,
  type = "default",
  placeholder = PLACEHOLDER_DATA["select-default"],
  disabled = false,
}) => {
  // console.log("disableddisableddisabled", disabled);
  // console.log("vaaaaaaaaa", value);
  //   console.log("options", options);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [tempValue, setTempValue] = useState(value);

  // Xử lý logic tìm kiếm
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );

  // Cập nhật danh sách tùy chọn dựa trên tìm kiếm
  useEffect(() => {
    let filtered = options;

    // Kiểm tra điều kiện theo type
    switch (type) {
      case "default":
        // Logic tìm kiếm mặc định
        filtered = options.filter((option) =>
          option.value.includes(searchText.toLowerCase())
        );
        break;
      case "admin-categories":
        filtered = options.filter((option) =>
          normalizeVietnameseStr(option.name).includes(
            normalizeVietnameseStr(searchText)
          )
        );
        break;
      default:
        // Các trường hợp khác, có thể để logic mặc định hoặc không lọc gì cả
        filtered = options;
        break;
    }
    // console.log("filtered", filtered);

    // Cập nhật state của filteredOptions
    setFilteredOptions(filtered);
  }, [searchText, options, type]);

  // Xử lý chọn/ bỏ chọn
  const handleToggle = (selectedValue: string | any) => {
    // console.log("selectedValueselectedValueselectedValue", selectedValue);

    if (type == "admin-categories") {
      // console.log("aaaaaaaaaa", tempValue);
      // console.log("selectedValue", selectedValue);
      if (isMultiChoice) {
        const updatedValue = Array.isArray(tempValue)
          ? tempValue.includes(selectedValue._id)
            ? tempValue.filter((item) => item !== selectedValue._id)
            : [...tempValue, selectedValue._id]
          : [selectedValue._id];
        setTempValue(updatedValue);
        onChange(updatedValue);
      } else {
        setTempValue(selectedValue._id);
        onChange(selectedValue._id);
        setIsDialogOpen(false);
      }
    }
    // Trường hợp mặc định
    else {
      if (isMultiChoice) {
        const updatedValue = Array.isArray(tempValue)
          ? tempValue.includes(selectedValue)
            ? tempValue.filter((item) => item !== selectedValue)
            : [...tempValue, selectedValue]
          : [selectedValue];
        setTempValue(updatedValue);
        onChange(updatedValue);
      } else {
        setTempValue(selectedValue);
        onChange(selectedValue);
        setIsDialogOpen(false);
      }
    }
  };

  // Xử lý xác nhận lựa chọn
  const handleOkClick = () => {
    onChange(tempValue);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* trigger */}
      <div className="relative">
        <DialogTrigger asChild>
          <RenderTrigger
            options={options}
            placeholder={placeholder}
            setIsDialogOpen={disabled ? () => {} : setIsDialogOpen}
            type={type}
            value={value}
            disabled={disabled}
          />
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left">{name}</DialogTitle>
          {isMultiChoice ? (
            <DialogDescription className="text-left">
              {SELECT_DATA["multi-description"]}
            </DialogDescription>
          ) : (
            <DialogDescription className="text-left">
              {SELECT_DATA["single-description"]}
            </DialogDescription>
          )}

          {/* search */}
          <RenderSearch
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
        </DialogHeader>

        {/* layout */}
        <div className="overflow-auto max-h-[400px]">
          <RenderLayout
            type={type}
            filteredOptions={filteredOptions}
            handleToggle={handleToggle}
            tempValue={tempValue}
          />
        </div>

        {isMultiChoice && (
          <DialogFooter>
            <Button variant="default" onClick={handleOkClick}>
              {SELECT_DATA["save-btn"]}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SelectDialog;
