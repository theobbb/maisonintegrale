import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const LazyImage = ({ src, alt, ...others }) => {
  const [loaded, setLoaded] = useState(false);

  const [imageSrc, setImageSrc] = useState("");
  const imgRef = useRef(null);

  
/*
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
  }, [src]);*/

  return (
    <Box
    onLoad={() => setLoaded(true)}
    component={motion.img}
    transition={{transition: 'ease', duration: 0.5}}
    initial={{opacity:0}}
    animate={{opacity: loaded && 1}}
    //ref={imgRef}
    src={src}
    alt={alt}
        {...others}

    />
  );
};

export default LazyImage;
