import React, { useRef } from "react";
import { Repeat2, Download, X } from "lucide-react";
import Tooltip from "./Tooltip";
import type { ImageData } from "../hooks/useImageGeneration";
import useClickOutside from "../hooks/useClickOutside";

interface ImageDisplayProps {
  currentImage: ImageData;
  isSkeletonVisible: boolean;
  hasImage: boolean;
  generatedImages: ImageData[];
  currentImageIndex: number;
  showImageSelector: boolean;
  setShowImageSelector: (show: boolean) => void;
  handleNextImage: () => void;
  handlePrevImage: () => void;
  handleDeleteImage: () => void;
  handleRegenerateImage: () => void;
  handleDownloadImage: () => void;
  handleImageClick: () => void;
  onSelectImage: (src: string, alt: string) => void;
  carousel: React.ReactNode;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  currentImage,
  isSkeletonVisible,
  hasImage,
  generatedImages,
  currentImageIndex,
  showImageSelector,
  setShowImageSelector,
  handleNextImage,
  handlePrevImage,
  handleDeleteImage,
  handleRegenerateImage,
  handleDownloadImage,
  handleImageClick,
  onSelectImage,
  carousel,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Close image selector when clicking outside
  useClickOutside([carouselRef], () => {
    if (showImageSelector) {
      setShowImageSelector(false);
    }
  });

  const renderSkeletonLoader = () => (
    <div className="w-full h-[375px] bg-gray-200 relative overflow-hidden flex items-center justify-center rounded-lg">
      <svg
        className="w-16 h-16 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent opacity-40"></div>
    </div>
  );

  const renderImageControls = () => (
    <div className="absolute top-4 right-4 transition-opacity duration-200 flex items-center px-4 py-2 bg-opacity-80 bg-[#f8f5f1] rounded-lg space-x-4 w-[124px] h-[36px] opacity-0 group-hover:opacity-100 overflow-visible">
      <Tooltip text="Change image type">
        <button
          className="flex items-center justify-center w-5 h-5"
          onClick={handleRegenerateImage}
          aria-label="Change image type"
        >
          <Repeat2 size={16.67} className="text-[#887c7a] stroke-[1.4]" />
        </button>
      </Tooltip>
      <Tooltip text="Download image">
        <button
          className="flex items-center justify-center w-5 h-5"
          onClick={handleDownloadImage}
          aria-label="Download image"
        >
          <Download size={15} className="text-[#887c7a] stroke-[1.4]" />
        </button>
      </Tooltip>
      <Tooltip text="Remove image">
        <button
          className="flex items-center justify-center w-5 h-5"
          onClick={handleDeleteImage}
          aria-label="Remove image"
        >
          <X size={10} className="text-[#887c7a] stroke-[1.4]" />
        </button>
      </Tooltip>
    </div>
  );

  const renderCarouselNavigation = () =>
    generatedImages.length > 1 && (
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 bg-black bg-opacity-30">
        <div className="flex space-x-1">
          {generatedImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex
                  ? "bg-white"
                  : "bg-white bg-opacity-50"
              }`}
              onClick={() => {
                // This function would need to be passed down from parent
                onSelectImage(
                  generatedImages[index].src,
                  generatedImages[index].alt
                );
              }}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );

  const renderCarouselControls = () =>
    generatedImages.length > 1 && (
      <>
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-r p-1"
          onClick={handlePrevImage}
          aria-label="Previous image"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-l p-1"
          onClick={handleNextImage}
          aria-label="Next image"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </>
    );

  return (
    <div className="mt-4 mb-8 relative overflow-visible">
      <div className="rounded-lg overflow-visible border border-gray-200 shadow-sm">
        <div className="relative group overflow-visible">
          {/* Skeleton loader */}
          {isSkeletonVisible && renderSkeletonLoader()}

          {/* Actual image - hidden during skeleton loading state */}
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className={`w-full h-auto max-h-[400px] object-contain bg-white transition-opacity duration-300 ease-in-out cursor-pointer ${
              isSkeletonVisible ? "opacity-0 absolute" : "opacity-100"
            }`}
            onClick={handleImageClick}
          />

          {/* Image selector carousel overlay */}
          {showImageSelector && !isSkeletonVisible && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end justify-center pb-10 p-4 z-10">
              <div ref={carouselRef} className="w-full max-w-[584px] relative">
                {carousel}
              </div>
            </div>
          )}

          {/* Image Menu - Only visible when hovering and not in skeleton state */}
          {hasImage && !isSkeletonVisible && renderImageControls()}

          {/* Carousel navigation and controls */}
          {!isSkeletonVisible && renderCarouselNavigation()}
          {!isSkeletonVisible && renderCarouselControls()}
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
