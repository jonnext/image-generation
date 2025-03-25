import { useState } from "react";
import {
  getRandomInfographicImage,
  getNewRandomInfographicImage,
} from "../utils/infographicImages";

// Define types
interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

// Default image dimensions
const DEFAULT_IMAGE_WIDTH = 1200;
const DEFAULT_IMAGE_HEIGHT = 675;

// Hook for managing image generation and state
const useImageGeneration = (announceCallback: (message: string) => void) => {
  // Image generation state
  const [isConverting, setIsConverting] = useState(false);
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  // Image data state
  const [currentImage, setCurrentImage] = useState<ImageData>(() => ({
    ...getRandomInfographicImage(),
    width: DEFAULT_IMAGE_WIDTH,
    height: DEFAULT_IMAGE_HEIGHT,
  }));
  const [generatedImages, setGeneratedImages] = useState<ImageData[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper function to create an image object with default dimensions
  const createImageData = (src: string, alt: string): ImageData => {
    return {
      src,
      alt,
      width: DEFAULT_IMAGE_WIDTH,
      height: DEFAULT_IMAGE_HEIGHT,
    };
  };

  // Generate a new image
  const generateImage = (callback?: () => void) => {
    setIsConverting(true);
    setIsSkeletonVisible(true);
    announceCallback("Generating a new image. Please wait...");

    // Simulate API call with delay
    setTimeout(() => {
      const newImage = getNewRandomInfographicImage(
        generatedImages.length > 0 ? generatedImages[currentImageIndex].src : ""
      );

      const imageWithDimensions = createImageData(newImage.src, newImage.alt);

      // Add to generated images if not already present
      if (generatedImages.length === 0) {
        setGeneratedImages([imageWithDimensions]);
      } else {
        // Add new image to array
        const updatedImages = [...generatedImages, imageWithDimensions];
        setGeneratedImages(updatedImages);

        // Set the new image as current
        const newIndex = updatedImages.length - 1;
        setCurrentImageIndex(newIndex);
      }

      setCurrentImage(imageWithDimensions);

      setTimeout(() => {
        setIsConverting(false);
        setIsSkeletonVisible(false);
        setHasImage(true);
        announceCallback("New image has been generated successfully.");
        if (callback) callback();
      }, 300); // Small delay to ensure smooth transition
    }, 2000);
  };

  // Navigate to next image
  const handleNextImage = () => {
    if (generatedImages.length > 1) {
      const nextIndex = (currentImageIndex + 1) % generatedImages.length;
      setCurrentImageIndex(nextIndex);
      setCurrentImage(generatedImages[nextIndex]);
      announceCallback(
        `Displaying image ${nextIndex + 1} of ${generatedImages.length}`
      );
    }
  };

  // Navigate to previous image
  const handlePrevImage = () => {
    if (generatedImages.length > 1) {
      const prevIndex =
        (currentImageIndex - 1 + generatedImages.length) %
        generatedImages.length;
      setCurrentImageIndex(prevIndex);
      setCurrentImage(generatedImages[prevIndex]);
      announceCallback(
        `Displaying image ${prevIndex + 1} of ${generatedImages.length}`
      );
    }
  };

  // Delete current image
  const handleDeleteImage = () => {
    if (generatedImages.length <= 1) {
      // If it's the only image, just hide the visual
      setHasImage(false);
      setGeneratedImages([]);
      announceCallback("Image has been removed");
      return false; // Return false to indicate visuals should be hidden
    }

    // Remove the current image and update indices
    const updatedImages = generatedImages.filter(
      (_, index) => index !== currentImageIndex
    );
    setGeneratedImages(updatedImages);

    // Adjust current index if needed
    const newIndex =
      currentImageIndex >= updatedImages.length
        ? updatedImages.length - 1
        : currentImageIndex;

    setCurrentImageIndex(newIndex);
    setCurrentImage(updatedImages[newIndex]);
    announceCallback("Image has been removed from the carousel");
    return true; // Return true to indicate visuals should remain shown
  };

  // Select a specific image
  const handleSelectImage = (imageSrc: string, imageName: string) => {
    const newImage = createImageData(imageSrc, imageName);
    setCurrentImage(newImage);
    announceCallback(`Selected image: ${imageName}`);
  };

  return {
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
  };
};

export default useImageGeneration;
export type { ImageData };
