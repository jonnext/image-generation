import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import all infographic images from our asset library
import steps1 from "../assets/images/infographics/steps-1.png";
import steps2 from "../assets/images/infographics/steps-2.png";
import steps3 from "../assets/images/infographics/steps-3.png";
import steps4 from "../assets/images/infographics/steps-4.png";
import theRockGif from "../assets/images/infographics/the-rock-eyebrow-gif.gif";
// Import new images
import venn1 from "../assets/images/infographics/venn-1.png";
import venn2 from "../assets/images/infographics/venn-2.png";
import venn3 from "../assets/images/infographics/venn-3.png";
import mindmap1 from "../assets/images/infographics/mindmap-1.png";
import mindmap2 from "../assets/images/infographics/mindmap-2.png";
import mindmap3 from "../assets/images/infographics/mindmap-3.png";
import mindmap4 from "../assets/images/infographics/mindmap-4.png";
import mindmap5 from "../assets/images/infographics/mindmap-5.png";

interface ImageInfo {
  src: string;
  name: string;
}

interface ImageSelectorCarouselProps {
  onSelectImage?: (image: string, name: string) => void;
}

// Image collections organized by category
const imagesByCategory: Record<string, ImageInfo[]> = {
  steps: [
    { src: steps1, name: "Steps 1" },
    { src: steps2, name: "Steps 2" },
    { src: steps3, name: "Steps 3" },
    { src: steps4, name: "Steps 4" },
  ],
  venn: [
    { src: venn1, name: "Venn Diagram 1" },
    { src: venn2, name: "Venn Diagram 2" },
    { src: venn3, name: "Venn Diagram 3" },
  ],
  mindmap: [
    { src: mindmap1, name: "Mind Map 1" },
    { src: mindmap2, name: "Mind Map 2" },
    { src: mindmap3, name: "Mind Map 3" },
    { src: mindmap4, name: "Mind Map 4" },
    { src: mindmap5, name: "Mind Map 5" },
  ],
  special: [{ src: theRockGif, name: "The Rock" }],
};

// Constants - updated to show 3 images per page in a grid
const IMAGES_PER_PAGE = 3;

const ImageSelectorCarousel: React.FC<ImageSelectorCarouselProps> = ({
  onSelectImage = () => {},
}) => {
  // Flatten all categories into a single array
  const allImages: ImageInfo[] = Object.values(imagesByCategory).flat();

  // Calculate total number of pages
  const totalPages = Math.ceil(allImages.length / IMAGES_PER_PAGE);

  // Track the current page
  const [currentPage, setCurrentPage] = useState(0);

  // Get the images for the current page
  const getCurrentPageImages = (): ImageInfo[] => {
    const startIndex = currentPage * IMAGES_PER_PAGE;
    const endIndex = Math.min(startIndex + IMAGES_PER_PAGE, allImages.length);
    return allImages.slice(startIndex, endIndex);
  };

  // Navigation handlers
  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const handleImageSelect = (image: ImageInfo) => {
    onSelectImage(image.src, image.name);
  };

  // Get current page images
  const currentPageImages = getCurrentPageImages();

  // UI Components
  const renderNavigationButton = (direction: "prev" | "next") => {
    const isPrev = direction === "prev";
    return (
      <button
        onClick={isPrev ? handlePrev : handleNext}
        className={`absolute ${
          isPrev ? "left-0" : "right-0"
        } top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white hover:bg-[#f5f5f5] transition-colors flex items-center justify-center flex-shrink-0 shadow-sm`}
        aria-label={
          isPrev ? "Previous group of images" : "Next group of images"
        }
      >
        {isPrev ? (
          <ChevronLeft size={18} className="text-[#6e6e6e]" />
        ) : (
          <ChevronRight size={18} className="text-[#6e6e6e]" />
        )}
      </button>
    );
  };

  const renderImageThumbnail = (image: ImageInfo, idx: number) => (
    <div key={`image-${currentPage}-${idx}`} className="w-full h-full">
      <div
        className="w-full h-full bg-white rounded-lg relative overflow-hidden cursor-pointer
          transition-all duration-300 ease-in-out transform hover:scale-[1.02] border border-[#e5e3e2] group"
        onClick={() => handleImageSelect(image)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleImageSelect(image);
            e.preventDefault();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Select ${image.name}`}
      >
        <img
          src={image.src}
          alt={`${image.name} preview`}
          className="w-full h-full object-contain rounded-lg transition-opacity duration-300 ease-in-out"
          loading="lazy"
        />
        {/* Modern label with subtle black gradient */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent px-2 py-1.5 transition-opacity duration-300 ease-in-out">
          <p className="text-xs text-gray-800 font-medium truncate text-center">
            {image.name}
          </p>
        </div>
      </div>
    </div>
  );

  const renderPageIndicator = () => (
    <div className="flex justify-center items-center mt-4">
      <div className="h-[20px] px-2 py-1.5 bg-[#faf9f8] rounded-full flex items-center space-x-2.5">
        {Array.from({ length: totalPages }).map((_, pageIdx) => (
          <button
            key={`page-${pageIdx}`}
            className="focus:outline-none transition-all duration-300 ease-in-out"
            onClick={() => setCurrentPage(pageIdx)}
            aria-label={`Go to page ${pageIdx + 1}`}
            aria-current={currentPage === pageIdx ? "true" : "false"}
          >
            <div
              className={`h-1.5 rounded-full w-[10px] transition-colors duration-300 ease-in-out ${
                currentPage === pageIdx ? "bg-[#403b39]" : "bg-[#d0cdc9]"
              }`}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col p-4 w-full max-w-[660px] mx-auto bg-white border border-[#e0e0e0] rounded-lg shadow-lg">
      <div className="relative w-full mb-1">
        <div className="flex items-center">
          {renderNavigationButton("prev")}

          <div className="grid grid-cols-3 gap-4 w-full mx-4">
            {currentPageImages.map((image, idx) => (
              <div
                key={`image-container-${idx}`}
                className="aspect-[4/3] w-full"
              >
                {renderImageThumbnail(image, idx)}
              </div>
            ))}

            {/* Add placeholder divs if we don't have enough images to fill the page */}
            {currentPageImages.length < IMAGES_PER_PAGE &&
              Array.from({
                length: IMAGES_PER_PAGE - currentPageImages.length,
              }).map((_, idx) => (
                <div key={`placeholder-${idx}`} className="aspect-[4/3] w-full">
                  <div className="h-full bg-white rounded-lg relative opacity-20 border border-[#e5e3e2]" />
                </div>
              ))}
          </div>

          {renderNavigationButton("next")}
        </div>
      </div>

      {renderPageIndicator()}
    </div>
  );
};

export default ImageSelectorCarousel;
