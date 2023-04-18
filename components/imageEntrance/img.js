import { transition } from '@/utils/transitions'
import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const url = 'https://cdn.sanity.io/images/1m8675a3/production/cc03911579951e0f6769994046deae1f32e74539-1920x1280.jpg'

export default function Img({animationStep, setAnimationStep, replayEntrance}) {

    const [vertical, setVertical] = useState(false)
    const [imageSize, setImageSize] = useState({width: 0, height: 0})
    useEffect(() => {
        setVertical(window.innerWidth < window.innerHeight)
        setImageSize({width: window.innerWidth, height: window.innerHeight})

    }, [])

    const [aspectRatio, setAspectRatio] = useState(null);

    useEffect(() => {
      const element = document.getElementById('entrance-img');
      const computedStyle = window.getComputedStyle(element);
      const backgroundImage = computedStyle.backgroundImage;
  
      const image = new Image();
      image.src = backgroundImage.slice(4, -1).replace(/"/g, "");
  
      image.onload = () => {
        const imageAspectRatio = image.width / image.height;
        setAspectRatio(imageAspectRatio);
      }
    }, []);

    console.log(aspectRatio)

  return (
    <Box sx={{    
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        
        zIndex: 10,
        
        }}   
    initial={{

        opacity: 1,
        //clipPath: 'inset(0 0)', 
        scale: 1.02}}

        animate={() => {
            let anim = {scale: 1}
            
            if (animationStep == 1) {
                //return {scale: 0.8}
            }
            if (animationStep >= 2)  anim = {...anim, opacity: 0}
            return anim
        }}

    onAnimationComplete={() => setAnimationStep(animationStep+1)}
    transition={{transition, duration: 1}}
    component={motion.div}>


        <Box 
        id='entrance-img'
        sx={{
            clipPath: 'url(#maison)',
            
            minWidth: '100%', minHeight: 'max(100%, 45vw)', 
            top: 0, left: 0,
            position: 'absolute',
            background: 'url(img/ai2main0.jpg)',
            
            //background: `url(${url}?${vertical?'h='+imageSize.height : 'w='+imageSize.width})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 36%',
            
            }} 
        initial={() => {
            if (replayEntrance) {
                return {opacity: 0, scale: 1}
            }
            
        }}
        animate={() => {
            let anim = {opacity: 1}
            if (animationStep >= 1) {
                anim = {...anim, scale: 1}
            }
            return anim
        }}
        transition={{transition, duration: 1, delay: replayEntrance?0.2:0}}
        component={motion.div}
            >
                {/*<img 
                style={{
                    height: '100%',
                    width: '1000px',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0, left: 0,
                    
                    
                    //maxWidth: '100%',
                    //maxHeight: '100%',
                    //clipPath: 'url(#maison)'
                    }} 
                src='/img/ai2main.jpg' />*/}
            </Box>
    </Box>
  )
}
