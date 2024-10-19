import React from "react";
import RenderOption from "./render-option"; // Đảm bảo bạn đã xuất RenderOption

const RenderLayout: React.FC<{
  type: string;
  filteredOptions: any[];
  handleToggle: (selectedValue: any) => void;
  tempValue: string | string[];
}> = ({ type, filteredOptions, handleToggle, tempValue }) => {
  switch (type) {
    case "admin-categories":
      return (
        <div className="grid grid-cols-3 gap-2">
          {filteredOptions.map((option) => (
            <RenderOption
              type={type}
              key={option._id}
              option={option}
              isSelected={tempValue === option._id}
              handleToggle={handleToggle}
            />
          ))}
        </div>
      );

    default:
      return (
        <div className="flex flex-wrap gap-2">
          {filteredOptions.map((option) => (
            <RenderOption
              type={type}
              key={option.value}
              option={option}
              isSelected={
                Array.isArray(tempValue)
                  ? tempValue.includes(option.value)
                  : tempValue === option.value
              }
              handleToggle={handleToggle}
            />
          ))}
        </div>
      );
  }
};

export default RenderLayout;
