import { useState, useEffect } from "react";

export default function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState({scrollTop: 0, progress: 0});

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight =
        "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop =
        "pageYOffset" in window ? window.pageYOffset : document.documentElement.scrollTop;
      const trackLength = docHeight - windowHeight;
      const progress = scrollTop / trackLength;
      setScrollProgress({scrollTop, progress});
    };

    calculateScrollProgress();
    window.addEventListener("scroll", calculateScrollProgress);

    return () => window.removeEventListener("scroll", calculateScrollProgress);
  }, []);

  return scrollProgress;
}