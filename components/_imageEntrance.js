import { imageBuilder } from '@/utils/sanityClient'
import { Box, useTheme } from '@mui/material'
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'


const url = 'https://cdn.sanity.io/images/1m8675a3/production/cc03911579951e0f6769994046deae1f32e74539-1920x1280.jpg'
//const url = https://<some-image-url>&dl=



export default function ImageEntrance({setPageReady, replayEntrance, setReplayEntrance}) {

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

    const [vertical, setVertical] = useState(false)
    const [imageSize, setImageSize] = useState({width: 0, height: 0})
    useEffect(() => {
        setVertical(window.innerWidth < window.innerHeight)
        setImageSize({width: window.innerWidth, height: window.innerHeight})

    }, [])

    const [animationStep, setAnimationStep] = useState(0)

    function handleAnimationStep() {
        setAnimationStep(animationStep+1)
    }

    useEffect(() => {
        if (animationStep == 3) {
            setReplayEntrance(false)
            setPageReady(true)
        }
    }, [animationStep])

    /*
    useEffect(() => {
        setAnimationStep(0)
    }, [isNewSession])*/

    console.log(replayEntrance)

 
  return imageSize && animationStep < 4 && (
    <>

    <Box sx={{
        zIndex: 1000,
        position: 'fixed', 
        top: 0, left: 0,
        width: '100%', 
        height: '100%',
    }}
    >


    
    <Box sx={{    
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        
        zIndex: 10,
        clipPath: 'url(#maison)'
        }}   
    initial={{

        opacity: 1,
        //clipPath: 'inset(0 0)', 
        scale: 1}}

        animate={() => {
            if (animationStep == 1) {
                //return {scale: 0.8}
            }
            if (animationStep >= 2) {
                return {opacity: 0}
            }
        }}

    onAnimationComplete={() => handleAnimationStep()}
    transition={{duration: 2}}
    component={motion.div}>


        <Box 
        sx={{
            width: '100%', height: '100%', 
            top: 0, left: 0,
            position: 'absolute',
            background: `url(${url}?${vertical?'h='+imageSize.height : 'w='+imageSize.width})`,
            backgroundSize: 'cover no-repeat',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 20%',
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
        transition={{duration: 1}}
        component={motion.div}
            />
    </Box>



{    <Box 
    initial={{opacity: 0}}
    animate={() => {

        if (animationStep >= 2) {
            return {opacity: 1}
        }
    }}
    transition={{duration: 1, delay: 0.5}}
    component={motion.div}
    sx={{zIndex: 10000, position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',}}>
        <Path />
    </Box>}

    


    <Box 
    transition={{duration: 1}}
    component={motion.div}
    initial={{scale: 1}}

    sx={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 50
    }}>
        <Svg {...{animationStep, setAnimationStep}} />
        
    </Box>

    <Box sx={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 3,
        background: theme.palette.background.default,
    }} />

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
        fill='rgba(181, 211, 181, 0.89)' 
        stroke='black' 
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

function Svg({children, animationStep, setAnimationStep}) {
    return (
        <svg 
        
        height='0' 
        width='0' 
        viewBox='0 0 100 100' 
        fill='rgba(181, 211, 181, 0.89)' 
        stroke='black' 
        strokeWidth='2px' 
        
        opacity='0.6' 
        pointerEvents='none'
        strokeLinecap='round'
        >

        <defs >
        
            <clipPath id="maison" clipPathUnits="objectBoundingBox">
            
            <motion.path 
            initial={{scale: 4}}
            animate={{scale: 1, delay: 0.5}}
            /*
            animate={() => {
                if (animationStep >= 1) {
                    return {scale: 1}
                }
            }}*/

            //onAnimationComplete={() => setAnimationStep(2)}
            offsetPath={10}
            transition={{duration: 2}}
            fill='white'
            stroke="#000000"
            d="M0.50 0.07 L0.28 0.39 L0.28 0.90 L0.73 0.90 L0.73 0.39 Z"
        />

        
            </clipPath>
        </defs>
        

        

    {/*
    <rect width="100%" height="100%" clip-path="url(#maison)" fill="#f0f0f0" />
                <path 
                id='maison2' 
                d="M50 6 L5 39 L5 90 L95 90 L95 39 Z" 
                vectorEffect="non-scaling-stroke" 
                //clipPath="url(#center-clip)" 

                />
    <clipPath id="maison">
    <path 
                id='maison' 
                d="M50 6 L5 39 L5 90 L95 90 L95 39 Z" 
                vectorEffect="non-scaling-stroke" 
                //clipPath="url(#center-clip)" 

                />
    </clipPath>*/}
  


        </svg>
    )
}