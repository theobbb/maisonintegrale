import { Box, useTheme } from '@mui/material'
import React from 'react'
export default function Sapin(props) {

  const theme = useTheme();

  return (
        <svg 
        height='100%' 
        width='100%' 
        viewBox='0 0 100 100' 
        fill={theme.palette.green.background} 
        stroke={theme.palette.green.outline} 
        strokeWidth='2px' 
        style={{
          position: 'absolute', 
          top: 0, left: 0,
          width: '100%', height: '100%',
          }}
        opacity='0.6' 
        pointerEvents='none'
        strokeLinecap='round'
        {...props}>
            
                <path id='sapin' d="M50 1 L25 99 L75 99 Z" vectorEffect="non-scaling-stroke" />

        </svg>
   
  )
}
