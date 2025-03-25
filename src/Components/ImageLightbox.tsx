import React, { useEffect, useRef } from "react";
import { XCircle } from "lucide-react";
import type { ImageData } from "../hooks/useImageGeneration";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage: ImageData;
  generatedImages: ImageData[];
  handleNextImage: () => void;
  handlePrevImage: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  currentImage,
  generatedImages,
  handleNextImage,
  handlePrevImage,
}) => {
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);

    // Prevent scrolling when lightbox is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleEscKey);
      // Restore scrolling when component unmounts
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Handle click on the backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === lightboxRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={lightboxRef}
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {/* Close button */}
        <button
          className="absolute top-6 right-6 text-white hover:text-gray-300 z-10 transition-colors"
          onClick={onClose}
          aria-label="Close full screen view"
        >
          <XCircle size={32} />
        </button>

        {/* The image with animation */}
        <div className="animate-lightbox-enter">
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>

        {/* Navigation buttons for lightbox when multiple images */}
        {generatedImages.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3"
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6"
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
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3"
              onClick={handleNextImage}
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6"
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
        )}
      </div>
    </div>
  );
};

export default ImageLightbox;
