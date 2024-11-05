"use client";

import { useState } from "react";

export default function CustomerProductInformation() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-4 dark:text-gray-200">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        Pate Mèo Trưởng Thành Royal Canin Instinctive 85g
      </h2>
      <p className="mb-4 dark:text-gray-400">
        Pate cho mèo trưởng thành Royal Canin Instinctive là sản phẩm được thiết
        kế dành riêng cho mèo trên 12 tháng tuổi...
      </p>

      {isExpanded && (
        <>
          <ul className="list-disc pl-5 mb-4">
            <li>Thương hiệu: Royal Canin</li>
            <li>Phù hợp cho: Mèo trưởng thành</li>
            <li>Thành phần: Thịt, cá, protein thực vật</li>
            <li>Phụ gia: Vitamin, khoáng chất, chất xơ</li>
          </ul>

          <h3 className="text-lg font-bold mb-2 dark:text-gray-200">
            Lợi ích:
          </h3>
          <ul className="list-disc pl-5 mb-4">
            <li>Hỗ trợ sức khỏe tiêu hóa</li>
            <li>Giúp duy trì cân nặng hợp lý</li>
          </ul>
        </>
      )}

      <div className="flex justify-center mt-4">
        <button
          className="text-teal-500 dark:text-teal-400 flex items-center"
          onClick={toggleExpand}>
          {isExpanded ? (
            <>
              <span>Thu gọn</span>
              <span className="ml-1">▲</span>
            </>
          ) : (
            <>
              <span>Xem thêm</span>
              <span className="ml-1">▼</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
