import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'

export default function Clip({animationStep, setAnimationStep}) {
  return (
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
    <svg 
    
    height='100vh' 
    width='100vw' 
    viewBox='0 0 100 100' 
    fill='rgba(181, 211, 181, 0.89)' 
    stroke='black' 
    strokeWidth='2px' 
    preserveAspectRatio="xMaxYMid slice"
    opacity='0.6' 
    pointerEvents='none'
    strokeLinecap='round'
    >

    <defs >


    
        {<clipPath id="maison" clipPathUnits="objectBoundingBox" preserveAspectRatio >
        
        <motion.path 
        initial={{scale: 4}}
        animate={{scale: 1, delay: 0.5}}
        preserveAspectRatio 

        //onAnimationComplete={() => setAnimationStep(2)}
        offsetPath={10}
        transition={{duration: 2, delay: 1}}
        fill='white'
        stroke="#000000"
        d="M0.50 0.07 L0.28 0.39 L0.28 0.90 L0.73 0.90 L0.73 0.39 Z"
    />

    
        </clipPath>}
    </defs>

    </svg>
    </Box>
    )
}
