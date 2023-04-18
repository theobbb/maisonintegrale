import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useRouter } from 'next/router'

export default function ContactButton() {
    const router = useRouter();

    function handleClick() {
        router.push('/contact', '/contact', { locale: router.locale });
    }

  return (
    <Button variant='contact' onClick={handleClick}>
        <Typography variant='h7' sx={{fontWeight: '700 !important'  }}>
        
            CONTACT
        </Typography>
        <Typography variant='h6' sx={{display: 'flex', alignItems: 'center', paddingLeft: 0.5, marginRight: -0.8}}>
            <ArrowOutwardIcon sx={{fontSize: 'inherit'}} />
        </Typography>
    </Button>
  )
}
