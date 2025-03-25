import React, { useState, useRef } from "react";
import ImageSelectorCarousel from "./ImageSelectorCarousel";
import ParagraphMenu from "./ParagraphMenu";
import ImageDisplay from "./ImageDisplay";
import ImageLightbox from "./ImageLightbox";
import GenerateImageButton from "./GenerateImageButton";
import useAccessibilityAnnouncer from "../hooks/useAccessibilityAnnouncer";
import useImageGeneration from "../hooks/useImageGeneration";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

const ParagraphToImageConversion: React.FC<ParagraphProps> = ({
  children,
  className = "",
}) => {
  // UI state
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showAsVisuals, setShowAsVisuals] = useState(false);

  // Accessibility
  const [announcement, announce] = useAccessibilityAnnouncer();

  // Refs
  const paragraphRef = useRef<HTMLDivElement>(null);

  // Image generation state and handlers
  const {
    isConverting,
    isSkeletonVisible,
    hasImage,
    currentImage,
    generatedImages,
    currentImageIndex,
    setHasImage,
    generateImage,
    handleNextImage,
    handlePrevImage,
    handleDeleteImage,
    handleSelectImage,
  } = useImageGeneration(announce);

  // Bookmark toggle handler
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setIsMenuOpen(false);
    announce(isBookmarked ? "Bookmark removed" : "Bookmark added");
  };

  // Main convert to image handler
  const handleConvertToImage = () => {
    setIsMenuOpen(false);
    setShowAsVisuals(true);

    if (!hasImage) {
      generateImage();
    }
  };

  // Toggle visual mode handler
  const handleShowAsVisuals = () => {
    setIsMenuOpen(false);

    if (!showAsVisuals) {
      // Only start conversion if we're turning visual mode on and don't already have an image
      if (!hasImage) {
        generateImage();
      }
      setShowAsVisuals(true);
      announce("Content displayed as visuals");
    } else {
      // Turning visual mode off
      setShowAsVisuals(false);
      announce("Visual display mode disabled");
    }
  };

  // Handle image selection
  const onSelectImage = (imageSrc: string, imageName: string) => {
    handleSelectImage(imageSrc, imageName);
    setShowImageSelector(false);
  };

  // Image regenerate handler
  const handleRegenerateImage = () => {
    setShowImageSelector(!showImageSelector);
    announce(
      showImageSelector ? "Image selector closed" : "Image selector opened"
    );
  };

  // Download handler
  const handleDownloadImage = () => {
    announce("Image download requested");
    // Will implement later - placeholder for future functionality
  };

  // Lightbox handlers
  const handleImageClick = () => {
    if (!isSkeletonVisible && hasImage) {
      setIsLightboxOpen(true);
      announce("Image opened in full screen mode");
      // Prevent scrolling on body when lightbox is open - now handled by the ImageLightbox component
    }
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    announce("Full screen image view closed");
  };

  // Delete image with visual mode handling
  const handleDeleteWithVisualToggle = () => {
    const keepVisualsShown = handleDeleteImage();
    if (!keepVisualsShown) {
      setShowAsVisuals(false);
    }
  };

  return (
    <div
      className={`w-full max-w-[688px] bg-[#FAF9F8] rounded-lg overflow-hidden mr-4 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Accessibility announcement */}
      {announcement && (
        <div className="sr-only" role="status" aria-live="polite">
          {announcement}
        </div>
      )}

      {/* Menu component */}
      <ParagraphMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isBookmarked={isBookmarked}
        handleBookmark={handleBookmark}
        handleShowAsVisuals={handleShowAsVisuals}
      />

      <div className="py-6 px-8">
        <div className="flex flex-col gap-6" ref={paragraphRef}>
          <div className="text-lg text-[#403b39] font-['FK_Grotesk_Neue']">
            {children}
          </div>

          <div className="flex">
            <GenerateImageButton
              isConverting={isConverting}
              onClick={handleConvertToImage}
            />
          </div>
        </div>
      </div>

      {/* Image display section */}
      {showAsVisuals && (
        <ImageDisplay
          currentImage={currentImage}
          isSkeletonVisible={isSkeletonVisible}
          hasImage={hasImage}
          generatedImages={generatedImages}
          currentImageIndex={currentImageIndex}
          showImageSelector={showImageSelector}
          setShowImageSelector={setShowImageSelector}
          handleNextImage={handleNextImage}
          handlePrevImage={handlePrevImage}
          handleDeleteImage={handleDeleteWithVisualToggle}
          handleRegenerateImage={handleRegenerateImage}
          handleDownloadImage={handleDownloadImage}
          handleImageClick={handleImageClick}
          onSelectImage={onSelectImage}
          carousel={<ImageSelectorCarousel onSelectImage={onSelectImage} />}
        />
      )}

      {/* Lightbox - Full screen image view */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        currentImage={currentImage}
        generatedImages={generatedImages}
        handleNextImage={handleNextImage}
        handlePrevImage={handlePrevImage}
      />

      {/* Bookmark indicator */}
      {isBookmarked && (
        <div className="mt-2 flex items-center text-sm text-blue-600">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
            className="mr-1"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Bookmarked</span>
        </div>
      )}
    </div>
  );
};

export default ParagraphToImageConversion;
