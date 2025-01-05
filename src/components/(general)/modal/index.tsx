"use client";

interface ModalProps {
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ title, message, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null; // Không hiển thị modal nếu không mở

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg text-center">
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m-7 4h6m-9 4h12m-9-2v2m3-2v2m3-2v2"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          OK
        </button>
      </div>
    </div>
  );
}
