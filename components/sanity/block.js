import { Typography } from '@mui/material'
import React from 'react'

export default function Block({children, variant, sx, ...others}) {

  return children && children.map((p) => (
    
    <Typography key={p._key} variant={variant} sx={{...sx}}>
        {p.children? 
            p.children[0].text : p.text
        }
        <br/>
    </Typography>
    
    
  ))
}
