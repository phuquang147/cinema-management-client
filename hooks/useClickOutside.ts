import { RefObject, useEffect } from "react";

export default function useClickOutside(
  ref: RefObject<HTMLDivElement>,
  action: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref && ref.current && !ref.current.contains(event.target as Node)) {
        action();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, action]);
}
