import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Modal from "react-modal";

interface SliderImgProps {
  SliderImgs: string[];
}

export default function CustomerProductSlider({ SliderImgs }: SliderImgProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const thumbnailsContainer = useRef<HTMLDivElement>(null);

  const getClassNames = (index: number) => {
    if (index === currentIndex) {
      return "border border-neutral-300";
    } else if (index === hoveredIndex) {
      return "opacity-100";
    } else {
      return "opacity-50 hover:opacity-100";
    }
  };

  const handleThumbnailClick = (index: number) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
  };

  const handleScrollLeft = () => {
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : SliderImgs.length - 1;
    setCurrentIndex(newIndex);
  };

  const handleScrollRight = () => {
    const newIndex =
      currentIndex < SliderImgs.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
  };

  const handleMainImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="relative">
      {/* Ảnh chính */}
      <div
        className="relative w-full h-[440px] overflow-hidden dark:bg-white cursor-pointer"
        onClick={handleMainImageClick}>
        <div className="absolute inset-0 border border-neutral-300">
          <CldImage
            src={SliderImgs[currentIndex]}
            alt="picture"
            fill
            className="object-contain"
          />
        </div>
        {/* Nút điều hướng trái */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-300/70 p-2 shadow-md rounded-full hover:bg-slate-300 dark:hover:bg-white"
          onClick={handleScrollLeft}>
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        {/* Nút điều hướng phải */}
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-300/70 p-2 shadow-md rounded-full hover:bg-slate-300 dark:hover:bg-white"
          onClick={handleScrollRight}>
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
        {/* Chỉ số ảnh hiện tại */}
        <div className="absolute bottom-4 right-4 bg-gray-800 text-white px-2 py-1 rounded-md">
          {currentIndex + 1}/{SliderImgs.length}
        </div>
      </div>

      {/* Ảnh thu nhỏ */}
      <div className="flex mt-4 space-x-2 items-center">
        {/* <button onClick={handleScrollLeft} className="p-2">
          <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
        </button> */}

        <div
          className="flex overflow-x-auto space-x-4"
          ref={thumbnailsContainer}>
          {SliderImgs.slice(0, 4).map((img, index) => (
            <div
              key={index}
              className={`w-20 h-20 relative cursor-pointer dark:bg-white ${getClassNames(
                index
              )}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleThumbnailClick(index)}>
              <CldImage src={img} alt="picture" fill className="object-cover" />
            </div>
          ))}
          {SliderImgs.length > 5 && (
            <div
              className="w-20 h-20 flex items-center justify-center cursor-pointer bg-gray-200 text-gray-600 rounded"
              onClick={handleMainImageClick}>
              +{SliderImgs.length - 4}
            </div>
          )}
        </div>

        {/* <button onClick={handleScrollRight} className="p-2">
          <ChevronRight className="w-6 h-6 text-gray-700 dark:text-white" />
        </button> */}
      </div>

      {/* Popup với tất cả ảnh */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true} // Đóng modal khi bấm vào overlay
        contentLabel="Product Images"
        className="relative w-full max-w-4xl h-[600px] bg-white rounded-lg shadow-lg overflow-hidden outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-600 bg-white rounded-full p-2">
          Đóng
        </button>
        <div className="relative w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="absolute inset-0 border border-neutral-300">
            <CldImage
              src={SliderImgs[currentIndex]}
              alt="picture"
              fill
              className="object-contain"
            />
          </div>
          {/* Nút điều hướng trái */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full hover:bg-gray-200"
            onClick={handleScrollLeft}>
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          {/* Nút điều hướng phải */}
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow-md rounded-full hover:bg-gray-200"
            onClick={handleScrollRight}>
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Ảnh thu nhỏ trong popup */}
        <div className="flex mt-4 space-x-2 justify-center w-full">
          {SliderImgs.map((img, index) => (
            <div
              key={index}
              className={`w-20 h-20 relative cursor-pointer ${getClassNames(
                index
              )}`}
              onClick={() => handleThumbnailClick(index)}>
              <CldImage src={img} alt="picture" fill className="object-cover" />
            </div>
          ))}
        </div>
      </Modal>
    </section>
  );
}
