import React from "react";
import { Image } from "lucide-react";

interface GenerateImageButtonProps {
  isConverting: boolean;
  onClick: () => void;
}

const GenerateImageButton: React.FC<GenerateImageButtonProps> = ({
  isConverting,
  onClick,
}) => (
  <button
    className="flex items-center gap-1 w-fit px-3 py-2 bg-white border border-[#d0ccc9] rounded-lg shadow-[0_1px_2px_rgba(27,25,24,0.05),0_-2px_0_rgba(27,25,24,0.05)_inset,0_0_1px_rgba(27,25,24,0.18)_inset]"
    onClick={onClick}
    disabled={isConverting}
    aria-label="Generate image from text"
  >
    {isConverting ? (
      <>
        <svg
          className="animate-spin w-5 h-5 stroke-[#171412]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span className="text-sm text-[#171412] font-['FK_Grotesk_Neue']">
          Generating...
        </span>
      </>
    ) : (
      <>
        <Image className="w-5 h-5 stroke-[#171412]" />
        <span className="text-sm text-[#171412] font-['FK_Grotesk_Neue']">
          Generate image
        </span>
      </>
    )}
  </button>
);

export default GenerateImageButton;
