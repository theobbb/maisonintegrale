import { Box, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef } from 'react'
import {useRouter} from 'next/router'

export default function MuiTypoWrapper({className, sx, children}) {

    const { locale } = useRouter();

    const lastChildRef = useRef(null);
    const isSameChild = children == lastChildRef.current;
    lastChildRef.current = children;

  return (
   
        <Box 
        lazy
        component={motion.div}
        sx={sx}
        initial={!isSameChild && {opacity: 0}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5, ease: 'easeInOut'}}
        key={`${children}`} 
        className={className}>
        {children}
        </Box>
    

  )
}
