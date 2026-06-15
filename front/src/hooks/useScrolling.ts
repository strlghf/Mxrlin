import { useState, useEffect } from "react";

export const useScrolling = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 70) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(window.scrollY);
    }

    window.addEventListener("scroll", controlHeader);

    return () => window.removeEventListener("scroll", controlHeader);
  })

  return { visible }
}