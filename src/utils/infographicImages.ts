// Import all infographic images
import brainstorm1 from "../assets/images/infographics/brainstorm-1.png";
import brainstorm2 from "../assets/images/infographics/brainstorm-2.png";
import brainstorm3 from "../assets/images/infographics/brainstorm-3.png";
import brainstorm4 from "../assets/images/infographics/brainstorm-4.png";
import steps1 from "../assets/images/infographics/steps-1.png";
import steps2 from "../assets/images/infographics/steps-2.png";
import steps3 from "../assets/images/infographics/steps-3.png";
import steps4 from "../assets/images/infographics/steps-4.png";
import rockEyebrow from "../assets/images/infographics/the-rock-eyebrow-gif.gif";
// Import new images
import venn1 from "../assets/images/infographics/venn-1.png";
import venn2 from "../assets/images/infographics/venn-2.png";
import venn3 from "../assets/images/infographics/venn-3.png";
import mindmap1 from "../assets/images/infographics/mindmap-1.png";
import mindmap2 from "../assets/images/infographics/mindmap-2.png";
import mindmap3 from "../assets/images/infographics/mindmap-3.png";
import mindmap4 from "../assets/images/infographics/mindmap-4.png";
import mindmap5 from "../assets/images/infographics/mindmap-5.png";

// Create an array with all infographic images
export const infographicImages = [
  { src: brainstorm1, alt: "Brainstorm infographic showing key concepts" },
  { src: brainstorm2, alt: "Brainstorm infographic with connected ideas" },
  { src: brainstorm3, alt: "Brainstorm visualization with multiple branches" },
  { src: brainstorm4, alt: "Concept map showing related ideas" },
  { src: steps1, alt: "Step-by-step process visualization - part 1" },
  { src: steps2, alt: "Step-by-step process visualization - part 2" },
  { src: steps3, alt: "Step-by-step process visualization - part 3" },
  { src: steps4, alt: "Step-by-step process visualization - part 4" },
  { src: rockEyebrow, alt: "The Rock raising eyebrow reaction GIF" },
  // Add new images
  { src: venn1, alt: "Venn diagram visualization - type 1" },
  { src: venn2, alt: "Venn diagram visualization - type 2" },
  { src: venn3, alt: "Venn diagram visualization - type 3" },
  { src: mindmap1, alt: "Mind map visualization - type 1" },
  { src: mindmap2, alt: "Mind map visualization - type 2" },
  { src: mindmap3, alt: "Mind map visualization - type 3" },
  { src: mindmap4, alt: "Mind map visualization - type 4" },
  { src: mindmap5, alt: "Mind map visualization - type 5" },
];

/**
 * Gets a random infographic image from the collection
 * @returns An object containing the image source and alt text
 */
export const getRandomInfographicImage = () => {
  const randomIndex = Math.floor(Math.random() * infographicImages.length);
  return infographicImages[randomIndex];
};

/**
 * Gets a random infographic image but ensures it's different from the currently displayed image
 * @param currentSrc The source of the currently displayed image
 * @returns An object containing the image source and alt text
 */
export const getNewRandomInfographicImage = (currentSrc: string) => {
  // Filter out the current image
  const availableImages = infographicImages.filter(
    (img) => img.src !== currentSrc
  );

  // If there's only one image or no current image, just get a random one
  if (availableImages.length === 0 || !currentSrc) {
    return getRandomInfographicImage();
  }

  // Get a random image from the filtered list
  const randomIndex = Math.floor(Math.random() * availableImages.length);
  return availableImages[randomIndex];
};
