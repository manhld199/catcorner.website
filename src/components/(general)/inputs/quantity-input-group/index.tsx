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

  // Theo dõi sự thay đổi của initValue.defaultValue
  useEffect(() => {
    setInputValue(initValue?.defaultValue ?? 1);
  }, [initValue?.defaultValue]);

  const [error, setError] = useState<string | null>(null); // Trạng thái cho thông báo lỗi

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
        setError(null); // Nếu hợp lệ, xóa thông báo lỗi

        if (takeQuantity) takeQuantity(newValue);
      } else {
        // Nếu không hợp lệ, hiển thị thông báo lỗi
        setError(
          `Số lượng phải nằm trong khoảng ${initValue.minValue} - ${initValue.maxValue}`
        );
      }
    }
  };

  const decreaseValue = () => {
    if (inputValue > (initValue?.minValue ?? 1)) {
      setInputValue(inputValue - 1);
      setError(null); // Xóa lỗi khi giá trị hợp lệ

      if (takeQuantity) takeQuantity(inputValue - 1);
    }
  };

  const increaseValue = () => {
    if (inputValue < (initValue?.maxValue ?? 100)) {
      setInputValue(inputValue + 1);
      setError(null); // Xóa lỗi khi giá trị hợp lệ

      if (takeQuantity) takeQuantity(inputValue + 1);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    inputRef.current?.select();
  };

  return (
    <div>
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
          disabled={inputValue === initValue.minValue}>
          <Minus className="w-4 h-4" />
        </button>

        {/* Input số lượng */}
        <input
          ref={inputRef}
          className="w-12 h-8 text-sm text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 no-arrows"
          type="number"
          onChange={handleValueChange}
          onClick={handleClick}
          min={initValue?.minValue ?? 1}
          max={initValue?.maxValue ?? 100}
          value={inputValue}
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
          disabled={inputValue === initValue.maxValue}>
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
