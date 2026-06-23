import { useState, useEffect, useRef } from "react";

export const useScrolling = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const controlHeader = () => {
      if (window.scrollY > lastScrollY.current && window.scrollY > 70) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = window.scrollY;
    }

    window.addEventListener("scroll", controlHeader);

    return () => window.removeEventListener("scroll", controlHeader);
  }, []);

  return { visible }
}