import { imageBuilder } from '@/utils/sanityClient'
import { Box, useTheme } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import Clip from './clip';
import Img from './img';
import Sapins from '../sapins';
import { transition } from '@/utils/transitions';
import lottie from 'lottie-web';

const sapins = [  
    { height: 30, position: 10 },
    { height: 50, position: 30 },
    { height: 40, position: 80 },
    { height: 30, position: 60 },
    { height: 60, position: 90 },
]


export default function ImageEntrance({setPageReady, setHeaderReady, replayEntrance, setReplayEntrance}) {

    const theme = useTheme()

    const [isSpacePressed, setIsSpacePressed] = useState(false);
    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.code === 'KeyB') {
            setAnimationStep(1)
            //setIsSpacePressed(true);
          }
          if (event.code === 'KeyV') {

            setAnimationStep(0)
            //setIsSpacePressed(true);
          }
        };
    
        const handleKeyUp = (event) => {
          if (event.code === 'KeyB') {
            setIsSpacePressed(false);
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keyup', handleKeyUp);
        };
      }, []); // empty array as second argument to only run once on mount

    

    const [animationStep, setAnimationStep] = useState(0)




    useEffect(() => {

        if (animationStep >= 3) {
            
            setPageReady(true)
        }
        if (animationStep >= 4) {
            setReplayEntrance(false)
        }
    }, [animationStep])



    const containerRef = useRef(null);


    const [svgSize, setSvgSize] = useState({width: 0, height: 0})

    useEffect(() => {
      if (!containerRef.current) return;
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        
        animationData: require('public/after/data.json'),
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        }
      });
      anim.onComplete = () => {
        console.log('complte')
        setAnimationStep(4)
      }

      function handleFrame(e) {
        const frame = e.currentTime;
        if(frame > 110)
        {
          setHeaderReady(true)
          return anim.removeEventListener('enterFrame', handleFrame);
        //stop and play 2nd one
        }
        
      }

      anim.addEventListener('enterFrame', handleFrame);

    }, [containerRef]);



 
  return animationStep < 4 && (
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



{/*    <Box 
    initial={{opacity: 0}}
    animate={() => {
        let anim = {}
        if (animationStep >= 2) anim = {...anim, opacity: 1}
        if (animationStep >= 3) anim = {...anim, scale: 0, opacity: 0}
        return anim
    }}
    onAnimationComplete={() => {if (animationStep == 3) setAnimationStep(animationStep+1)}}
    transition={{transition: transition, duration: 1}}
    component={motion.div}
    sx={{zIndex: 10000, position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',}}>
        <Path />
    </Box>*/}

    


    {/*<Clip {...{animationStep, setAnimationStep}} />*/}

    {/*<Box sx={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 3,
        background: theme.palette.background.default,
    }} />*/}

    </Box>



    </>
  )
}
function Path() {
    return (
        <svg 
        
        height='100%' 
        width='100%' 
        viewBox='0 0 100 100' 
 

        fill='rgba(181, 211, 181, 0.19)' 
        stroke='rgba(31, 133, 35, 0.3)' 
        strokeWidth='2px' 

        opacity='0.6' 
        pointerEvents='none'
        strokeLinecap='round'
        >
        <path 
                id='maison-path' 
                d="M50 6 L5 39 L5 90 L95 90 L95 39 Z" 
                vectorEffect="non-scaling-stroke" 
                //clipPath="url(#center-clip)" 

                />

        </svg>
    )
}
