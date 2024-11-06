import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Modal from "react-modal";

interface SliderImgProps {
  SliderImgs: string[];
}

export default function CustomerProductSlider({ SliderImgs }: SliderImgProps) {
  const [currentIndex, setCurrentIndex] = useState(0); // Cho slider chính
  const [modalIndex, setModalIndex] = useState(0); // Cho modal
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

  // Điều hướng cho slider chính
  const handleThumbnailClick = (index: number) => {
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

  // Mở modal và đặt ảnh đầu tiên trong modal là ảnh đầu tiên của slider
  const handleMainImageClick = () => {
    setModalIndex(currentIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Điều hướng cho modal
  const handleModalScrollLeft = () => {
    const newIndex = modalIndex > 0 ? modalIndex - 1 : SliderImgs.length - 1;
    setModalIndex(newIndex);
  };

  const handleModalScrollRight = () => {
    const newIndex = modalIndex < SliderImgs.length - 1 ? modalIndex + 1 : 0;
    setModalIndex(newIndex);
  };

  return (
    <section className="relative">
      {/* Slider chính */}
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
          onClick={(e) => {
            e.stopPropagation();
            handleScrollLeft();
          }}>
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        {/* Nút điều hướng phải */}
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-300/70 p-2 shadow-md rounded-full hover:bg-slate-300 dark:hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            handleScrollRight();
          }}>
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
        {/* Chỉ số ảnh hiện tại */}
        <div className="absolute bottom-4 right-4 bg-gray-800 text-white px-2 py-1 rounded-md">
          {currentIndex + 1}/{SliderImgs.length}
        </div>
      </div>

      {/* Ảnh thu nhỏ */}
      <div className="flex mt-4 space-x-2 items-center justify-center">
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
              className="relative w-20 h-20 cursor-pointer"
              onClick={handleMainImageClick}>
              <CldImage
                src={SliderImgs[4]}
                alt="picture"
                fill
                className="object-cover rounded"
              />
              {/* Overlay mờ đen */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold rounded">
                +{SliderImgs.length - 4}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal độc lập */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        shouldCloseOnOverlayClick={true}
        contentLabel="Product Images"
        className="relative w-full max-w-4xl h-auto bg-white rounded-lg shadow-lg overflow-hidden outline-none py-12"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-600 bg-white rounded-full p-2 hover:cursor-pointer z-50 hover:text-teal-600">
          <X />
        </button>
        {/* Slider chính */}
        <div
          className="relative w-full h-[460px] overflow-hidden dark:bg-white"
          onClick={handleMainImageClick}>
          <div className="absolute inset-0 mb-8">
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
            onClick={(e) => {
              e.stopPropagation();
              handleScrollLeft();
            }}>
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          {/* Nút điều hướng phải */}
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-slate-300/70 p-2 shadow-md rounded-full hover:bg-slate-300 dark:hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              handleScrollRight();
            }}>
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
          {/* Chỉ số ảnh hiện tại */}
          <div className="absolute bottom-4 right-4 bg-gray-800 text-white px-2 py-1 rounded-md">
            {currentIndex + 1}/{SliderImgs.length}
          </div>
        </div>

        {/* Ảnh thu nhỏ */}
        <div className="grid grid-cols-6 gap-2 mt-4 px-10">
          {SliderImgs.map((img, index) => (
            <div
              key={index}
              className={`w-20 h-20 relative cursor-pointer dark:bg-white ${getClassNames(
                index
              )}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleThumbnailClick(index)}>
              <CldImage
                src={img}
                alt="picture"
                fill
                className="object-cover rounded"
              />
            </div>
          ))}
        </div>
      </Modal>
    </section>
  );
}
