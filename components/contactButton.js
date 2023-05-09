import { Box, Button, Typography, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useRouter } from 'next/router'
import { LinkDirectionContext } from './layout';

export default function ContactButton() {
    const router = useRouter();
    const theme = useTheme();

    const linkDirection = useContext(LinkDirectionContext);

    function handleClick() {
        linkDirection.setLinkDirection(1)
        router.push('/contact', '/contact', { locale: router.locale });
    }

  return (
    <Button variant='contrast' onClick={handleClick} >
        <Typography variant='h6' >
        
            CONTACT
        </Typography>
        <Typography variant='h5' sx={{display: 'flex', alignItems: 'center', paddingLeft: 0.5, marginRight: -0.8}}>
            <ArrowOutwardIcon sx={{fontSize: 'inherit'}} />
        </Typography>
    </Button>
  )
}
