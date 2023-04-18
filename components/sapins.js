import { Box } from '@mui/material'
import { motion, useScroll, useSpring } from 'framer-motion'
import React from 'react'
import Sapin from './sapin'

const transition = { ease: [0.43, 0.13, 0.23, 0.96] };

export default function Sapins({sapins, direction, pageReady}) {

  if (!sapins || sapins.length == -1) return null;

  const { scrollYProgress } = useScroll({offset: ["start end", "end end"]});

  const scale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const minDuration = 1
  const maxDuration = 1.5

  //(maxDuration - minDuration) * sapin.height /100 + minDuration
  return (
    <>
    <Box sx={{position: 'fixed', width: '100%', height: '100%', overflow: 'hidden', zIndex: 10, pointerEvents: 'none'}}>
        {sapins.map((sapin, index) => (
            <Box 
            key={`sapin-${index}`}
            initial={{x: `${direction*120}vw`}}
            animate={{x: 0, y: pageReady? 0: '100vh', opacity: pageReady? 1:0}}
            exit={{x: `${-direction*120}vw`}}
            transition={{
              transition, 
              duration: (maxDuration - minDuration) * (Math.abs(sapin.height /100 - 1)) + minDuration, 
              
              }}
              style={{ scale, transformOrigin: 'center bottom' }}
            component={motion.div}
            sx={{position: 'fixed', 
            height: `${sapin.height}vh`, 
            bottom: -sapin.height/2.5, 
            left: sapin.position <= 50? `calc(${sapin.position}vw - ${sapin.height/2}vh)` : 'unset', 
            right: sapin.position > 50? `calc(100vw - ${sapin.position}vw - ${sapin.height/2}vh)` : 'unset', 
            zIndex: -1}}>
                <Sapin />
            </Box>
            
        ))}
        </Box>
    </>
  )
}
