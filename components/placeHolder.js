import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'

export default function PlaceHolder({visible, children, name}) {
  return (
    <Box sx={{position: 'relative', width: 'fit-content'}}>
        <Box
        initial={{opacity: 0}}
        animate={visible && {opacity: 1}}
        component={motion.div}>
            {children}
        </Box>
        

        <Box 
        layoutId={name}
        animate={{opacity: !visible? 1:0}}
        component={motion.div}
        sx={{background: 'rgba(255,255,255,1)', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}>

        </Box>
    </Box>

  )
}
