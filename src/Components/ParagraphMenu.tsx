import React, { useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";

interface ParagraphMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isBookmarked: boolean;
  handleBookmark: () => void;
  handleShowAsVisuals: () => void;
}

const ParagraphMenu: React.FC<ParagraphMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  isBookmarked,
  handleBookmark,
  handleShowAsVisuals,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const waffleRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useClickOutside([menuRef, waffleRef], () => {
    if (isMenuOpen) setIsMenuOpen(false);
  });

  const handleWaffleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        ref={waffleRef}
        className={`absolute left-2 top-6 w-6 h-6 flex items-center justify-center rounded transition-all duration-150 ${
          isMenuOpen ? "opacity-100 bg-gray-100" : "hover:bg-gray-50"
        }`}
        onClick={handleWaffleClick}
        aria-label={
          isMenuOpen ? "Close paragraph options" : "Open paragraph options"
        }
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="text-gray-500"
          aria-hidden="true"
        >
          <path d="M3 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-8 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-8 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
        </svg>
      </button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute left-2 top-12 bg-white shadow-lg rounded-md border border-gray-200 py-2 z-10 w-64"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="paragraph-options-button"
        >
          <button
            className="flex justify-between items-center px-4 py-3 text-sm hover:bg-gray-100 w-full text-left text-gray-800"
            onClick={handleBookmark}
            role="menuitem"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </span>
              <span>Bookmark</span>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
              ⌘B
            </div>
          </button>

          <button
            className="flex justify-between items-center px-4 py-3 text-sm hover:bg-gray-100 w-full text-left text-gray-800"
            onClick={handleShowAsVisuals}
            role="menuitem"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
              </span>
              <span>Show as visuals</span>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
              ⌘V
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default ParagraphMenu;
