"use client";

import { useState } from "react";

interface ProductInformationProps {
  description: string;
}

export default function CustomerProductInformation({
  description,
}: ProductInformationProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-4 dark:text-gray-200">
      <div
        className="mb-4 dark:text-gray-400"
        dangerouslySetInnerHTML={{
          __html: isExpanded
            ? description
            : `${description.substring(0, 700)}...`,
        }}></div>

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
