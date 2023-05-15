import { imageBuilder } from '@/utils/sanityClient'
import { Box, useTheme } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'

import Sapins from '../sapins';
import { transition } from '@/utils/transitions';
import lottie from 'lottie-web';
import data from 'public/data.json'

export default function ImageEntrance({setPageReady, setHeaderReady, setPlayEntrance}) {

    const theme = useTheme();

    const containerRef = useRef(null);

    const [animInstance, setAnimInstance] = useState(null);

    
    const [animationData, setAnimationData] = useState(null);

    const getAnimationData = async () => {
      const response = await fetch('https://cdn.sanity.io/images/1m8675a3/production/cc03911579951e0f6769994046deae1f32e74539-1920x1280.jpg');
      const data = await response.json();
      setAnimationData(data)
    }

    const coloredData = data;
    coloredData.layers[0].shapes[0].it[1].c.k = theme.palette.mode == 'light'? [0, 0, 0, 1] : [1, 1, 1, 1]


    useEffect(() => {
      if (!containerRef.current) return;

      
        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          
          animationData: coloredData,
           
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          }
        });
        setAnimInstance(anim)
      
      
      anim.onComplete = () => {
        setPlayEntrance(false)
      }

      function handleFrame(e) {
        const frame = e.currentTime;
        if(frame > 110)
        {
          setHeaderReady(true)
          return anim.removeEventListener('enterFrame', handleFrame);
        }
      }

      anim.addEventListener('enterFrame', handleFrame);

      return () => anim.destroy();

    }, [containerRef]);

  return (
    <>

    <Box sx={{
        zIndex: 1000,
        position: 'fixed', 
        top: 0, left: 0,
        width: '100%', 
        height: '100%',
    }}>



    {/*<Img {...{animationStep, setAnimationStep, replayEntrance}} />*/}
    

    
    <Box

    ref={containerRef}
    preserveAspectRatio='xMinYMin slice'
    sx={{ 
      
      position: 'absolute',
      
      //width: svgSize.width, height: svgSize.height,
      width: '100%', height: '100%',
      

      top: '0', 
      left: '0',
      zIndex: 1000,
      }}>


    </Box>

    </Box>



    </>
  )
}

