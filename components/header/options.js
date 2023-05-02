import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import LocaleLink from './localeLink';
import RefreshIcon from '@mui/icons-material/Refresh';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';

export default function Options({setLinkDirection, drawerOpen, setDrawerOpen, setPlayEntrance, colorMode, setColorMode}) {

    const theme = useTheme();

    const router = useRouter()

    const matchDownSM = useMediaQuery(theme => theme.breakpoints.down('sm'));
    const matchDownMD = useMediaQuery(theme => theme.breakpoints.down('md'));
    const matchDownLG = useMediaQuery(theme => theme.breakpoints.down('lg'));
    const matchDownXL = useMediaQuery(theme => theme.breakpoints.down('xl'));

    

  return (
    <Box 
    key={`options-${drawerOpen}`}
    component={motion.div}
    initial={{x: matchDownLG?`${-60}vw`:0}}
    animate={{x: 0}}
    exit={{x: matchDownLG?`${-60}vw`:0}}
    transition={{transition: { ease: [0.43, 0.13, 0.23, 0.96] }, duration: 0.8}}
    sx={{
        display: 'flex', 
        flex: 1, 
        justifyContent: 'flex-end',
        paddingLeft: {xl: 17, lg: 11, md: 7, sm: 5, xs: 3},
        //px: theme.layout.x,
        mx: 1,
        alignItems: 'center'
    }}>

        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <LocaleLink text='FR' locale='fr' sx={{position: 'relative', mx: 0.5, my: matchDownLG? 0.5:0}} />
            <LocaleLink text='EN' locale='en' sx={{position: 'relative', mx: 0.5, my: matchDownLG? 0.5:0}} />
           

        </Box>


        <Box sx={{marginLeft: 2, display: 'flex', alignItems: 'center'}}>
          {theme.palette.mode == 'light' && 
            <IconButton onClick={() => setColorMode('dark')}>
              <LightModeIcon />
            </IconButton>
          }
          {theme.palette.mode == 'dark' && 
          <IconButton>

          <DarkModeIcon onClick={() => setColorMode('light')} />
          </IconButton>
        }
            <IconButton onClick={() => setPlayEntrance(true)}>
              <RefreshIcon />
            </IconButton>
          
            
            {/*<IconButton><DarkModeIcon/></IconButton>*/}
        </Box>
        

    </Box>
  )
}
