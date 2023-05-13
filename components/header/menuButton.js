import { ButtonBase, SvgIcon, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import { LinkDirectionContext } from '../layout';

export default function MenuButton({drawerOpen, setDrawerOpen}) {

    const { setLinkDirection } = useContext(LinkDirectionContext);

    function toggleMenu() {
        setLinkDirection(drawerOpen? 1:-1)
        setDrawerOpen(!drawerOpen)
    }

  return (
        <Typography variant='h4' sx={{position: 'relative', height: '100%', marginLeft: '-2px', marginTop: '2px'}} >
            <ButtonBase
            component={motion.div}
            whileTap={{scale: 0.9}}
            transition={{duration: 0}}
            disableRipple
            onClick={toggleMenu}
            variant='inline' 
            sx={{display: 'flex', py:0.5, borderRadius: 1, marginRight: 1, fontSize: 'inherit', height: '100%', transformOrigin: '0% 100%' }}>
                <SvgIcon
                sx={{fontSize: 'inherit', p: 0.3}}
                strokeWidth='1px'
                
                //width={matchDownMD? '18px':'20px'}
                style={{ stroke: '#88bc8a', strokeMiterlimit: '10'}} 
                
               
                viewBox="0 0 138 100">


                    <title>menu</title>
                    <rect width="138" height="12" rx="9"/>
                    <rect y="41" width="125" height="12" rx="9"/>
                    <rect y="81" width="92" height="12" rx="9"/>

                </SvgIcon>
                
            </ButtonBase>
        </Typography>
  )
}