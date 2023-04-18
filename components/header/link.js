import { Box, ButtonBase, Typography } from '@mui/material'
import React, { useContext } from 'react'
import * as NextLink from 'next/link'
import { LinkDirectionContext } from '../layout'

export default function Link({href, text, direction, variant, sx, ...others}) {

    const { setLinkDirection } = useContext(LinkDirectionContext)
    //console.log(text)
    function handleClick() {
        setLinkDirection(direction)
    }
    return href&& (
        <ButtonBase variant='link'>
        <Box sx={{position: 'relative'}}>
            
            <NextLink onClick={handleClick} href={href} style={{ textDecoration: 'none', color: 'inherit' }} {...others}>
                <Typography variant={variant? variant:'h6'}>{text.toUpperCase()}</Typography>
            </NextLink>
            
        </Box>
        </ButtonBase>
    )
}
