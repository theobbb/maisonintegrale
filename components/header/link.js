import { Box, ButtonBase, Typography, useMediaQuery } from '@mui/material'
import React, { useContext, useState } from 'react'
import * as NextLink from 'next/link'
import { LinkDirectionContext } from '../layout'
import { useRouter } from 'next/router'

export default function Link({href, text, localeLink, direction, children, variant, sx, ...others}) {

    const router = useRouter();

    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));

    const { setLinkDirection } = useContext(LinkDirectionContext)

    const handleScroll = () => {
        console.log(href)
        if (document.documentElement.scrollTop <= 0) {
          
          window.removeEventListener('scroll', handleScroll);
          router.push(href, href, {locale: router.locale})
        }

      };

    function handleClick(e) {
        setLinkDirection(direction)

        if (localeLink) return;

        if (matchDownLG) return router.push(href)
        
        e.preventDefault()

        window.scrollTo({ top: 0, behavior: 'smooth' });
        
  

        handleScroll();
  
        window.addEventListener('scroll', handleScroll);
        
        //window.scrollTo({ top: 0, behavior: 'smooth' });
        //router.push(href)
        
    }

    return href&& (
        <ButtonBase variant='link'>
        <Box sx={{position: 'relative'}}>
            
            <NextLink onClick={(e) => handleClick(e)} href={href} style={{ textDecoration: 'none', color: 'inherit' }} {...others}>
                <Box sx={{display: 'flex'}}>
                <Typography variant={variant? variant:'h6'}>{text.toUpperCase()}</Typography>
                {children}
                </Box>
            </NextLink>
            
        </Box>
        </ButtonBase>
    )
}
