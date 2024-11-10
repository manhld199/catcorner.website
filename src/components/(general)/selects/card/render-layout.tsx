import React from "react";
import RenderOption from "./render-option";

const RenderLayout: React.FC<{
  type: string;
  filteredOptions: any[];
  handleToggle: (selectedValue: any) => void;
  tempValue: string | string[];
}> = ({ type, filteredOptions, handleToggle, tempValue }) => {
  switch (type) {
    default:
      return (
        <div className="grid grid-cols-2 gap-2">
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
