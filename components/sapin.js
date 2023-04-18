import { Box } from '@mui/material'
import React from 'react'

export default function Sapin(props) {
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
        {...props}>
            
                <path id='sapin' d="M50 1 L25 99 L75 99 Z" vectorEffect="non-scaling-stroke" />

        </svg>
   
  )
}
