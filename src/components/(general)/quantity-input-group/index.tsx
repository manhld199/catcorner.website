"use client";

import { useState, useRef, useEffect } from "react";
import { Minus, Plus } from "lucide-react";

interface IQuantityInputGroup {
  defaultValue: number;
  minValue: number;
  maxValue: number;
}

export default function CustomerQuantityInputGroup({
  initValue,
  takeQuantity,
}: {
  initValue: IQuantityInputGroup;
  takeQuantity?: (quantity: number) => void;
}) {
  const [inputValue, setInputValue] = useState<number>(
    initValue?.defaultValue ?? 1
  );

  // Hàm xử lý thay đổi giá trị trong ô input
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newValue = Number(value);

    // Kiểm tra nếu giá trị là số hợp lệ và nằm trong khoảng
    if (!isNaN(newValue)) {
      if (
        newValue >= (initValue?.minValue ?? 1) &&
        newValue <= (initValue?.maxValue ?? 100)
      ) {
        setInputValue(newValue);
      }
    }
  };

  useEffect(() => {
    if (takeQuantity) {
      takeQuantity(inputValue);
    }
  }, [inputValue, takeQuantity]);

  const decreaseValue = () => {
    if (inputValue > (initValue?.minValue ?? 1)) {
      setInputValue(inputValue - 1);
    }
  };

  const increaseValue = () => {
    if (inputValue < (initValue?.maxValue ?? 100)) {
      setInputValue(inputValue + 1);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.select();
  };

  return (
    <div className="flex items-center space-x-1">
      {/* Button giảm số lượng */}
      <button
        className={`flex items-center justify-center w-8 h-8 border rounded ${
          inputValue === initValue.minValue
            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200 text-gray-600"
        }`}
        onClick={decreaseValue}
        type="button"
        disabled={inputValue === initValue.minValue}
      >
        <Minus className="w-4 h-4" />
      </button>

      {/* Input số lượng */}
      <input
        ref={inputRef}
        className="w-12 h-8 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 no-arrows"
        type="number"
        onChange={handleValueChange}
        onClick={handleClick}
        min={initValue?.minValue ?? 1}
        max={initValue?.maxValue ?? 100}
        value={inputValue}
        onInput={handleValueChange}
      />

      {/* Button tăng số lượng */}
      <button
        className={`flex items-center justify-center w-8 h-8 border rounded ${
          inputValue === initValue.maxValue
            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200 text-gray-600"
        }`}
        onClick={increaseValue}
        type="button"
        disabled={inputValue === initValue.maxValue}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
