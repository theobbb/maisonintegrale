import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const LazyImage = ({ src, alt, ...others }) => {
  const [imageSrc, setImageSrc] = useState("");
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.unobserve(imgRef.current);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <Box
    component={motion.img}
    transition={{transition: 'ease', duration: 0.5}}
    initial={{opacity:0}}
    animate={{opacity: imageSrc && 1}}
    ref={imgRef}
    src={imageSrc}
    alt={alt}
        {...others}
        
      className={`lazy-image ${imageSrc ? "loaded" : ""}`}
    />
  );
};

export default LazyImage;
