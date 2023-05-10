import { Box, Button, ButtonBase, Typography, useMediaQuery } from '@mui/material'
import React, { useContext, useState } from 'react'
import * as NextLink from 'next/link'
import { LinkDirectionContext } from '../layout'
import { useRouter } from 'next/router'

export default function Link({href, text, localeLink, direction, children, variant, locale, py, px, ...others}) {

    const router = useRouter();

    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));

    const { setLinkDirection } = useContext(LinkDirectionContext)

    function handleClick() {
        setLinkDirection(direction)
    }

    return href&& (
        <Button variant='link' sx={{minWidth: 'unset', py, px}}>
        <Box sx={{position: 'relative'}}>
            
            <NextLink scroll={false} onClick={(e) => handleClick(e)} href={href} locale={locale? locale:router.locale} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box sx={{display: 'flex'}}>
                
                    <Typography {...others} variant={variant? variant:'h6'}>{children}</Typography>
                
                
                
                </Box>
            </NextLink>
            
        </Box>
        </Button>
    )
}
