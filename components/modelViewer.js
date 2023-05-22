import { Box, useTheme } from '@mui/material'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react'
import { transition } from '@/utils/transitions'



export default function ModelViewer({direction, pageReady}) {

  const theme = useTheme();

  const modelViewerRef = useRef(null)




  function Scroll() {

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

    window.requestAnimationFrame(Scroll);
  }

  useEffect(() => {

    changeColor()
    /*
    if (!modelViewerRef.current || !modelViewerRef.current.model) return;


    const material = modelViewerRef.current.model.materials[1]*/
    //material.pbrMetallicRoughness.setBaseColorFactor(theme.palette.mode == 'light'? 'rgb(100, 100, 100)': 'rgb(255, 255, 255)')

  }, [theme.palette.mode])

  function changeColor() {
    if (!modelViewerRef.current || !modelViewerRef.current.model) return;

    const material = modelViewerRef.current.model.materials[1]
    material.pbrMetallicRoughness.setBaseColorFactor(theme.palette.mode == 'light'? 'rgb(100, 100, 100)': 'rgb(255, 255, 255)')
  }


 useEffect(() => {
  if (!modelViewerRef.current) return;

  window.requestAnimationFrame(Scroll);

  modelViewerRef.current.addEventListener('load', changeColor);
  return () => {
    if (!modelViewerRef.current) return;
    modelViewerRef.current.removeEventListener('load', changeColor);
  };

 }, [modelViewerRef])


 const opacity = theme.palette.mode === 'dark'? 0.5: 1

 const [scrollY, setScrollY] = useState(0)

 const { scrollYProgress } = useScroll()

 useMotionValueEvent(scrollYProgress, "change", (latest) => setScrollY(latest))
 //calc(-0rad + env(window-scroll-y) * 4rad) calc(180deg + env(window-scroll-y) * -140deg) calc(8m - env(window-scroll-y) * 1.5m)
  return (
    
    <Box 
    initial={{x: `${direction*120}vw`, opacity: pageReady? 1:0}}
    animate={{x: 0, y: pageReady? 0: '100vh', opacity: pageReady? 1:0}}
    exit={{x: `${-direction*120}vw`}}
    transition={{transition, duration: 1.2}}
    component={motion.div}
    sx={{
     filter: 'opacity(0.92)',
      position: 'fixed', height: '100vh', width: '100%', minWidth: 600, top: 0, left: 0, zIndex: -1}}>

    <model-viewer 
    material="color: red; metalness: 0.5; roughness: 0.5;"
    onLoad={() => console.log('loaded')}
    style={{
      position: 'absolute',
      top: 0, left: 0,
      opacity,
      height: '100%', width: '100%'}}
    disable-zoom 
    id="casa" 
    ref={modelViewerRef}
    src="3d/maison2.glb" 
    autoplay 
    current-time='0' 
    animation-name="CubeAction" 
    minimum-render-scale="1" 
    camera-orbit={`calc(-0rad + ${scrollY} * 4rad) calc(180deg + ${scrollY} * -140deg) calc(8m - ${scrollY} * 1.5m)`} 
    max-camera-orbit="auto 90deg auto" 
    />
    </Box>

  )
}
