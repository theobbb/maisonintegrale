import { Box } from '@mui/material'
import { motion, useScroll } from 'framer-motion'
import React, { useRef } from 'react'
import { useInView } from 'react-intersection-observer';
import Sapin from './sapin'

export default function ScrollSapin() {
    const { ref, inView } = useInView({threshold: 0.3});
    const { scrollYProgress } = useScroll();

  return (
    <Box 
    //ref={ref}
    
    /*
    initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ root: scrollRef }}*/
        
    sx={{width: '100vw', height: '100vh', position: 'absolute', top: '0', left: '0', pointerEvents:'none', zIndex: 100}}
          
    >
        <Box component={motion.div}
        initial={{ opacity: 1 }}
        //animate={{ scaleX: scrollYProgress }}
        //whileInView={{ scale: 1 }}
        //style={{ scaleX: scrollYProgress }}
        //style={{transform: `translateY(${scrollYProgress.current * 1000}px)`}}
    //animate={{ opacity: inView?0: 1 }}
        >

    
        <Sapin strokeWidth='0.1%' />
        </Box>
    </Box>
  )
}
