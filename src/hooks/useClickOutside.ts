import { useEffect, RefObject } from "react";

/**
 * Hook that alerts when you click outside of the passed refs
 * @param refs - Array of refs to track
 * @param handler - Function to call when click is outside all refs
 */
const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  handler: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is outside all provided refs
      const isOutside = refs.every(
        (ref) => !ref.current || !ref.current.contains(event.target as Node)
      );

      if (isOutside) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, handler]);
};

export default useClickOutside;
