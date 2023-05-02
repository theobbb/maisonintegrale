import { Box, useTheme } from '@mui/material'
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { transition } from '@/utils/transitions'



export default function ModelViewer({direction, pageReady}) {

  const theme = useTheme();

  const modelViewerRef = useRef(null)
  function ModelViewer() {

    if (!modelViewerRef.current) return;
    
    const modelViewer = modelViewerRef.current;

    var scrollMaxY = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                       document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight ); // max scroll distance
                         
    var AnimBegin = 0; // beginning of animation
    var AnimEnd = 3; // end of animation
    var AnimDuration = AnimEnd- AnimBegin; // duration of the animation
  
    var CurrentTime = AnimBegin + ((window.scrollY / scrollMaxY) * AnimDuration); // uses the max scroll distance to 
    modelViewer.currentTime = CurrentTime;
    modelViewer.pause();	


    window.requestAnimationFrame(ModelViewer);
  }

 useEffect(() => {
  if (!modelViewerRef.current) return;
  window.requestAnimationFrame(ModelViewer);
 }, [modelViewerRef])

 const opacity = theme.palette.mode === 'dark'? 0.3: 1

 const [scriptLoaded, setScriptLoaded] = useState(false)

  return (
    <>
   
    
    <Box 
    initial={{x: `${direction*120}vw`, opacity: pageReady? opacity:0}}
    animate={{x: 0, y: pageReady? 0: '100vh', opacity: pageReady? opacity:0}}
    exit={{x: `${-direction*120}vw`}}
    transition={{transition, duration: 1.2}}
    component={motion.div}
    sx={{
     
      position: 'fixed', height: '100%', width: '100%', top: 0, left: 0, zIndex: -1}}>

    <model-viewer 
    style={{height: '100%', width: '100%'}}
    disable-zoom 
    id="casa" 
    ref={modelViewerRef}
    src="3d/maison.glb" 
    autoplay 
    currentTime='0' 
    animation-name="CubeAction" 
    minimum-render-scale="1" 
    camera-orbit="calc(-0rad + env(window-scroll-y) * 4rad) calc(180deg + env(window-scroll-y) * -140deg) calc(8m - env(window-scroll-y) * 1.5m)" 
    max-camera-orbit="auto 90deg auto" 
    />
    </Box>
  
    </>
  )
}
