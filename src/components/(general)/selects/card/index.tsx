"use client";

// import libs
import { useState } from "react";

// import components
import RenderLayout from "./render-layout";

// import data
import { PLACEHOLDER_DATA } from "@/data/placeholder";

const SelectCard: React.FC<{
  name: string;
  isMultiChoice: boolean;
  options: ({ value: string } | any)[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  type?: string;
  placeholder?: string;
}> = ({
  name,
  isMultiChoice,
  options,
  value,
  onChange,
  type = "default",
  placeholder = PLACEHOLDER_DATA["select-default"],
}) => {
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [tempValue, setTempValue] = useState(value);

  // console.log("filteredOptions", filteredOptions);
  // console.log("tempValuetempValue", tempValue);

  // Xử lý chọn/ bỏ chọn
  const handleToggle = (selectedValue: string | any) => {
    // console.log("selectedValueselectedValueselectedValue", selectedValue);

    if (type == "admin-categories") {
      setTempValue(selectedValue._id);
      onChange(selectedValue._id);
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
      } else {
        setTempValue(selectedValue.value);
        onChange(selectedValue.value);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <RenderLayout
        type={type}
        filteredOptions={filteredOptions}
        handleToggle={handleToggle}
        tempValue={tempValue}
      />
    </div>
  );
};

export default SelectCard;
