import { Box, useMediaQuery } from '@mui/material'
import { motion, useScroll, useSpring } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Sapin from './sapin'

const transition = { ease: [0.43, 0.13, 0.23, 0.96] };

export default function Sapins({sapins, direction, pageReady, id, drawerOpen}) {





  const matchDownSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
  const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

  const [sizedSapins, setSizedSapins] = useState(null)

  useEffect(() => {
    if (!sapins || sapins.length == -1) return setSizedSapins(null);
    const newSapins = sapins.map(sapin => {
      if (sapin.hide == 'sm' && matchDownSM) return null;
      else if (sapin.hide == 'md' && matchDownMD) return null;
      else if (sapin.hide == 'lg' && matchDownLG) return null;
      else if (sapin.hide == 'xl' && matchDownXL) return null;
      return sapin;
  
    })
    setSizedSapins(newSapins.filter(sapin => sapin != null))
  }, [matchDownXL, matchDownLG, matchDownMD, matchDownSM, sapins])



  const scrollYProgress = useScroll({offset: ["start end", "end end"]})

  //console.log(scrollYProgress)
/*
  const scale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });*/

  const minDuration = 1
  const maxDuration = 1.5

  //console.log(direction)

  //(maxDuration - minDuration) * sapin.height /100 + minDuration
  return sizedSapins && (
    
    <Box sx={{position: 'fixed', width: '100%', height: '100%', overflow: 'hidden', zIndex: 10, pointerEvents: 'none'}}>
        {sizedSapins.map((sapin, index) => (
            <Box 
            key={`sapin-${id}-${index}`}
            initial={{x: `${direction*120}vw`}}
            animate={{x: 0, y: pageReady? 0: '100vh', opacity: pageReady? 1:0}}
            exit={{x: `${-direction*120}vw`}}
            transition={{
              transition, 
              duration: (maxDuration - minDuration) * (Math.abs(sapin.height /100 - 1)) + minDuration, 
              
              }}
            //style={{ scale, transformOrigin: 'center bottom', transform: `translateX(${scale*100}%)` }}
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
    
  )
}
